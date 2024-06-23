import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(); // Get the auth instance

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const username = userCredential.user.displayName || "User";
        navigation.navigate('Home', { username });
      } catch (err) {
        console.log('got error: ', err.message);
        Alert.alert(
          'Login Error',
          'Incorrect email or password. Please try again.',
          [{ text: 'OK' }]
        );
      }
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="25" color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image source={require('../assets/images/login.png')}
            style={{ width: 200, height: 200 }} />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-green px-8 pt-8">
        <View className="form space-y-2">
          <Text className="text-white ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-900 rounded-2xl mb-3"
            placeholder="Email"
            value={email}
            onChangeText={value => setEmail(value)}
          />
          <Text className="text-white ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-16"
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <TouchableOpacity
            onPress={handleSubmit}
            className="py-3 bg-yellow-400 rounded-xl">
            <Text
              className="text-xl font-bold text-center text-black"
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-5">
          <Text className="text-white font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="font-semibold text-yellow-500"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
