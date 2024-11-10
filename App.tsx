// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState(null);
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const handleLogin = async () => {
    setShowOtpScreen(true);
    return false
    try {
      const response = await axios.post(
        'https://swifttest.maruti.co.in/hrassist/api/login',
        {
          UserName: 'kE6tJ/kXVZ/7dLPvj1pzQg==',
          Password: '7XBH1JfGjWPg9k7Nd2/oNw==',
        }
      );

      const { token } = response.data;
      setToken(token);
      setShowOtpScreen(true);
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your credentials.');
      console.error(error);
    }
  };

  const handleOtpRequest = async () => {
    setShowOtpScreen(false);
    return false
    try {
      const response = await axios.post(
        'https://swifttest.maruti.co.in/hrassist/api/GenTaxiDriverOTP',
        { UserName: phoneNumber, Password: '' },
        { headers: { authToken: token } }
      );

      const otpNumber = response.data.Result?.[0]?.OTP_Number;
      Alert.alert('OTP Received', `Your OTP is ${otpNumber}`);
    } catch (error) {
      Alert.alert('OTP Request Failed', 'Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://www.motoroids.com/wp-content/uploads/2011/04/Maruti-Suzuki-Logo-2019.jpg' }} style={styles.logo} />
      <Text style={styles.heading}>Maruti Suzuki Taxi Rental</Text>
      <Text style={styles.subheading}>Reliable taxi rentals for your journey</Text>

      {!showOtpScreen ? (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Phone Number</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Request OTP</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter OTP</Text>
          <TextInput
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            style={styles.input}
            placeholder="OTP"
            placeholderTextColor="#aaa"
          />
          <View style={styles.otpHeading}>
            <Text>OTP has been send to your registered Mobile Number +91**********. OTP Will be Valid For 04:57</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleOtpRequest}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    // justifyContent: 'center',
    // marginTop:100,
    padding: 20,
  },
  logo: {
    width: 320,
    height: 120,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002f6c',
    marginBottom: 5,
    marginTop:100
  },
  subheading: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: 10,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#002f6c',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  otpHeading: {
    marginBottom: 20
  }
});

export default App;
