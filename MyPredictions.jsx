import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import axiosInstance from './config/axios';
import { getUser } from './config/utils';
import { removeItem } from './config/storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const Predictions = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      const user = await getUser();
      const response = await axiosInstance.get(`/predictions?userId=${user[0]?.id}`);
      console.log(user[0]?.id, response);
      setPredictions(response || []);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  console.log(predictions);

  useEffect(() => {
    fetchPredictions();
  }, [isFocused]);

  const handleLogout = async () => {
    removeItem('user');
    navigation.replace('Start');
  };

  const renderPrediction = ({ item }) => (
    <View style={styles.predictionContainer}>
      <Image source={{ uri: item.image_path }} style={styles.predictionImage} />
      <Text style={styles.predictionText}>Prediction: {item.prediction}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.title}>My Predictions</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : predictions.length === 0 ? (
        <Text style={styles.noPredictionsText}>No predictions found.</Text>
      ) : (
        <FlatList
          data={predictions}
          renderItem={renderPrediction}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <TouchableOpacity style={styles.newDetectionButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>New Detection</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    padding: 20,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    marginTop: 80,
  },
  noPredictionsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  predictionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  predictionImage: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 10,
  },
  predictionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  newDetectionButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Predictions;
