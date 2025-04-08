import { colors } from '@/app/mess/(tabs)';
import { Meal } from '@/types/custom';
import { format } from 'date-fns';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export interface MealCardProps extends Meal {
 width : number
}

const MealCard: React.FC<MealCardProps> = ({ meal_type, start_time, end_time , width   }) => {
  return (
    <View style={[styles.container, {width}]}>
    <View style={{flexDirection:'row',justifyContent:'space-between' , alignItems:'center'}}>
    <Text style={styles.mealName}>{meal_type.charAt(0).toUpperCase() + meal_type.slice(1)}</Text>
    <Text style={styles.date}>{format(new Date(start_time) , "dd-MM-yyyy")}</Text>
    </View>
      <Text style={styles.time}>{format(new Date(start_time) , "HH:mm aa")} - {format(new Date(end_time) , "HH:mm aa")}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.acceptButton]}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.revokeButton]}>
          <Text style={styles.buttonText}>Revoke</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 28,
    marginVertical: 10,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mealName: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'poppins-bold',

  },
  date: {
    fontSize: 14,
    marginTop: -5,
    color: '#666',
  },
  time: {
    fontSize: 16,
    fontFamily: 'poppins-regular',
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '45%',
  },
  acceptButton: {
    backgroundColor: colors.primary,
  },
  revokeButton: {
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },
});

export default MealCard;
