import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { styles, Backgroundstyle, profileStyles } from "../styles/Stylesheet";
import Navigationbar from "../componets/Navigationbar";
import { Ionicons } from "@expo/vector-icons";
import { t, useLanguage } from "../Languages/LanguageHandler";
import MenuItems from "../styles/MenuItems";

const Profile = ({ navigation }) => {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <View style={Backgroundstyle.interactive_screens}>
      <View style={profileStyles.profileIcon}>
        <Ionicons
          style={styles.Header_Primarycolor1}
          name="person-circle-outline"
          size={150}
        />
        <Text
          msg={t("ProfileScreen.ProfilePage", currentLanguage)}
          onPress={() => navigation.navigate("ProfilePage")}
          style={styles.Header_Primarycolor1}>
          Edit Profile
        </Text>
      </View>
      <View>
        <MenuItems
          msg={t("ProfileScreen.MySettings", currentLanguage)}
          onPress={() => navigation.navigate("MySettings")}
        />
      </View>
      <View>
        <MenuItems
          msg={t("ProfileScreen.MyDrafts", currentLanguage)}
          onPress={() => navigation.navigate("MyDrafts")}
        />
      </View>
      <View>
        <MenuItems
          msg={t("ProfileScreen.DataPolicy", currentLanguage)}
          onPress={() => navigation.navigate("DataPolicy")}
        />
      </View>
      <View>
        <MenuItems
          msg={t("ProfileScreen.ContactUs", currentLanguage)}
          onPress={() => navigation.navigate("ContactUs")}
        />
      </View>
      <View>
        <MenuItems 
          msg={t("Profile.logout", currentLanguage)}
          onPress={() => navigation.navigate('LogoutConfirmation')}
        />
      </View>
      <Navigationbar navigation={navigation} />
    </View>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Profile;
