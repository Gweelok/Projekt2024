import React from "react";
import { View, Text, Pressable } from "react-native";
import PropTypes from "prop-types";
import { styles, Backgroundstyle, profileStyles } from "../styles/Stylesheet";
import Navigationbar from "../componets/Navigationbar";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const PROFILESCREEN = {
  MySettings: "MySettings",
  MyDrafts: "MyDrafts",
  DataPolicy: "DataPolicy",
  ContactUs: "ContactUs",
  LogOut: "LogOut",
};

const Profile = ({ navigation }) => {
  const handlePress = (selectedOption) => {
    if (selectedOption === PROFILESCREEN.MySettings) {
      navigation.navigate("MySettings");
    } else if (selectedOption === PROFILESCREEN.MyDrafts) {
      navigation.navigate("MyDrafts");
    } else if (selectedOption === PROFILESCREEN.DataPolicy) {
      navigation.navigate("DataPolicy");
    } else if (selectedOption === PROFILESCREEN.ContactUs) {
      navigation.navigate("ContactUs");
    } else if (selectedOption === PROFILESCREEN.LogOut) {
      navigation.navigate("LogOut");
    }
  };

  return (
    <View style={Backgroundstyle.interactive_screens}>
      <View style={profileStyles.profileIcon}>
        <Ionicons
          style={styles.Header_Primarycolor1}
          name="person-circle-outline"
          size={150}
        />
        <Text style={styles.Header_Primarycolor1}>Profile page</Text>
      </View>
      <View>
        <Pressable onPress={() => handlePress(PROFILESCREEN.MySettings)}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItem_text}> My Settings </Text>
            <View style={styles.Icon_container}>
              <AntDesign name="right" size={30} style={styles.menuItem_arrow} />
            </View>
          </View>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => handlePress(PROFILESCREEN.MyDrafts)}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItem_text}> My Drafts </Text>
            <View style={styles.Icon_container}>
              <AntDesign name="right" size={30} style={styles.menuItem_arrow} />
            </View>
          </View>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => handlePress(PROFILESCREEN.DataPolicy)}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItem_text}> Data Policy </Text>
            <View style={styles.Icon_container}>
              <AntDesign name="right" size={30} style={styles.menuItem_arrow} />
            </View>
          </View>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => handlePress(PROFILESCREEN.ContactUs)}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItem_text}> Contact Us </Text>
            <View style={styles.Icon_container}>
              <AntDesign name="right" size={30} style={styles.menuItem_arrow} />
            </View>
          </View>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => handlePress(PROFILESCREEN.LogOut)}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItem_text}> Log Out </Text>
            <View style={styles.Icon_container}>
              <AntDesign name="right" size={30} style={styles.menuItem_arrow} />
            </View>
          </View>
        </Pressable>
      </View>
      <Navigationbar navigation={navigation} />
    </View>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Profile;
