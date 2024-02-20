import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import BackButton from "../componets/BackButton";
import {
  Buttons,
  styles,
  Backgroundstyle,
  Primarycolor1,
  Primarycolor2,
  Primarycolor3,
} from "../styles/Stylesheet";
import GlobalStyle from "../styles/GlobalStyle";
import { useLanguage, t } from "../Languages/LanguageHandler";
import CloudSvg from "../componets/svg-components/CloudCO2";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const InfographicCO2Screen = ({ navigation }) => {
  const { currentLanguage } = useLanguage();
  return (
    <View style={[Backgroundstyle.informationScreens, GlobalStyle.BodyWrapper]}>
      <View>
        <View style={infoGraphicStyle.cancelIconContainer}>
          <TouchableOpacity>
            <Ionicons
              onPress={() => navigation.navigate("Homepage")}
              name="close-outline"
              size={30}
              color="white"
              style={infoGraphicStyle.cancelIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={infoGraphicStyle.svgContainer}>
          <View>
            <CloudSvg iconText="C02" textStyle={infoGraphicStyle.iconText} />
          </View>
          <View
            style={{
              justifyContent: "center",
              marginTop: 50,
              marginBottom: 50,
            }}
          >
            <Text
              style={infoGraphicStyle.messageText}
            >
              Product successfully taken.
              {/* {t("thankYouScreen.header", currentLanguage)} */}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InfographicCO2Screen;

const infoGraphicStyle = StyleSheet.create({
  svgContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
  cancelIcon: {
    // top: 20,
  },
  cancelIconContainer: {
    position: "absolute",
    zIndex: 999,
    right: 0,
    backgroundColor: Primarycolor1,
  },
  iconText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    zIndex: 100,
    position: "absolute",
  },
  messageText: {
    color: Primarycolor1,
    fontSize: 20,
    margin: 20,
    textAlign: "center",
  },
});
