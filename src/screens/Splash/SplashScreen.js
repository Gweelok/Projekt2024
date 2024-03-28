import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Image } from "react-native";

import splashStyles from "./splashStyles"
import FullScreen from "../../templates/standardScreens/FullScreen";

import { useNavigation } from "@react-navigation/native";
import Screens from "../../utils/ScreenPaths";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => navigation.navigate(Screens.LOADING), 2000);
  }, []);

  return (
    <FullScreen>
      <View style={splashStyles.imgContainer}>
        <Image
          resizeMode="center"
          source={require("../../../assets/images/updropp.png")}
          style={splashStyles.img}
        />
      </View>
    </FullScreen>
  );
};

export default SplashScreen;

