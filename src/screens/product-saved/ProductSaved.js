import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import productSavedStyles from "./productSavedStyles";
import FullScreen from "../../templates/standardScreens/FullScreen";

import { Pressable } from "react-native";
import { t, useLanguage } from "../../languages/LanguageHandler";
import { Animated } from "react-native";
import Screens from "../../utils/ScreenPaths";
import { useNavigation } from "@react-navigation/native";

const ProductSaved = () => {
  const navigation = useNavigation();
  const { currentLanguage, setLanguage } = useLanguage();
  const opacityAnim = useRef(new Animated.Value(0)).current; // opacity animation

  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Opacity animation for the checkmark
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // timer for navigation
    setTimeout(() => {
      setShowButtons(true);
    }, 1500);
  }, []);

  return (
    <FullScreen>
      <View style={productSavedStyles.savedContainer}>
        <View style={productSavedStyles.animatedView}>
          <Animated.Text
            style={[productSavedStyles.animatedText, { opacity: opacityAnim }]}
          >
            ✓
          </Animated.Text>
        </View>

        <Text style={productSavedStyles.addedText}>
          {" "}
          {t("UpdroppForm.draftSavedtext", currentLanguage)}{" "}
        </Text>

        {showButtons && (
          <View>
            <Pressable
              style={productSavedStyles.viewButton}
              onPress={() => {
                navigation.replace(Screens.MAP);
              }}
            >
              <Text style={productSavedStyles.buttonText}>
                {" "}
                {t("UpdroppForm.viewUptainers", currentLanguage)}{" "}
              </Text>
            </Pressable>

            <Pressable
              style={productSavedStyles.addDraftButton}
              onPress={() => {
                navigation.replace(Screens.ADD);
              }}
            >
              <Text style={productSavedStyles.buttonText}>
                {" "}
                {t("UpdroppForm.addDraft", currentLanguage)}{" "}
              </Text>
            </Pressable>
          </View>
        )}
      </View>

    </FullScreen>
  );
};

export default ProductSaved;
