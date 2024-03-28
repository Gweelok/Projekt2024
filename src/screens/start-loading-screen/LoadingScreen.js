import { ActivityIndicator, View } from "react-native";
import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Screens from "../../utils/ScreenPaths";

import loadingStyles from "./loadingScreenStyles";
import FullScreen from "../../templates/standardScreens/FullScreen";

const LoadingScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  
  //Conditionally navigate to Landing or Sign in screen based on if it is the first app start
  // Async storage uses local storage to count if this is the first ap start so landing screen only appears once
  useEffect(() => {
    async function checkFirstTime() {
      try {
        const isFirstTime = await AsyncStorage.getItem('isFirstTime9');
        console.log(isFirstTime);
        if (isFirstTime === null) {
          // It's the first time, show LandingScreen
          // Set isFirstTime to 'true' in AsyncStorage
          await AsyncStorage.setItem('isFirstTime9', 'true');
          setTimeout(() => {
            navigation.navigate(Screens.LANDING);
          }, 2000);
        } else {
          // Not the first time, navigate to Sign in
          setTimeout(() => {
            navigation.navigate(Screens.SIGN_IN);
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    checkFirstTime();
  }, []);
  
  return (
    <FullScreen>

       {loading && ( // Render ActivityIndicator only when loading state is true
        <View style={loadingStyles.indicatorContainer}>
          <ActivityIndicator size="large" color={loadingStyles.activityIndicator.color} />
        </View>
      )}
      
    </FullScreen>
  );
};

export default LoadingScreen;
