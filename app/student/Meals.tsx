import MealCard from '@/components/MealCards';
import { useAuth } from '@/hooks/useAuth';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Meal = () => {
  const {meal} = useAuth();
  return (
    <ScrollView >
        <View style={{paddingHorizontal : 10 , marginTop: 20}}>
         { meal.map((item) => (
           <MealCard  key={item.$id} width={350} {...item}/>
          ))}
        </View>
    </ScrollView>
    );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Meal;
