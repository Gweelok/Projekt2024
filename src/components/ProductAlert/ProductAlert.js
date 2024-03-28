import { Text, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { t, useLanguage } from "../../languages/LanguageHandler";
import productAlertStyles from "./productAlertStyles";

const ProductAlert = ({isAlerted,setisAlerted}) => {
  const { currentLanguage } = useLanguage();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = () => {
      return setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 1000);
    };

    const fadeOut = () => {
      return setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 3000);
    };

    if(!isAlerted){
      setisAlerted(true)
      fadeIn();
      fadeOut();
    }


    return () => {
      clearTimeout(fadeIn);
      clearTimeout(fadeOut);
    };
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[productAlertStyles.alertContainer, { opacity: fadeAnim }]}
    >
      <Text style={productAlertStyles.alertText}>
        {t("ProductUpdroppedAlert.productUpdropped", currentLanguage)}
      </Text>
    </Animated.View>
  );
};

export default ProductAlert;
