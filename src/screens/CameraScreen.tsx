import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

type CameraScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const navigation = useNavigation<CameraScreenNavigationProp>();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        navigation.navigate('Results', { results: { season: 'Spring', undertone: 'warm', confidence: 0.8, recommendedColors: [] } });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.captureButton}
        onPress={takePicture}
      >
        <Text style={styles.buttonText}>Take Picture</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
}); 