import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

import profileCreatedStyles from "./profileCreatedStyles"
import MessageScreen from '../../templates/standardScreens/messageScreen';

import Screens from "../../utils/ScreenPaths";
import { useNavigation } from '@react-navigation/native';

const ProfileCreated = () => {
  const navigation = useNavigation();
  const opacityAnim = useRef(new Animated.Value(0)).current;  // opacity animation

  useEffect(() => {
    // Opacity animation for the checkmark
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // timer for navigation
    const timer = setTimeout(() => {
      navigation.navigate(Screens.HOME);  // Navigate to home page
    }, 1500);

    // Clean up timer
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <MessageScreen>
      <View style={profileCreatedStyles.centerContent}>
        
        <View style={profileCreatedStyles.animationContainer}>
          <Animated.Text style={{ opacity: opacityAnim, ...profileCreatedStyles.animatedText }}>
            ✓
          </Animated.Text>
        </View>

        <Text style={profileCreatedStyles.successText}>
          Profile Created Successfully!
        </Text>
      </View>
    </MessageScreen>
  );
}

export default ProfileCreated;
