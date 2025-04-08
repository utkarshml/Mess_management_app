import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Modal, FlatList, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { format, set } from 'date-fns';
import { Meal, MealType, MessOwner } from '@/types/custom';
import { Plus, Trash2, Users } from 'lucide-react-native';
import { TextInput } from 'react-native';
import { router } from 'expo-router';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useAuth } from '@/hooks/useAuth';
import * as Burnt from "burnt";
import { AppwriteException } from 'appwrite';
import LoadingOverlay from '@/components/Loader';


  
export default function HomeScreen() {
  const {user , appwrite , userData} = useAuth();
  const [mealsforThis, setMealsforThis] = useState<Meal[]>([]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [seletectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading , setLoading] = useState<boolean>(false);
  const [Loader , setLoader] = useState<boolean>(false);
  const [LoaderText ,setLoaderText] = useState<string>('');
  const [newMeal, setNewMeal] = useState<Partial<Meal>>({
    meal_type: 'breakfast',
    price: 30,
    start_time:convertTimeStringToDate('08:00 AM'),
    end_time:convertTimeStringToDate('09:30 PM '),
    description: '',
  });

  const handleConfirmtoStart = (date : Date) => {
    setNewMeal({
      ...newMeal,
      start_time: mergeDateAndTime(seletectedDate, date),
    });
    setStartTimePickerVisibility(false);
   
  };
  const handleConfirmtoEnd = (date : Date) => {

    setNewMeal({
      ...newMeal,
      end_time: mergeDateAndTime(seletectedDate, date),
    });
    setEndTimePickerVisibility(false);
  };
  const handleConfirmtoDate = (date : Date) => {
    
    console.log(date)
    setSelectedDate(date);
    setDatePickerVisibility(false);
  }
  const mealDefaultTime = (type: MealType) =>{
   switch (type) {
     case 'breakfast':
      setNewMeal({
        ...newMeal,
        meal_type: 'breakfast',
        price : 40,
        start_time: convertTimeStringToDate('08:00 AM'),
        end_time: convertTimeStringToDate('09:30 AM'),
      });
      break;
    case 'lunch':
      setNewMeal({
        ...newMeal,
        meal_type: 'lunch',
        price : 80,
        start_time: convertTimeStringToDate('12:00 PM'),
        end_time: convertTimeStringToDate('01:30 PM'),
      });
      break;
    case 'snacks':

      setNewMeal({

        ...newMeal,
        meal_type: 'snacks',
        price : 20,
        start_time: convertTimeStringToDate('02:00 PM'),
        end_time: convertTimeStringToDate('05:30 PM'),
      });
      break;
    case 'dinner':
      setNewMeal({
        ...newMeal,
        meal_type: 'dinner',
        price : 50,
        start_time: convertTimeStringToDate('07:00 PM'),
        end_time: convertTimeStringToDate('08:30 PM'),
      });
      break;
    default:
      setNewMeal({
        ...newMeal,
        start_time: convertTimeStringToDate('08:00 PM'),
        end_time: convertTimeStringToDate('09:30 PM'),
      });
   }
  }

  const handleDeleteMeal = async (id : string) => {
    try{
      setLoader(true);
      setLoaderText("Deleting Meal...");
      const deletedMeal = mealsforThis.filter((meal) => meal.$id !== id);
      const addStudent = await fetch('https://67f429c9a3b6e81b3a02.appwrite.global//', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "mealId": id
        })
       })
       setMealsforThis(deletedMeal);
       setLoader(false);
       setLoaderText("");
    }catch(err){
      console.log(err);
      setLoader(false);
     }
  }
  const deleteMealComfirm = (id : string) =>{
    Alert.alert(
      "Delete Meal",
      "Are you sure you want to delete this meal?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => handleDeleteMeal(id) }
      ]
    )
  }

  const handleAddMeal = async () => {
    try{
      setLoader(true);
      setLoaderText("Adding Meal...");
      if (newMeal.meal_type && newMeal.start_time && newMeal.end_time && newMeal.price ) {
      const currentTime = new Date();
      if (mergeDateAndTime(seletectedDate, newMeal.start_time as Date) < currentTime) {
        Burnt.alert({
          title: 'Please select a valid time',
          message: 'Time should be greater than current time',
          preset: 'error',
        });
        setLoader(false);
        setLoaderText("");
        return;
      }
          if (user?.$id && newMeal.meal_type && newMeal.start_time && newMeal.end_time && newMeal.price) {
          const result : Meal = await appwrite.setMeal(
              userData?.$id as string,
              newMeal.meal_type as MealType,
              mergeDateAndTime(seletectedDate, newMeal.start_time as Date),
              mergeDateAndTime(seletectedDate, newMeal.end_time as Date),
              newMeal.price || 0,
              newMeal.description
            );
           setLoaderText("Adding Students")
           const addStudent = await fetch('https://67eaf60b27a33adddc51.appwrite.global/', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "messOwnerId": result.messOwner.$id,
              "mealId": result.$id
            })
                     })
          const addStudentData = await addStudent.json();
          Burnt.toast({
            title : "Meal Added",
            message : addStudentData.message as string
          })
       
          const updateMeal =  await appwrite.getMealById(result.$id as string);
          setMealsforThis((prevMeals) => {
            return [...prevMeals, updateMeal];
          });
          
        }
        
        setAddModalVisible(false);
      }
      setLoader(false);
      setLoaderText(""); 
       }catch(error){
      const err = error as AppwriteException
      Burnt.alert({
        title : "Something Went Wrong",
        preset : "error",
        message : err.message

      })
      setAddModalVisible(false);
      setLoader(false);
      setLoaderText("");
      console.log(error);
    }
  
  };

  const getMealTypeColor = (type: MealType) => {
    switch (type) {
      case 'breakfast':
        return '#FF9500';
      case 'lunch':
        return '#30D158';
      case 'snacks':
        return '#FF375F';
      case 'dinner':
        return '#5856D6';
      default:
        return '#FF3B30';
    }
  };
 useEffect(()=>{
  const getMeals = async () => {
    try {
      if(!userData) return;
      if ('meals' in userData) {
        setMealsforThis(userData.meals.filter((meal) => new Date(meal.start_time) > new Date()));
      } else {
        return 
      }
    } catch (error) {
      console.log(error);
      Burnt.alert({
        title: "Error",
        message: "Failed to fetch meals",
        preset: "error",
      });
    }
  };
  getMeals();
 },[userData]);
  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.container}>
      <ScrollView style={styles.mealList}>
        <View style={{marginBottom : 25}}>
            <Text style={[styles.title , {color : colors.primary}]}>{userData && 'Mess' in userData ? String(userData.Mess) : "Mess"}</Text>
            <Text style={[styles.subtitle]}>Mess Management</Text>
        </View>
        <View>
          {mealsforThis.length === 0 ? 
           <View style={{flex:1 , justifyContent : "center" , alignItems : 'center' , marginTop : 100}}>
            <Image style={{width : 200 , height : 200}} source={require("../../../assets/images/no_meal.jpg")}/>
           </View> :   
           mealsforThis.map((meal) => (
            <TouchableOpacity
              key={meal.$id}
              style={styles.mealCard}
              onPress={() => router.push({ pathname : "/mess/attendance" , params : {mealId : meal.$id , mealType : meal.meal_type , date : format(new Date(meal.start_time), 'MMMM do, yyyy') , startTime : format(new Date(meal.start_time), 'hh:mm aa') ,  } })}
            >
              <View style={styles.mealHeader}>
                <View style={[styles.mealTypeTag, { backgroundColor: getMealTypeColor(meal.meal_type) }]}>
                  <Text style={styles.mealType}>{meal.meal_type.charAt(0).toUpperCase() + meal.meal_type.slice(1)}</Text>
                </View>
                <TouchableOpacity 
                  onPress={(e) => {
                    e.stopPropagation();
                    deleteMealComfirm(meal.$id);
                  }}
                >
                  <Trash2 size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
              <Text style={styles.mealTime}>
                {meal.start_time ? format(new Date(meal.start_time), 'hh:mm aa') : ''} - { meal.end_time ? format(new Date(meal.end_time), 'hh:mm aa') : ''}
              </Text>
              <Text style={[styles.mealDate , {color : 'black'}]}>{meal.start_time ? format(new Date(meal.start_time), 'yyyy-MM-dd') : ''}</Text>
              <Text style={styles.mealDescription}>{meal.description}</Text>
              <View style={[styles.studentsButton , {backgroundColor :"white"}]}>
                <Users size={20} color={colors.primary} />
                <Text style={[styles.studentsButtonText , {color : colors.primary}]}>
                  { meal.attendance && meal.attendance.length} Present Student
                </Text>
              </View>
            </TouchableOpacity>
          ))
        }
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.addButton  , {backgroundColor : colors.primary}]}
        onPress={() => setAddModalVisible(true)}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Add Meal Modal */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
      >
       
        <View style={[styles.modalContainer] }>
          <View style={[styles.modalContent , {backgroundColor : "white"}]}>
            <Text style={[styles.modalTitle , {color : colors.primary}]}>Add New Meal</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Type</Text>
              <FlatList 
               data={['breakfast', 'lunch', 'snacks', 'dinner']}
               numColumns={2}
               renderItem={
                ({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      newMeal.meal_type === item && styles.typeButtonActive,
                      {margin: 4 }
                    ]}
                    onPress={()=> mealDefaultTime(item as MealType)}
                  >
                    <Text style={[
                      styles.typeButtonText,
                      newMeal.meal_type === item && styles.typeButtonTextActive,

                    ]}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Text>
                  </TouchableOpacity>
                )
               }
              
              />

            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Meal Price</Text>
               <TextInput
                style={styles.input}
                value={newMeal.price ? String(newMeal.price) : ''}
                onChangeText={(price) => setNewMeal({ ...newMeal, price: parseInt(price) })}
              />
            </View>
            <View style={{flexDirection : "row" , justifyContent : "space-between", gap: 5}}>
            <View style={[styles.inputGroup, {width : "50%"}]}>
              <Text style={styles.label}>Start Time</Text>
              <TouchableOpacity onPress={()=>setStartTimePickerVisibility(true)} style={styles.input}>
                <Text style={{color : "white"}}>
                  {newMeal.start_time ? format(new Date(newMeal.start_time), 'hh:mm aa') : ''}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.inputGroup, {width : "50%"}]}>
              <Text style={styles.label}>End Time</Text>
              <TouchableOpacity onPress={()=> setEndTimePickerVisibility(true)} style={styles.input}>
                <Text style={{color : "white"}}>
                {newMeal.end_time ? format(new Date(newMeal.end_time), 'hh:mm aa') : ''}   
                </Text>
               </TouchableOpacity>
            </View>
            </View>


            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity onPress={()=> setDatePickerVisibility(true)} style={styles.input}>
                <Text style={{color : "white"}}>
                {format(seletectedDate, 'yyyy-MM-dd')}   
                </Text>
               </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                multiline
                numberOfLines={1}
                style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
                value={newMeal.description}
                onChangeText={(description) => setNewMeal({ ...newMeal, description })}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setAddModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addButtonModal , {backgroundColor : colors.primary}]}
                onPress={handleAddMeal}
              >
                <Text disabled={loading} style={[styles.addButtonText ]}>
                  {loading ? "Meal Adding..." : "Add Meal"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
     
      </Modal>
      <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmtoStart}
        onCancel={() => setStartTimePickerVisibility(false)}
      />
            <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmtoDate}
        onCancel={() => setDatePickerVisibility(false)}
      />
            <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmtoEnd}
        onCancel={() => setEndTimePickerVisibility(false)}
      />
      <LoadingOverlay visible={Loader} loadingText={LoaderText} />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height : "100%",
      backgroundColor: 'white',
    },
    mealList: {
      padding: 16,
    },
    title : {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign : 'left'
    },
    subtitle:{
       fontSize: 20,
    },
    mealCard: {
      backgroundColor: 'gray',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#2C2C2E',
    },
    mealHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    mealTypeTag: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    mealType: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 14,
      color: '#FFFFFF',
    },
    mealTime: {
      fontFamily: 'Inter_400Regular',
      fontSize: 16,
      color: '#FFFFFF',
      marginBottom: 4,
    },
    mealDate: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: '#8E8E93',
      marginBottom: 8,
    },
    mealDescription: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: '#FFFFFF',
      marginBottom: 12,
    },
    studentsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#2C2C2E',
      padding: 12,
      borderRadius: 8,
    },
    studentsButtonText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: '#FF3B30',
      marginLeft: 8,
    },
    addButton: {
      position: 'absolute',
      bottom: 24,
      right: 24,
      backgroundColor: '#FF3B30',
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#FF3B30',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    modalContainer: {
      flex: 1,
      height:100,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      justifyContent: 'center',
      padding: 16,
    },
    modalContent: {
      backgroundColor: '#1C1C1E',
      borderRadius: 12,
      padding: 20,
      borderWidth: 1,
      borderColor: '#2C2C2E',
    },
    modalTitle: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 20,
      color: '#FFFFFF',
      marginBottom: 20,
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: 'black',
      marginBottom: 8,
    },
    input: {
      fontFamily: 'Inter_400Regular',
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#2C2C2E',
      borderRadius: 8,
      padding: 12,
      color: '#FFFFFF',
      backgroundColor: '#2C2C2E',
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    typeButtons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    typeButton: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      backgroundColor: '#2C2C2E',
      marginHorizontal: 4,
      alignItems: 'center',
    },
    typeButtonActive: {
      backgroundColor: '#6A0DAD',
    },
    typeButtonText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      marginVertical:4,
      color: '#FFFFFF',
    },
    typeButtonTextActive: {
      color: '#FFFFFF',
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    modalButton: {
      flex: 1,
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 4,
    },
    cancelButton: {
      backgroundColor: '#2C2C2E',
    },
    addButtonModal: {
      backgroundColor: '#FF3B30',
    },
    cancelButtonText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 16,
      color: '#FFFFFF',
    },
    addButtonText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 16,
      color: '#FFFFFF',
    },
  });



  export const colors = {
    primary: "#6A0DAD", // Dark Purple
    secondary: "#B366FF", // Light Purple
    background: "#F3E5F5", // Very Light Purple
    text: "#4A148C", // Deep Purple
    white: "#ffffff",
    black: "#000000",
    danger: "#D50000", // Red for errors
    warning: "#FFC107", // Yellow for warnings
    success: "#00C853", // Green for success
  };
  
  
    function convertTimeStringToDate(timeString: string): Date {
      // Get today's date
      const today: Date = new Date();
    
      // Split the time string into time and modifier (AM/PM)
      const [time, modifier]: string[] = timeString.split(' ');
      let [hours, minutes]: string[] = time.split(':');
    
      // Convert hours and minutes to numbers
      let hour: number = parseInt(hours, 10);
      let minute: number = parseInt(minutes, 10);
    
      // Adjust hour based on AM/PM
      if (modifier === 'PM' && hour !== 12) {
        hour += 12;
      } else if (modifier === 'AM' && hour === 12) {
        hour = 0;
      }
    
      // Create and return a new Date with today's date and the specified time
      return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hour,
        minute
      );
    }
    
    function mergeDateAndTime(datePart: Date, timePart: Date): Date {
      return new Date(
        datePart.getFullYear(),
        datePart.getMonth(),
        datePart.getDate(),
        timePart.getHours(),
        timePart.getMinutes(),
        timePart.getSeconds(),
        timePart.getMilliseconds()
      );
    }