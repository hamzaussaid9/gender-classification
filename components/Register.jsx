import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axiosInstance from '../config/axios';

const RegisterScreen = ({ toggleMove }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleUserRegister = async () => {
    try {
      const checkUser = await axiosInstance.get(`/users?number=${phoneNumber}`);
      if(checkUser.length > 0){
        Alert.alert("Error", "User Already exists with this number")
      }
      else{
        
      const addUser = await axiosInstance.post(`/users`,{name, number: phoneNumber, password})
      if(addUser){
        Alert.alert('Success', "User Registered Successfully");
        toggleMove();
      }
      }
    } catch (error) {
      Alert.alert('Error', error?.message || "server error")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topGreenShape}></View>
      <View style={styles.card}>
        <Text style={styles.helloText}>Hello</Text>
        <Text style={styles.registerText}>Register</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your number"
            placeholderTextColor="#aaa"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword((showPassword) => !showPassword)} style={styles.eyeIcon}>
            <Text>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={() => { handleUserRegister(); }}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.alreadyText}>Already have an account? <Text style={styles.loginLink} onPress={() => toggleMove()}>Login</Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  topGreenShape: {
    width: '100%',
    height: 300,
    backgroundColor: '#7ED957',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: 'absolute',

    top: 0,
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
    marginTop: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  helloText: {
    fontSize: 18,
    color: '#000',
    width: '100%',
    textAlign: 'left'
  },
  registerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    width: '100%',
    textAlign: 'left'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#000',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 80,
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  alreadyText: {
    color: '#000',
    marginTop: 20,
  },
  loginLink: {
    color: 'red',
  },
});

export default RegisterScreen;
