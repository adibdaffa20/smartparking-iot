import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyATLNyMeI0UL466kKqfRSJWUFOXRnwfV0Q",
  authDomain: "smartparking-f8be2.firebaseapp.com",
  projectId: "smartparking-f8be2",
  storageBucket: "smartparking-f8be2.appspot.com",
  messagingSenderId: "719552682532",
  appId: "1:719552682532:web:08cf512e67d3af180b16b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const colors = {
  themeColor: "#fff",
  white: "black",
  background: "#f4f6fc",
  black: "#778899",
  greyish: "#d3d3d3",
  tint: "#00008b",
  brdcolor: "#dcdcdc",
  blue: "#09419c",
  yellow: "#FFDB00",
  red: "#FF0000"
};

const App = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [allSelected, setAllSelected] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [slots, setSlots] = useState({
    A1: colors.yellow,
    A2: colors.yellow,
    A3: colors.yellow
  });
  const username = route.params?.username || "User";

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning,");
    } else if (currentHour < 18) {  
      setGreeting("Good Afternoon,");
    } else if (currentHour < 21) {
      setGreeting("Good Evening,");
    } else {
      setGreeting("Good Night,");
    }

    // Listen for changes in the Firebase Realtime Database
    const slotsRef = ref(db, 'slots/');
    onValue(slotsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSlots({
          A1: data.A1?.status === "occupied" ? colors.red : colors.yellow,
          A2: data.A2?.status === "occupied" ? colors.red : colors.yellow,
          A3: data.A3?.status === "occupied" ? colors.red : colors.yellow
        });
      }
    });
  }, []);

  const handleCategoryPress = (category) => {
    Alert.alert(
      "Booking Confirmation",
      `What do you want to do with ${category}?`,
      [
        {
          text: "Cancel Booking",
          onPress: async () => {
            console.log(`Booking for ${category} cancelled`);
            try {
              // Update the booking status in Firebase
              await set(ref(db, 'slots/' + category), {
                status: "available",
                bookedBy: null,
                timestamp: null
              });

              // Set the servo state to open in Firebase
              await set(ref(db, 'servo/' + category), {
                state: "open"
              });

              // Update the local state to reflect the cancellation
              setSlots((prevSlots) => ({
                ...prevSlots,
                [category]: colors.yellow
              }));
            } catch (e) {
              console.error("Error cancelling booking: ", e);
            }
          },
          style: "cancel"
        },
        {
          text: "Book Slot",
          onPress: async () => {
            console.log(`${category} booked`);
            try {
              // Update the booking status in Firebase
              await set(ref(db, 'slots/' + category), {
                status: "occupied",
                bookedBy: username,
                timestamp: new Date().toISOString()
              });

              // Set the servo state to closed in Firebase
              await set(ref(db, 'servo/' + category), {
                state: "closed"
              });

              // Update the local state to reflect the booking
              setSlots((prevSlots) => ({
                ...prevSlots,
                [category]: colors.red
              }));
            } catch (e) {
              console.error("Error booking slot: ", e);
            }
          }
        }
      ]
    );
  };

  const handleFooterButtonPress = (buttonName) => {
    if (buttonName === "Profile") {
      navigation.navigate('Profile', { username });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.themeColor }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.blue} />
      <View style={{ backgroundColor: colors.themeColor, flex: 1 }}>
        <View style={{ backgroundColor: colors.blue, width: '100%' }}>
          <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: colors.greyish, fontSize: 30 }}>
                {greeting}
              </Text>
              <Text style={{ color: colors.white, fontSize: 30 }}>
                {username}
              </Text>
              <Text style={{ color: colors.brdcolor, fontWeight: "bold", fontSize: 20, marginTop: 30 }}>
                {"Let's Find the Best Parking Space!"}
              </Text>
            </View>
            <Image
              source={{
                uri: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2qsIm-TY-CbL48rzncMX_hiwJYhgYFDyzgrxM_iCn1enUenC0X5xsNJ-lEQ3ivRT_aIiM98XlZDxbxrGCfX13bllkAKvneU6rnVNlncQSdjg7fG082ghkO3jqWm7UnwrismbageOqQfj9jqW8OJOJ8Yqj1zqNSLVkTgF5UDHCTGeKW4kzGuaggQ/w400-h300/Telkom%20University%20Logo.png",
              }}
              style={{ width: 80, height: 80, borderRadius: 50, marginRight: 40, marginBottom: 50 }}
            />
          </View>
        </View>
        <Text style={{ color: colors.white, fontSize: 20, marginTop: 20, marginLeft: 16, fontWeight: "bold" }}>
          {"Slot Parking"}
        </Text>
        <View style={{ flexDirection: 'row', marginLeft: 16 }}>
          <TouchableOpacity onPress={() => handleCategoryPress("A1")} style={[styles.parkingButton, { marginRight: 16, backgroundColor: slots.A1 }]}>
            <Text style={styles.parkingButtonText}>A1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategoryPress("A2")} style={[styles.parkingButton, { backgroundColor: slots.A2 }]}>
            <Text style={styles.parkingButtonText}>A2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategoryPress("A3")} style={[styles.parkingButton, { marginLeft: 16, backgroundColor: slots.A3 }]}>
            <Text style={styles.parkingButtonText}>A3</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => handleFooterButtonPress("Home")}>
          <MaterialCommunityIcons
            name="home"
            size={30}
            style={{ color: colors.white }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFooterButtonPress("Profile")}>
          <MaterialCommunityIcons
            name="account"
            size={30}
            style={{ color: colors.white }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parkingButton: {
    paddingVertical: 48,
    paddingHorizontal: 48,
    borderRadius: 20,
    marginTop: 20
  },
  parkingButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
});

export default App;
