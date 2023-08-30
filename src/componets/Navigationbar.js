//imports
import { StyleSheet, View, Pressable } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Primarycolor1, Primarycolor2 } from "../styles/Stylesheet";

//Page_names
const PAGE_NAMES = {
  HOME: "home",
  MAP: "map",
  ADD: "add",
  STATS: "stats",
  PROFILE: "profile",
};

//Selected page
let selected = PAGE_NAMES.HOME;

const Navigationbar = ({ navigation }) => {
  //handles when clicked on icons
  const handlePress = (iconName) => {
    if (iconName == PAGE_NAMES.HOME) {
      selected = PAGE_NAMES.HOME;
      navigation.navigate("Homepage");
    } else if (iconName == PAGE_NAMES.MAP) {
      selected = PAGE_NAMES.MAP;
      navigation.navigate("Map");
    } else if (iconName == PAGE_NAMES.ADD) {
      selected = PAGE_NAMES.ADD;
      navigation.navigate("Add");
    } else if (iconName == PAGE_NAMES.STATS) {
      selected = PAGE_NAMES.STATS;
      navigation.navigate("Stats");
    } else if (iconName == PAGE_NAMES.PROFILE) {
      selected = PAGE_NAMES.PROFILE;
      navigation.navigate("Profile");
    }
  };

  return (
    <View style={styles.tabBarStyle}>
      <Pressable onPress={() => handlePress(PAGE_NAMES.HOME)}>
        {
          //check which icon will load
          selected == PAGE_NAMES.HOME ? (
            <Ionicons name="ios-home-sharp" size={24} color={Primarycolor1} />
          ) : (
            <Ionicons name="ios-home-outline" size={24} color={Primarycolor1} />
          )
        }
      </Pressable>

      <Pressable onPress={() => handlePress(PAGE_NAMES.MAP)}>
        {
          //check which icon will load
          selected == PAGE_NAMES.MAP ? (
            <Fontisto name="map-marker-alt" size={24} color={Primarycolor1} />
          ) : (
            <Feather name="map-pin" size={24} color={Primarycolor1} />
          )
        }
      </Pressable>

      <Pressable onPress={() => handlePress(PAGE_NAMES.ADD)}>
        {
          //check which icon will load
          selected == PAGE_NAMES.ADD ? (
            <AntDesign name="pluscircle" size={24} color={Primarycolor1} />
          ) : (
            <AntDesign name="pluscircleo" size={24} color={Primarycolor1} />
          )
        }
      </Pressable>

      <Pressable onPress={() => handlePress(PAGE_NAMES.STATS)}>
        {
          //check which icon will load
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
        {
          //check which icon will load
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
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: Primarycolor2,
    borderWidth: 2,
  },
});
