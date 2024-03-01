import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { Primarycolor1, Primarycolor4 } from "../styles/Stylesheet";
import { t, useLanguage } from "../Languages/LanguageHandler";

const ProductAlert = () => {
  const { currentLanguage } = useLanguage();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    const fadeOut = () => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 3000)
    }

    fadeIn();

    fadeOut();

    return () => clearTimeout(fadeOut);
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.alertContainer, { opacity: fadeAnim }]}>
      <Text style={styles.alertText}>
        {t("ProductUpdroppedAlert.productUpdropped", currentLanguage)}
      </Text>
    </Animated.View>
  );
};

export default ProductAlert;

const styles = StyleSheet.create({
  alertContainer: {
    position: "absolute",
    bottom: 60,
    right: 0,
    left: 0,
    height: 40,
    backgroundColor: Primarycolor1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  alertText: {
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});
