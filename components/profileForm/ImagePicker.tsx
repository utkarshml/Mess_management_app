import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Text, Alert } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import { Camera, ImagePlus } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';

interface ImagePickerProps {
  value?: string;
  onChange: (uri: string) => void;
  error?: string;
}

export function ImagePicker({ value, onChange, error }: ImagePickerProps) {
  const [loading, setLoading] = useState(false);
  const {appwrite , user} = useAuth()

  const pickImage = async () => {
    try {
      setLoading(true);
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
     
      if (!result.canceled) {
        
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        const file = new File(
          [blob],
          user?.name ?? result.assets[0].fileName ?? 'default_filename.jpg',
          { type: result.assets[0].mimeType ?? 'image/jpeg' }
        );
        //  const resp = await appwrite.uploadImage(file);
         onChange(result.assets[0].uri);
        // //  onChange(resp.$uploads[0].href);
        // console.log('Image uploaded successfully:', resp);

      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : value ? (
          <Image source={{ uri: value }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <ImagePlus size={40} color="#666" />
            <Text style={styles.placeholderText}>Upload Photo</Text>
          </View>
        )}
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 4,
  },
});


const prepareFileForUpload = async (fileUri: string, fileName: string) => {
  try {
    const response = await fetch(fileUri);
    const blob = await response.blob();

    const file = new File([blob], fileName, { type: "image/jpeg" });

    console.log(file);
  } catch (error) {
    console.error("Error preparing file:", error);
  }
};
