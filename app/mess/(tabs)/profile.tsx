import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '.';
import { useAuth } from '@/hooks/useAuth';
import { MessOwner } from '@/types/custom';
import { useState } from 'react';

export default function ProfileScreen() {
  const {logout,userData, user} = useAuth();
  const [messOwner, setMessOwner] = useState<MessOwner | null>(userData as MessOwner);
  // Mock data for mess owner


  const router = useRouter();

  const handleLogout = async () => {
     logout();
  };
  const handleUpdateProfile = async () => {
    router.push('/mess/UpdateProfile');
 };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user?.name ? user.name : 'John Doe'}</Text>
        <Text style={styles.messName}>{messOwner?.Mess ? messOwner.Mess : 'Mess Name'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoCard}>
          <InfoItem label="Email" value={messOwner?.email ? messOwner.email : 'example@email.com'} />
          <InfoItem label="Phone" value={messOwner?.phone ? messOwner.phone.toString() : '1234567890'} />
          <InfoItem label="Address" value={messOwner?.place ? messOwner.place : '123 Main St, City, Country'} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mess Details</Text>
        <View style={styles.infoCard}>
          {messOwner && (
            <>
              <InfoItem label="Operating Hours" value={messOwner.business_hours} />
              <InfoItem label="Capacity" value={messOwner.capacity ? messOwner.capacity.toString(): '0'} />
            </>
          )}
        </View>
      </View>
      <View style={{padding: 20, gap : 10}}>
      <TouchableOpacity style={{backgroundColor : colors.primary , paddingVertical : 12 , borderRadius : 8}} onPress={handleUpdateProfile}>
          <Text style={{textAlign : 'center' , color : '#fff'}}>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor : colors.danger , paddingVertical : 12 , borderRadius : 8}} onPress={handleLogout}>
          <Text style={{textAlign : 'center' , color : '#fff'}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    color: '#1C1C1E',
    marginBottom: 4,
  },
  messName: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#48484A',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1C1C1E',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    marginBottom: 12,
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  value: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#1C1C1E',
  },
});