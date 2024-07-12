import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const WelcomeScreen = ({ setShowWelcome }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.icon}
          source={{
            uri: 'https://img.icons8.com/ios-filled/50/000000/user.png',
          }}
        />
        <Text style={styles.title}>Welcome To Gender Classification App</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setShowWelcome(false)}>
        <Text style={styles.buttonText}>Let's Go</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7ED957', // Green background color
    padding: 20,
  },
  card: {
    backgroundColor: '#A0E7A0', // Light green background color
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  icon: {
    marginTop: 50,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 2,
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    color: '#000',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#4CAF50', // Green button color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width: '80%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default WelcomeScreen;
