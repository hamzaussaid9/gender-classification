import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axiosInstance from '../config/axios';
import { setItem } from '../config/storage';

const LoginScreen = ({ toggleMove }) => {
  const navigator = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = async () =>{
    try {
      const user = await axiosInstance.get(`/users?number=${phoneNumber}`);
      console.log(user);
      if(user.length === 0){
        Alert.alert('Error', "User Does not exists");
      }
      else if(user[0].password !== password){
        Alert.alert('Error', "Credidentials are incorrrect");
      }
      else if(
        user[0].number === phoneNumber &&
        user[0].password === password
      ){
        await setItem('user',user);
        navigator.navigate('Home')
      }
    } catch (error) {
      Alert.alert('Error', error?.message || "server error")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topGreenShape}></View>
      <View style={styles.card}>
        <Text style={styles.welcomeText}>Welcome{'\n'}Back!!!</Text>
        <Text style={styles.loginText}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your number"
          placeholderTextColor="#aaa"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Text>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => { loginHandler() }}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>Or</Text>
        <TouchableOpacity onPress={() => toggleMove()}>
          <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink}>Register</Text></Text>
        </TouchableOpacity>
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    marginTop: 20,
    top: 0,
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 18,
    width: '100%',
    textAlign: 'left',
    color: '#000',
  },
  loginText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    width: '100%',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  eyeImage: {
    width: 20,
    height: 20,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 80,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    color: '#000',
    marginVertical: 20,
  },
  registerText: {
    color: '#000',
  },
  registerLink: {
    color: 'red',
  },
});

export default LoginScreen;
