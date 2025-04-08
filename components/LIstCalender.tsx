import { colors } from '@/app/mess/(tabs)';
import { useAuth } from '@/hooks/useAuth';
import { Attendace, Student } from '@/types/custom';
import { format } from 'date-fns';
import React, { useRef, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';

// Dummy testIDs object for testing purposes
const testIDs = {
  weekCalendar: { CONTAINER: 'weekCalendarContainer' },
  expandableCalendar: { CONTAINER: 'expandableCalendarContainer' },
};

// Dummy agenda items and function to get marked dates
const agendaItems = [
  {
    title: '2025-02-13',
    data: [{ name: 'Meeting with Team', time: '10:00 AM', date: '2025-02-13' }],
  },
];

interface attendanceDataType{
  [date: string]: {marked: boolean, dotColor: string};
}
const getMarkedDates = (attendance : Attendace[]) => {
  const attendanceDates : attendanceDataType  = {};
  attendance.forEach((attendance) => {
          const dateString = format(new Date(attendance.meals.start_time), "yyyy-MM-dd");
          attendanceDates[dateString] =  { marked: true, dotColor: 'black' };
      });
  return attendanceDates;
};

const AgendaItem = ({ item }: { item: any }) => {
  return (
    <View style={{ padding: 10, backgroundColor: colors.primary, marginHorizontal: 10, marginVertical: 5, borderRadius: 5, elevation: 2 }}>
      <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'white' }}>{item.name}</Text>
      <Text style={{ fontSize: 10, marginTop: 5 }}>{item.time}</Text>
    </View>
  );
};

const themeColor = colors.primary;

const getTheme = () => {
  return {
    calendarBackground: 'white',
    textSectionTitleColor: 'black',
    dayTextColor: 'black',
    todayTextColor: themeColor,
    selectedDayBackgroundColor: themeColor,
    arrowColor: themeColor,
  };
};

interface PropsForCalender {
  weekView?: boolean;
}

const ExpandableCalendarScreen: React.FC<PropsForCalender> = ({ weekView = false }) => { 
  const {userData} = useAuth();
  if(userData === null) return <Text>Loading...</Text>
  const user = userData as Student;
  const markedDatesRef = useRef(getMarkedDates(user.attendance));
  const calendarThemeRef = useRef(getTheme());

  // Callback to render each agenda item
  const renderAgendaItem = useCallback(({ item }: { item: any }) => {
    return <AgendaItem item={item} />;
  }, []);

  // Choose calendar view based on the weekView prop
  const calendarComponent = weekView ? (
    <WeekCalendar
      testID={testIDs.weekCalendar.CONTAINER}
      firstDay={1}
      markedDates={markedDatesRef.current}
    />
  ) : (
    <ExpandableCalendar
      allowShadow={true}
      testID={testIDs.expandableCalendar.CONTAINER}
      theme={calendarThemeRef.current}
      firstDay={1}
      markedDates={markedDatesRef.current}
    />
  );

  return (
    <CalendarProvider date={agendaItems[0].title} showTodayButton>
      {calendarComponent}
      <AgendaList sections={agendaItems} renderItem={renderAgendaItem} />
    </CalendarProvider>
  );
};

export default ExpandableCalendarScreen;

