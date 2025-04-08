import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { Chrome as Home, School, User } from 'lucide-react-native';
import { colors } from '.';

export default function TabLayout() {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
       <Tabs.Screen
        name="students"
        options={{
          title: 'Students',
          headerShown : true,
          tabBarIcon: ({ color, size }) => <School size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}