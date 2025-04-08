import { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
} from 'react-native-reanimated';
import { Check, X, Calendar } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '@/hooks/useAuth';
import { Student } from '@/types/custom';

type MealType = 'breakfast' | 'lunch' | 'dinner';
type AttendanceStatus = 'present' | 'absent';

interface Meal {
  type: MealType;
  time: string;
  status: AttendanceStatus;
  notes?: string;
}




const MOCK_MEALS: Record<string, Meal[]> = {
  [format(new Date(), 'yyyy-MM-dd')]: [
    {
      type: 'breakfast',
      time: '08:00 AM',
      status: 'present',
      notes: 'Requested vegetarian option',
    },
    {
      type: 'lunch',
      time: '12:30 PM',
      status: 'absent',
      notes: 'Out for client meeting',
    },
    {
      type: 'dinner',
      time: '07:00 PM',
      status: 'present',
    },
  ],
};

const getMealsForDate = (date: Date | string): Meal[] => {
  try {
    const validDate = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(validDate.getTime())) {
      throw new Error('Invalid date');
    }

    const dateKey = format(validDate, 'yyyy-MM-dd');
    return (
      MOCK_MEALS[dateKey] || [
        {
          type: 'breakfast',
          time: '08:00 AM',
          status: 'absent',
        },
        {
          type: 'lunch',
          time: '12:30 PM',
          status: 'absent',
        },
        {
          type: 'dinner',
          time: '07:00 PM',
          status: 'absent',
        },
      ]
    );
  } catch (error) {
    console.warn('Error getting meals for date:', error);
    return [
      {
        type: 'breakfast',
        time: '08:00 AM',
        status: 'absent',
      },
      {
        type: 'lunch',
        time: '12:30 PM',
        status: 'absent',
      },
      {
        type: 'dinner',
        time: '07:00 PM',
        status: 'absent',
      },
    ];
  }
};

const MealCard = ({ meal }: { meal: Meal }) => {

  const getStatusColor = (status: AttendanceStatus) =>
    status === 'present' ? '#34C759' : '#FF3B30';

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={Layout}
      style={[styles.mealCard, { borderColor: getStatusColor(meal.status) }]}>
      <View style={styles.mealHeader}>
        <Text style={styles.mealType}>
          {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
        </Text>
        <Text style={styles.mealTime}>{meal.time}</Text>
      </View>

      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: getStatusColor(meal.status) },
          ]}>
          {meal.status === 'present' ? (
            <Check size={16} color="white" />
          ) : (
            <X size={16} color="white" />
          )}
        </View>
        <Text
          style={[
            styles.statusText,
            { color: getStatusColor(meal.status) },
          ]}>
          {meal.status.toUpperCase()}
        </Text>
      </View>

      {meal.notes && <Text style={styles.notes}>{meal.notes}</Text>}
    </Animated.View>
  );
};

export default function MealsScreen() {
  const { appwrite, userData } = useAuth();
  const [history , setHistory] = useState<Meal[]>([]);
  const student = userData as Student;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [meals, setMeals] = useState<Meal[]>(getMealsForDate(selectedDate));

  const fetchMealsFromAppwrite = async (date  : Date) => {
    if (!userData) return;
  
    try {
      const response = await appwrite.getMealsByMessOwnerAndDate(student.messOwener.$id, date);
      const { documents: meals } = response;
      setHistory(meals);
    } catch (error) {
      console.error('Error fetching meals:', error);
      return [];
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setMeals(getMealsForDate(selectedDate));
      setRefreshing(false);
    }, 1000);
  }, [selectedDate]);

  const onDateChange = (event: any, date?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
      setMeals(getMealsForDate(date));
    }
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setMeals(getMealsForDate(today));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meal Attendance</Text>
        <Pressable style={styles.todayButton} onPress={goToToday}>
          <Text style={styles.todayButtonText}>Today</Text>
        </Pressable>
      </View>

      <View style={styles.datePickerContainer}>
        <Pressable
          style={styles.dateButton}
          onPress={() => setShowPicker(true)}>
          <Calendar size={20} color="#007AFF" style={styles.calendarIcon} />
          <Text style={styles.dateText}>
            {format(selectedDate, 'MMMM d, yyyy')}
          </Text>
        </Pressable>
      </View>

      {(showPicker || Platform.OS === 'web') && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
          style={Platform.OS === 'web' ? styles.webDatePicker : undefined}
        />
      )}

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {meals.map((meal, index) => (
          <MealCard key={`${meal.type}-${index}`} meal={meal} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  todayButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  todayButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  datePickerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 8,
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  webDatePicker: {
    alignSelf: 'center',
    marginVertical: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  mealCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  mealTime: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  notes: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
});