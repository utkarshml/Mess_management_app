import { useAuth } from '@/hooks/useAuth';
import { Redirect, Slot } from 'expo-router';

export default function Home() {
  const { user } = useAuth();
  if (!user) {
    return <Redirect href="/login" />;
  }
  if(user.labels.includes("messOwner")) return <Redirect href={'/mess/(tabs)'}/>
  return <Redirect href={"/student/(tabs)"}/>
}
