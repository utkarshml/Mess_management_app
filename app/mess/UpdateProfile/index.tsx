import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ImagePicker } from '@/components/profileForm/ImagePicker';
import { FormInput } from '@/components/profileForm/FormInput';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { MessOwner } from '@/types/custom';



interface FormData {
  profileImage: string;
  phone: string;
  Mess: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  capacity: string;
  businessHours: string;
}




export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { appwrite, userData } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    profileImage: '',
    phone: '',
    Mess : '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    capacity: '',
    businessHours:'08:00 AM - 10:00 PM', 
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      setLoading(true);
      const savedData = await AsyncStorage.getItem('profileData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if(!formData.Mess){
      newErrors.Mess = 'Mess name is required';
    } 
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.capacity) {
      newErrors.capacity = 'Capacity is required';
    } else if (parseInt(formData.capacity) <= 0) {
      newErrors.capacity = 'Capacity must be greater than 0';
    }

    // Validate business hours format
    if(formData.businessHours){
      if (!/^(?:[01]\d|2[0-3]):[0-5]\d\s+(?:AM|PM)\s+-\s+(?:[01]\d|2[0-3]):[0-5]\d\s+(?:AM|PM)$/.test(formData.businessHours))
        newErrors.businessHours = 'Invalid hours format. Use format: HH:MM AM/PM - HH:MM AM/PM';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Please fix the errors before saving.');
      return;
    }

    Alert.alert(
      'Save Changes',
      'Are you sure you want to save these changes?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: async () => {
            try {
              setSaving(true);
              await AsyncStorage.setItem('profileData', JSON.stringify(formData));
             const response =  await appwrite.updateProfile(userData?.$id , {
                Mess : formData.Mess,
                phone:Number(formData.phone),
                email: formData.email,
                place : `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipCode}`,
                capacity : Number(formData.capacity),
                business_hours : formData.businessHours,
                profileImage : formData.profileImage
              });
              router.back();
              Alert.alert('Success', 'Profile updated successfully!');
            } catch (error) {
              console.error('Error saving data:', error);
              Alert.alert('Error', 'Failed to save changes. Please try again.');
            } finally {
              setSaving(false);
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Business Profile</Text>
          
          <ImagePicker
            value={formData.profileImage}
            onChange={(uri) => setFormData({ ...formData, profileImage: uri })}
            error={errors.profileImage}
          />

<FormInput
            label="Mess Name"
            value={formData.Mess}
            onChangeText={(text) => setFormData({ ...formData, Mess: text })}
            error={errors.Mess}
            required
          />
          <FormInput
            label="Phone"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
            error={errors.phone}
            required
          />

          <FormInput
            label="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            required
          />

          <Text style={styles.sectionTitle}>Address</Text>

          <FormInput
            label="Street Address"
            value={formData.street}
            onChangeText={(text) => setFormData({ ...formData, street: text })}
            error={errors.street}
            required
          />

          <FormInput
            label="City"
            value={formData.city}
            onChangeText={(text) => setFormData({ ...formData, city: text })}
            error={errors.city}
            required
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <FormInput
                label="State"
                value={formData.state}
                onChangeText={(text) => setFormData({ ...formData, state: text })}
                error={errors.state}
                required
              />
            </View>
            <View style={styles.halfWidth}>
              <FormInput
                label="ZIP Code"
                value={formData.zipCode}
                onChangeText={(text) => setFormData({ ...formData, zipCode: text })}
                keyboardType="numeric"
                error={errors.zipCode}
                required
              />
            </View>
          </View>

          <FormInput
            label="Venue Capacity"
            value={formData.capacity}
            onChangeText={(text) => setFormData({ ...formData, capacity: text })}
            keyboardType="numeric"
            error={errors.capacity}
            required
          />

      <FormInput
            label="Business Hours"
            value={formData.businessHours}
            onChangeText={(text) => setFormData({ ...formData, capacity: text })}
            error={errors.capacity}
            required
          />
        
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
    marginBottom: 8,
  },
});