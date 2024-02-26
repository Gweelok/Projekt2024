import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { styles, Backgroundstyle, Primarycolor1 } from "../styles/Stylesheet";
import GlobalStyle from "../styles/GlobalStyle";
import { useLanguage, t } from "../Languages/LanguageHandler";
import CloudSvg from "../componets/svg-components/Cloud";
import Icon from "react-native-vector-icons/AntDesign";
import { LoaderContext } from "../componets/LoaderContext";
import LoadingScreen from "../componets/LoadingScreen";
import Screens from "../utils/ScreenPaths";

const InfographicCO2Screen = ({ navigation }) => {
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [c02Saved, setc02Saved] = useState(0);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    getc02Saved();
  });

  async function getc02Saved() {
    setIsLoading(true);
    // This function will be used to get the saved c02 from the database.
    // For now, we are using a dummy value.
    setc02Saved(10);
    setIsLoading(false);
  }

  return (
    <View style={[GlobalStyle.BodyWrapper, Backgroundstyle.informationScreens]}>
      <View>
        {isLoading && <LoadingScreen isLoaderShow={isLoading} />}
        <View style={infoGraphicC02Style.cancelIconContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.navigate(Screens.HOME)}
          >
            <Icon size={30} name="close" style={styles.closeButtonIcon} />
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
    marginTop: "40%",
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
    fontFamily: "space-grotesk",
  },
});
