//React
import React, { useState } from "react";
import { View, Pressable, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
//Icons
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
//Context
import { BadgeContext } from "../../contexts/BadgeContext/BadgeContext";
//Utils
import Screens from "../../utils/ScreenPaths";
//Style
import navigationBarStyles from "./navigationBarStyles";
import { useEffect } from "react";
import visibleNavbarScreens from "../../utils/navbarScreenList";

const Navigationbar = ({ currentRoute }) => {
  const [isVisible, setisVisible] = useState(true)
  const [selected, setSelected] = useState(Screens.HOME);
  const { badgeCount } = React.useContext(BadgeContext);
  const navigation = useNavigation();

  /*Checks if current Screen is in visibleNavbarScreens list*/
  const shouldShowBottomNavigationBar = () => {
    return visibleNavbarScreens.includes(currentRoute);
  };


  /*
    Check if currentRoute is route in navbar, then highlights.
    Will update navbar even if user press backw on phone.
  */
  useEffect(() => {
    setisVisible(shouldShowBottomNavigationBar())

    if ([Screens.HOME, Screens.MAP, Screens.ADD, Screens.STATS, Screens.PROFILE].includes(currentRoute)) {
      setSelected(currentRoute)
    }
  }, [currentRoute])

  //Handels navigation onPress
  const handlePress = (iconName) => {
    navigation.navigate(iconName);
  };

  if (isVisible)
    return (
      <View style={navigationBarStyles.tabBarStyle}>
        <Pressable onPress={() => handlePress(Screens.HOME)} style={navigationBarStyles.iconContainer}>
          {
            //check which icon will load
            selected == Screens.HOME ? (
              <Ionicons
                name="ios-home-sharp"
                style={navigationBarStyles.icon}
              />
            ) : (
              <Ionicons
                name="ios-home-outline"
                style={navigationBarStyles.icon}
              />
            )
          }
        </Pressable>

        <Pressable onPress={() => handlePress(Screens.MAP)} style={navigationBarStyles.iconContainer}>
          {
            //check which icon will load    <--- Uses diffrent icons which creates a motion.
            selected == Screens.MAP ? (
              <Fontisto
                name="map-marker-alt"
                style={navigationBarStyles.icon}
              />
            ) : (
              <Feather
                name="map-pin"
                style={navigationBarStyles.icon}
              />
            )
          }
        </Pressable>

        <Pressable onPress={() => handlePress(Screens.ADD)} style={navigationBarStyles.iconContainer}>
          {
            //check which icon will load
            selected == Screens.ADD ? (
              <AntDesign
                name="pluscircle"
                style={navigationBarStyles.icon}
              />
            ) : (
              <AntDesign
                name="pluscircleo"
                style={navigationBarStyles.icon}
              />
            )
          }
        </Pressable>

        <Pressable onPress={() => handlePress(Screens.STATS)} style={navigationBarStyles.iconContainer}>
          {
            //check which icon will load
            selected == Screens.STATS ? (
              <Ionicons
                name="stats-chart-sharp"
                style={navigationBarStyles.icon}
              />
            ) : (
              <Ionicons
                name="stats-chart-outline"
                style={navigationBarStyles.icon}
              />
            )
          }
        </Pressable>

        <Pressable onPress={() => handlePress(Screens.PROFILE)} style={navigationBarStyles.iconContainer}>
          <View style={{ position: "relative" }}>
            {
              //check which icon will load
              selected == Screens.PROFILE ? (
                <Ionicons
                  name="person-circle-sharp"
                  style={navigationBarStyles.icon}
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  style={navigationBarStyles.icon}
                />
              )
            }
            {badgeCount > 0 && <Badge count={badgeCount} />}
          </View>
        </Pressable>
      </View>
    );
};

// The notification badge for drafts created that would later be displayed under profile-> my drafts
const Badge = ({ count }) => {
  return (
    <View style={navigationBarStyles.badgeContainer}>
      <Text style={navigationBarStyles.badgeText}>{count}</Text>
    </View>
  );
};

export default Navigationbar;
