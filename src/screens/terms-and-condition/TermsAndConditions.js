import React from "react";
import { createUser } from "../../utils/Repo/Auth";
import { firebaseAurth } from "../../utils/Repo/Firebase";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";

import termsAndCondStyles from "./termsAndConditionStyles";
import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";

import Screens from "../../utils/ScreenPaths";
import { useNavigation } from "@react-navigation/native";

const TermsAndConditions = ( {route} ) => {
  const navigation = useNavigation();
  const { email, password } = route.params;

  const terms = [
    "You agree not to misuse the services.",
    "All content is copyrighted and owned us.",
    "Personal data shared will be protected.",
    "You agree not to misuse the services.",
    "Personal data shared will be protected.",
    "All content is copyrighted and owned us.",
    "You agree not to misuse the services.",
    "All content is copyrighted and owned us."
  ];

  const handleAccept = async () => {
    try {
      await createUser(email, password);

      if (firebaseAurth.currentUser !== null) {
        navigation.navigate(Screens.PROFILE_CREATED);
      } else {
        Alert.alert(
          'Error',
          'An error occurred while trying to authenticate the user. Please try to sign in later.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate(Screens.SIGN_IN);
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error('An error occurred:', error);

      const errorMessage = error.toString();
      Alert.alert(
        'Error',
        `An error occurred: ${errorMessage}`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
    }
  };

  const renderTerm = ({ item, index }) => (
    <Text style={termsAndCondStyles.renderTerm}>{index + 1}. {item}</Text>
  );

  return (

    <InteractiveScreen>

      <Text style={termsAndCondStyles.header}>
        Terms and Conditions
      </Text>

      <FlatList
        data={terms}
        renderItem={renderTerm}
        keyExtractor={(item, index) => index.toString()}
        style={termsAndCondStyles.termList} />
        
      <TouchableOpacity
        style={termsAndCondStyles.acceptButton}
        onPress={handleAccept}>
        <Text style={termsAndCondStyles.acceptButtonText}>Accept</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={termsAndCondStyles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={termsAndCondStyles.backButtonText}>Decline</Text>
      </TouchableOpacity>

    </InteractiveScreen>
  );
}

export default TermsAndConditions;