import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { themeColors } from '../theme';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    if (email && password && username) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(userCredential.user, {
          displayName: username,
        });
        Alert.alert(
          'Sign Up Successful',
          'Your account has been created successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login', { username }),
            },
          ]
        );
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          Alert.alert(
            'Sign Up Error',
            'The email address is already in use by another account. Please try a different email.',
            [{ text: 'OK' }]
          );
        } else if (err.code === 'auth/weak-password') {
          Alert.alert(
            'Sign Up Error',
            'The password is too weak. Please try a stronger password.',
            [{ text: 'OK' }]
          );
        } else {
          Alert.alert(
            'Sign Up Error',
            err.message,
            [{ text: 'OK' }]
          );
        }
      }
    } else {
      Alert.alert(
        'Sign Up Error',
        'Please fill all the fields.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View className="flex-row justify-center">
        <Image source={require('../assets/images/signup.png')}
          style={{ width: 165, height: 110 }} />
      </View>
      <View className="flex-1 px-8 pt-8">
        <View className="form space-y-2">
          <Text className="text-black-700 ml-4">Username</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-900 rounded-2xl mb-3"
            placeholder="Username"
            value={username}
            onChangeText={value => setUsername(value)}
          />
          <Text className="text-black-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-900 rounded-2xl mb-3"
            placeholder="Email"
            value={email}
            onChangeText={value => setEmail(value)}
          />
          <Text className="text-black-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <TouchableOpacity onPress={handleSubmit} className="py-3 bg-yellow-400 rounded-xl">
            <Text className="text-xl font-bold text-center text-black">Sign Up</Text>
          </TouchableOpacity>
          <View className="flex-row justify-center mt-7">
            <Text className="text-black-500 font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="font-semibold text-yellow-500"> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
