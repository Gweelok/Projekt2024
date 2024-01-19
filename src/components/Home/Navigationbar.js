//imports
import { StyleSheet, View, Pressable} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Primarycolor1, Primarycolor2 } from "../../styles/styleSheet";

//Page_names
const PAGE_NAMES = {
  HOME: "home",
  STATS: "stats",
  PROFILE: "profile",
};

//Selected page
let selected = PAGE_NAMES.HOME;

const Navigationbar = ({ navigation }) => {

  //handles when clicked on icons
  const handlePress = (iconName) => {

    switch (iconName) {
      case PAGE_NAMES.HOME: selected = PAGE_NAMES.HOME;
        //navigation.navigate("Homepage");
        console.log('Home page');
        break;
      case PAGE_NAMES.STATS: selected = PAGE_NAMES.STATS;
        //navigation.navigate("Stats");
        console.log('Stats page');
        break;
      case PAGE_NAMES.PROFILE: selected = PAGE_NAMES.PROFILE;
        //navigation.navigate("Profile");
        console.log('Profile page');
        break;
    }
  };

  return (

    <View style={styles.tabBarStyle}>
      <Pressable onPress={() => handlePress(PAGE_NAMES.HOME)}>
        {
          selected == PAGE_NAMES.HOME ? (
            <Ionicons name="ios-home-sharp" size={24} color={Primarycolor1} />
          ) : (
            <Ionicons name="ios-home-outline" size={24} color={Primarycolor1} />
          )
        }
      </Pressable>

      <Pressable onPress={() => handlePress(PAGE_NAMES.STATS)}>
        {
          selected == PAGE_NAMES.STATS ? (
            <Ionicons
              name="stats-chart-sharp"
              size={22}
              color={Primarycolor1}
            />
          ) : (
            <Ionicons
              name="stats-chart-outline"
              size={24}
              color={Primarycolor1}
            />
          )
        }
      </Pressable>

      <Pressable onPress={() => handlePress(PAGE_NAMES.PROFILE)}>
        <View>
          {
            selected == PAGE_NAMES.PROFILE ? (
              <Ionicons
                name="person-circle-sharp"
                size={24}
                color={Primarycolor1}
              />
            ) : (
              <Ionicons
                name="person-circle-outline"
                size={24}
                color={Primarycolor1}
              />
            )
          }
        </View>
      </Pressable>
    </View>
  );
};

export default Navigationbar;
// styles for the tool bar
const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: -5,
    left: -5,
    elevation: 0,
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: Primarycolor2,
    borderWidth: 2,
  }
});
