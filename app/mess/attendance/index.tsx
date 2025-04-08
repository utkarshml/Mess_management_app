import { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { useLocalSearchParams } from 'expo-router';
import { Attendace, MessOwner } from '@/types/custom';
import { useAuth } from '@/hooks/useAuth';


export default function MealAttendanceScreen() {
  const params = useLocalSearchParams();
  const { mealId , date ,  startTime } = params 
  const {appwrite , userData} = useAuth()
  const messOwner = userData as MessOwner;
  const [attendance , setAttendance] = useState<Attendace[]>([])
  const [searchQuery, setSearchQuery] = useState('');
  const [loading ,setLoading] = useState(false)
  const currentDate = new Date();
  const [defaultAttendance, setDefaultAttendance] = useState<Attendace[]>([]);


  const filteredStudents = useMemo(() => {
    if (!searchQuery) return defaultAttendance;
    return defaultAttendance.filter(
      (student) =>
        student.student.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.student.roll_number.includes(searchQuery)
    );
  }, [searchQuery, defaultAttendance]);
  useEffect(() => {
   const fetchingAttendace =  async () => {
    setLoading(true)
    try{
      const resp = await appwrite.getAttendance(mealId as string)
      const { documents } = resp;
      setAttendance(documents)
      setDefaultAttendance(documents)
      setLoading(false)
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false)
    }
   }
   fetchingAttendace()
  }, [])

  if(loading){
    return (
             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <ActivityIndicator size="large" color="#007AFF" />
             </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meal Attendance</Text>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTime}>
            {date}
          </Text>
          <Text style={styles.dateTime}>
            {startTime}
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{attendance && attendance.length}</Text>
          <Text style={styles.statLabel}>Present</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {messOwner.students.length - attendance.length}
          </Text>
          <Text style={styles.statLabel}>Absent</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{messOwner.students.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or roll number"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.studentList}>
  {filteredStudents.map((student) => (
    <View key={student.student.$id} style={styles.studentItem}>
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{student.student.student_name}</Text>
        <Text style={styles.studentRoll}>Roll: {student.student.roll_number}</Text>
      </View>
      <View
        style={[
          styles.attendanceIndicator,
          student.student.status == 'active' ? styles.presentIndicator : null,
            styles.presentIndicator,
        ]}
      />
    </View>
  ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  dateTimeContainer: {
    marginTop: 8,
  },
  dateTime: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 1,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  studentList: {
    flex: 1,
    padding: 15,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  selectedStudent: {
    backgroundColor: '#f0f9ff',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  studentRoll: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  attendanceIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ddd',
    marginLeft: 10,
  },
  presentIndicator: {
    backgroundColor: '#22c55e',
  },
});