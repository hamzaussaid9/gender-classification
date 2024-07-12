import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import axiosInstance from './config/axios';
import { getUser } from './config/utils';
import { removeItem } from './config/storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const Home = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const userData = await getUser();
      setUser(userData[0]);
    })();
    setImage(null);
    setDetectionResult(null);
  }, [isFocused]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setDetectionResult(null);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setDetectionResult(null);
    }
  };

  const detectImage = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      const currentUser = await getUser();
      formData.append('file', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      const detection = await axios.post('https://gender-classification-using-deep-learning-5nk3r7daaa-uc.a.run.app/detect_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setDetectionResult(`Prediction: ${detection?.data?.prediction}`);
      await axiosInstance.post('/predictions', {
        ...detection.data,
        userId: `${user?.id}`,
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  const discardImage = () => {
    setImage(null);
    setDetectionResult(null);
  };

  const handleLogout = () => {
    removeItem('user');
    navigation.navigate('Start');
  };

  const resetState = () => {
    setImage(null);
    setDetectionResult(null);
    setLoading(false);
  };

  const handleCheckAndDownload = () => {
    Alert.alert('No data found');
  };

  return (
    <View style={styles.container}>
      {user && <Text style={styles.greeting}>Hello, {user.name}</Text>}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.predictionsButton} onPress={() => navigation.navigate('Predictions')}>
        <Text style={styles.predictionsButtonText}>My Predictions</Text>
      </TouchableOpacity>

      {!detectionResult && (
        <>
          <Text style={styles.title}>Steps to follow:</Text>
          <Text style={styles.steps}>1. Upload an image to scan.</Text>
          <Text style={styles.steps}>2. Click Submit.</Text>

          {!image ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.galleryButton]} onPress={pickImage} disabled={loading}>
                <Text style={styles.buttonText}>Select from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cameraButton]} onPress={takePhoto} disabled={loading}>
                <Text style={styles.buttonText}>Take Photo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.detectButton]} onPress={detectImage} disabled={loading}>
                  <Text style={styles.buttonText}>Detect</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.discardButton]} onPress={discardImage} disabled={loading}>
                  <Text style={styles.buttonText}>Discard</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}

      {loading && <ActivityIndicator size="large" color="#1E90FF" />}

      {detectionResult && (
        <View style={styles.resultContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.resultText}>{detectionResult}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.newDetectionButton} onPress={resetState}>
              <Text style={styles.buttonText}>New Detection</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadButton} onPress={handleCheckAndDownload}>
              <Text style={styles.buttonText}>Check and Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 80,
    marginBottom: 20,
    color: '#343A40',
  },
  logoutButton: {
    backgroundColor: '#DC3545',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 40,
    right: 20,
  },
  logoutButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  predictionsButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 40,
    left: 20,
  },
  predictionsButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343A40',
  },
  steps: {
    fontSize: 18,
    marginBottom: 10,
    color: '#6C757D',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 10,
    width: '45%',
    alignItems: 'center',
  },
  galleryButton: {
    backgroundColor: '#17A2B8',
  },
  cameraButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  detectButton: {
    backgroundColor: '#FFC107',
  },
  discardButton: {
    backgroundColor: '#FD7E14',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343A40',
  },
  newDetectionButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  downloadButton: {
    backgroundColor: '#6F42C1',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '45%',
    alignItems: 'center',
  },
});

export default Home;
