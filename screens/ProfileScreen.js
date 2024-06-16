import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const colors = {
  themeColor: "#fff",
  white: "#ffffff",
  background: "#f4f6fc",
  black: "#000000",
  greyish: "#778899",
  tint: "#00008b",
  brdcolor: "#dcdcdc",
  blue: "#1F77D0",
  yellow: "#FFDB00",
};

const Profile = ({ route }) => {
  const { username } = route.params;
  const navigation = useNavigation();

  const handleLogout = () => {
    // Logika untuk logout
    console.log('User logged out');
    navigation.navigate('Welcome'); // Misalnya navigasi ke halaman login
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={30} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.header}>My Profile</Text>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={30} color={colors.black} />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2qsIm-TY-CbL48rzncMX_hiwJYhgYFDyzgrxM_iCn1enUenC0X5xsNJ-lEQ3ivRT_aIiM98XlZDxbxrGCfX13bllkAKvneU6rnVNlncQSdjg7fG082ghkO3jqWm7UnwrismbageOqQfj9jqW8OJOJ8Yqj1zqNSLVkTgF5UDHCTGeKW4kzGuaggQ/w400-h300/Telkom%20University%20Logo.png",
        }}
        style={styles.profileImage}
      />
      <Text style={styles.username}>{username}</Text>
      
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutHeader}>About</Text>
        <Text style={styles.aboutText}>
          Hello, my name is {username}. Welcome to my profile! I am passionate about finding the best parking spaces and making the most of my time. I enjoy helping others and providing solutions that make life easier.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeColor,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    color: colors.black,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.blue,
    alignSelf: 'center',
  },
  username: {
    fontSize: 20,
    color: colors.black,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  aboutContainer: {
    backgroundColor: colors.blue,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  aboutHeader: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  aboutText: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
  },
});

export default Profile;
