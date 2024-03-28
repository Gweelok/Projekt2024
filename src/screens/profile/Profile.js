import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";
import profileStyles from "./profileStyles";

import { t, useLanguage } from "../../languages/LanguageHandler";
import MenuItems from "../../components/menu-items/MenuItems";

import { BadgeContext } from "../../contexts/BadgeContext/BadgeContext";
import ScrollViewComponent from "../../components/ScrollViewComponent/ScrollViewComponent";
import Screens from "../../utils/ScreenPaths";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  const { currentLanguage } = useLanguage();
  const { badgeCount } = React.useContext(BadgeContext);
  return (
    <InteractiveScreen>
      <ScrollViewComponent style={profileStyles.topSpacer}>
        <View>
          <MenuItems
            msg={t("ProfileScreen.MySettings", currentLanguage)}
            onPress={() => navigation.navigate(Screens.MY_SETTINGS)}
            style={profileStyles.menuItem}
          />
        </View>
        <View>
          <MenuItems
            msg={t("ProfileScreen.MyDrafts", currentLanguage)}
            onPress={() => navigation.navigate(Screens.MY_DRAFTS)}
            badge={badgeCount > 0 ? badgeCount : null}
            style={profileStyles.menuItem}
          />
        </View>
        <View>
          <MenuItems
            msg={t("ProfileScreen.DataPolicy", currentLanguage)}
            onPress={() => navigation.navigate(Screens.DATA_POLICY)}
            style={profileStyles.menuItem}
          />
        </View>
        <View>
          <MenuItems
            msg={t("ProfileScreen.ContactUs", currentLanguage)}
            onPress={() => navigation.navigate(Screens.CONTACT_US)}
            style={profileStyles.menuItem}
          />
        </View>
        <View>
          <MenuItems
            msg={t("Profile.logout", currentLanguage)}
            onPress={() => navigation.navigate(Screens.LOGOUT_CONFIRMATION)}
            style={profileStyles.menuItem}
          />
        </View>
      </ScrollViewComponent>

    </InteractiveScreen>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Profile;
