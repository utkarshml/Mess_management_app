import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useEffect } from 'react';
import { BackHandler, Pressable, TouchableOpacity } from 'react-native';

export default function RootLayout() {
  useFrameworkReady();

  function handleBackButtonClick() {
    router.back();
    return true;
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="index"
          options={{
            animation: 'fade',
            headerShown: true,
            title: 'Attendance',
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
