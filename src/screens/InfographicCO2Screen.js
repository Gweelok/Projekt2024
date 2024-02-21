import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { styles, Backgroundstyle, Primarycolor1 } from "../styles/Stylesheet";
import GlobalStyle from "../styles/GlobalStyle";
import { useLanguage, t } from "../Languages/LanguageHandler";
import CloudSvg from "../componets/svg-components/Cloud";
import { Ionicons } from "@expo/vector-icons";

const InfographicCO2Screen = ({ navigation }) => {
 
  const [c02Saved, setc02Saved] = useState(0);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    getc02Saved();
  });

  async function getc02Saved() {
    // This function will be used to get the saved c02 from the database.
    // For now, we are using a dummy value.
    setc02Saved(10);
  }
    
  return (
    <View style={[Backgroundstyle.informationScreens, GlobalStyle.BodyWrapper]}>
      <View style={GlobalStyle.BodyWrapper}>
        <View style={infoGraphicC02Style.cancelIconContainer}>
          <TouchableOpacity>
            <Ionicons
              onPress={() => navigation.navigate("Homepage")}
              name="close-outline"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={infoGraphicC02Style.svgContainer}>
          <View>
            <CloudSvg mainText={"C0"} subText={"2"} />
          </View>
          <View style={infoGraphicC02Style.messageTextContainer}>
            <Text style={infoGraphicC02Style.messageText}>
              {/* Dummy Text for now. */}
              Product successfully taken. Thank you for saving {c02Saved} kg.
              C02.
              {/* The logic below will be used once the correct text implementation is done. */}
              {/* {t("C02Message.header", currentLanguage)} */}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InfographicCO2Screen;

const infoGraphicC02Style = StyleSheet.create({
  svgContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "35%",
  },
  cancelIconContainer: {
    position: "absolute",
    zIndex: 999,
    right: 0,
    backgroundColor: Primarycolor1,
  },
  messageTextContainer: {
    justifyContent: "center",
    marginTop: "25%",
    marginBottom: 50,
  },
  messageText: {
    color: Primarycolor1,
    fontSize: 22,
    textAlign: "center",
  },
});
