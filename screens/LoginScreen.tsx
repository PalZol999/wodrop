import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import { LogData } from '../component/Interface';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (): void => {
    const user: LogData = {
      email,
      password,
    };

    console.log('Attempting to log in with:', user);

    axios.post('http://192.168.0.60:3000/login', user, {
  headers: {
    'Content-Type': 'application/json',
  }
})
   
      .then(response => {
        console.log('Login successful:', response.data);
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('DateToPick'); // Navigate to the DateToPick screen on success
      })
      .catch(error => {
        console.error('Login error:', error);
        Alert.alert('Error', 'Login failed: ' + error.message);
      });
  };

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back (...Squat)</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Register button pressed');
          navigation.navigate('Register');
        }}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#5257F2',
  },
  title: {
    fontFamily: 'Pacifico_400Regular',
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'white',
  },
  button: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
