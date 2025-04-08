
import { ErrorBoundary } from '@/app/ErrorBoundary';
import { colors } from '@/app/mess/(tabs)';
import CalendarComp from '@/components/Calender';
import MealCard, { MealCardProps } from '@/components/MealCards';
import { useAuth } from '@/hooks/useAuth';
import { Student } from '@/types/custom';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function Home() {
  const {userData , user , meal} = useAuth();
  const student = userData as Student;
  
  if(!student){
    return (
      <View style={{flex: 1 , justifyContent: 'center' , alignItems: 'center'}}>
        <ActivityIndicator/>
      </View>
    )
  }
  return (
    <ErrorBoundary>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Wellcome to</Text>
          <Text style={styles.subtitle}>{user?.name}</Text>
        </View>
       <View style={styles.walletSection}>

          <Text style={{paddingHorizontal : 5 , fontSize: 20 , fontFamily : 'poppins-bold' , color: "white"}}>Wallet Money</Text>
          <Text style={{paddingHorizontal : 5 , fontSize: 40 , fontFamily : 'poppins-regular' , color: "white"}}>₹{student.wallet.wallet_money}</Text>
          <Text style={{paddingHorizontal : 5 , fontSize: 10 , fontFamily : 'poppins-regular' , color: "white" , position : 'absolute' , right : 10, bottom : 10}}>Available</Text>
    
       </View>
        <View style={styles.featuredSection}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' , paddingHorizontal: 20}}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScrollView}
          >
            {meal.map((item) => (
              <MealCard width={250} key={item.$id} {...item} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.statsSection}>
          <Text style={{paddingHorizontal : 20 , fontSize: 20 , fontFamily : 'poppins-bold'}}>Your Attendance</Text>
         <CalendarComp {...student} />
        </View>
      </ScrollView>
    </SafeAreaView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    marginTop: 20,
  },
  walletSection:{
    padding: 20,
    backgroundColor: colors.primary,
    height: 200,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    position : "relative"
  },
  greeting: {
    fontSize: 28,
    color: '#1a1a1a',
    fontFamily: 'poppins-bold',
  },
  subtitle: {
    fontSize: 33,
    color: colors.primary,
  },
  featuredSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'poppins-bold',
    marginBottom: 15,
    color: '#1a1a1a',
  },
  featuredScrollView: {
    paddingLeft: 20,
    paddingRight: 10,
    gap: 12,
  },
  featuredItem: {
    marginRight: 15,
    width: 200,
  },
  featuredImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  featuredTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  statsSection: {
    marginTop: 30,
    paddingBottom: 40,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 12,
    width: '30%',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
});