import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, ActivityIndicator, Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { analyzeImageData } from '../utils/colorAnalysis';
import * as ImageManipulator from 'expo-image-manipulator';
import WebCamera from '../components/WebCamera';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Camera'>;
};

const CameraScreen: React.FC<Props> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    } else {
      setHasPermission(true);
    }
  }, []);

  const handleImageCapture = async (imageData: Uint8Array) => {
    try {
      setIsAnalyzing(true);
      const results = analyzeImageData(imageData);
      navigation.navigate('Results', { results });
    } catch (error) {
      Alert.alert(
        'Analysis Error',
        'Unable to analyze the image. Please try again with better lighting.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current && !isAnalyzing) {
      try {
        setIsAnalyzing(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: false,
          exif: true,
        });

        const manipulatedImage = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 300, height: 300 } }],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );

        const response = await fetch(manipulatedImage.uri);
        const blob = await response.blob();
        const reader = new FileReader();
        
        reader.onload = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          handleImageCapture(uint8Array);
        };
        
        reader.onerror = () => {
          Alert.alert('Error', 'Failed to process image');
        };
        
        reader.readAsArrayBuffer(blob);
      } catch (error) {
        Alert.alert('Error', 'Failed to take photo. Please try again.');
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.statusText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>No access to camera</Text>
        <Text style={styles.statusText}>Please enable camera access in your device settings.</Text>
      </View>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <WebCamera onCapture={handleImageCapture} />
        {isAnalyzing && (
          <View style={styles.analyzingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.analyzingText}>Analyzing...</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={CameraType.front}
      />
      <View style={styles.overlay}>
        <View style={styles.guideFrame} />
        <TouchableOpacity
          style={[styles.captureButton, isAnalyzing && styles.captureButtonDisabled]}
          onPress={takePhoto}
          disabled={isAnalyzing}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
        {isAnalyzing && (
          <View style={styles.analyzingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.analyzingText}>Analyzing...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideFrame: {
    position: 'absolute',
    top: '20%',
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 125,
    opacity: 0.7,
  },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 35,
    padding: 5,
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  captureButtonInner: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
  },
  analyzingContainer: {
    position: 'absolute',
    bottom: 120,
    alignItems: 'center',
  },
  analyzingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  statusText: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default CameraScreen; 