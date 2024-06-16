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

const colors = {
  themeColor: "#fff",
  white: "black",
  background: "#f4f6fc",
  black: "#778899",
  greyish: "#d3d3d3",
  tint: "#00008b",
  brdcolor: "#dcdcdc",
  blue: "#1F77D0",
  yellow: "#FFDB00",
};

const App = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [allSelected, setAllSelected] = useState(true);
  const [greeting, setGreeting] = useState("");
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
  }, []);

  const handleAllPress = () => {
    setAllSelected(true);
  };

  const handleCategoryPress = (category) => {
    Alert.alert(
      "Booking Confirmation",
      `Are you sure for booking ${category}?`,
      [
        {
          text: "No",
          onPress: () => console.log("Booking cancelled"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => console.log(`${category} booked`),
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
          <TouchableOpacity onPress={() => handleCategoryPress("A1")} style={[styles.parkingButton, { marginRight: 16 }]}>
            <Text style={styles.parkingButtonText}>A1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategoryPress("A2")} style={styles.parkingButton}>
            <Text style={styles.parkingButtonText}>A2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategoryPress("A3")} style={[styles.parkingButton, { marginLeft: 16 }]}>
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
    backgroundColor: colors.yellow,
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
