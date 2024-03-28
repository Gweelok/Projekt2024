import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import infoGraphicC02Style from "./infographicCO2Styles";
import InformationScreen from "../../templates/standardScreens/informationScreen";

import { useLanguage, t } from "../../languages/LanguageHandler";
import CloudSvg from "../../components/svg-components/Cloud";
import Icon from "react-native-vector-icons/AntDesign";
import { LoaderContext } from "../../contexts/LoaderContext/LoaderContext";
import Screens from "../../utils/ScreenPaths";
import { useNavigation } from "@react-navigation/native";

const InfographicCO2Screen = () => {
  const navigation = useNavigation();
  const { setIsLoading } = useContext(LoaderContext);
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
    <InformationScreen>
      <View>
        <View style={infoGraphicC02Style.closeContainer}>
          <TouchableOpacity
            style={infoGraphicC02Style.closeButton}
            onPress={() => navigation.navigate(Screens.HOME)}
          >
            <Icon name="close" style={infoGraphicC02Style.closeIcon} />
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
    </InformationScreen>
  );
};

export default InfographicCO2Screen;
