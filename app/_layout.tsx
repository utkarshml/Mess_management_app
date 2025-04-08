import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/hooks/useAuth';

export default function RootLayout() {
  useFrameworkReady();
  return (
    <>
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ animation: 'fade' } } />
        <Stack.Screen name="mess/(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name='student/(tabs)' options={{animation : 'fade'}}/>
        <Stack.Screen name='student/History' options={{headerShown : true , animation : 'fade'}}/>
        <Stack.Screen name='student/Meals' options={{headerShown : true , animation : 'fade'}}/>
      </Stack>
      <StatusBar style="auto" />
      </AuthProvider>
    </>
  );
}