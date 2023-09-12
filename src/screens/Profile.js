
import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { styles, Backgroundstyle, profileStyles } from "../styles/Stylesheet";
import Navigationbar from "../componets/Navigationbar";
import { Ionicons } from "@expo/vector-icons";
import { t, useLanguage } from "../Languages/LanguageHandler";
import MenuItems from "../styles/MenuItems";
import GlobalStyle from "../styles/GlobalStyle";
import {BadgeContext} from "./form/BadgeContext";

const Profile = ({ navigation }) => {
    const { currentLanguage } = useLanguage();
    const { badgeCount } = React.useContext(BadgeContext);
  return (
    <View style={Backgroundstyle.interactive_screens}>
        <View style={GlobalStyle.BodyWrapper}>
      <View style={profileStyles.profileIcon}>
        <Ionicons
          style={profileStyles.profileIcon}
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
                    badge={badgeCount > 0 ? badgeCount : null} // Pass the badge as a prop
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
          onPress={() => navigation.navigate("LogoutConfirmation")}
        />
      </View>
      <Navigationbar navigation={navigation} />
    </View>
      </View>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Profile;
