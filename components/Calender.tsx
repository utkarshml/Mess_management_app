import { useAuth } from '@/hooks/useAuth';
import { Student } from '@/types/custom';
import { format } from 'date-fns';
import React, {useState} from 'react';
import { ImageBackground, View } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';



interface Day {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
}

interface attendanceDataType {
    [date: string]: boolean;
}
const attendanceData : attendanceDataType = {
    '2025-02-20': true,
    '2025-02-21': false,
    '2025-02-22': true,
    // Add more dates as needed
  };


const getMarkedDates = (data : attendanceDataType) => {
    const markedDates : MarkedDates = {};
    for (const [date, attended] of Object.entries(data)) {
      markedDates[date] = {
            selected: true,
            dotColor: attended ? 'black' : 'red',
            selectedColor: attended ? 'black' : 'red',
           };
    }
    return markedDates;
  };
  
const CalendarComp: React.FC<Student> = ({attendance}) => {
    const attendanceData: attendanceDataType = {};
    attendance.forEach((attendance) => {
        const dateString = format(new Date(attendance.meals.start_time), "yyyy-MM-dd");
        attendanceData[dateString] = true;
    });

    const markedDates = getMarkedDates(attendanceData);
    const [selected, setSelected] = useState<string>('');
    return (
        <View>
        <Calendar
            
            onDayPress={(day: Day) => {
                setSelected(day.dateString);
            }}
            markedDates={markedDates}
        />
        </View>
        
    );
};


export default CalendarComp;