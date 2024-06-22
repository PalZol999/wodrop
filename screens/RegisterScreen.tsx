import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { validateEmail, validatePassword } from '../component/Validation';
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import { RegData } from '../component/Interface';

const RegisterScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleRegister = (): void => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('The email address must contain "@"');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('The password must be at least 6 characters long and contain a number');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) {
      return;
    }

    const user: RegData = {
      firstName,
      lastName,
      email,
      password,
    };

    console.log('Attempting to register with:', user);

    axios.post('http://192.168.0.60:3000/register', user)
      .then(response => {
        console.log('Registration successful:', response.data);
        Alert.alert('Success', 'Registration successful!');
        navigation.navigate('DateToPick'); // Navigate to the DateToPick screen on success
      })
      .catch(error => {
        console.error('Registration error:', error);
        Alert.alert('Error', 'Registration failed: ' + error.message);
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
      <Text style={styles.title}>Welcome!</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 8,
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

export default RegisterScreen;
