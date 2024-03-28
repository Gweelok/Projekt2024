import React from "react";
import { Image, View, Platform, Linking } from "react-native";

import BackButton from "../../components/BackButton/BackButton";
import StationTitle from "../../components/StationTitle/StationTitle";
import ScrollViewComponent from "../../components/ScrollViewComponent/ScrollViewComponent";
import PrimaryColorButton from "../../components/PrimaryColorButton/PrimaryColorButton";
import WhiteColorButton from "../../components/WhiteColorButton/WhiteColorButton";

import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";
import stationDetailsStyles from "./stationDetailStyles";

import { t, useLanguage } from "../../languages/LanguageHandler";
import Screens from "../../utils/ScreenPaths";
import { useNavigation } from "@react-navigation/native";

const StationDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { stationDetail } = route?.params;
  console.log("stationDetail", stationDetail);

  const { currentLanguage, setLanguage } = useLanguage();

  const openMap = async (latitude, longitude, label = "MyLabel") => {
    const browserUrl = `https://www.google.com/maps/dir/?api=1&origin=&destination=${latitude},${longitude}&travelmode=driving`;

    if (Platform.OS === "android") {
      // Android open google map first, in driving mode, if google map is not available, then open map in browser.
      return Linking.openURL(browserUrl);
    } else if (Platform.OS === "ios") {
      const url = `http://maps.apple.com/?daddr=${latitude},${longitude}`;
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          return Linking.openURL(browserUrl);
        }
      });
    }
  };

  const openStationDirectionPage = () => {
    openMap(
      stationDetail.latitude,
      stationDetail.longitude,
      stationDetail.name
    );
  };

  return (
    <InteractiveScreen>
      <ScrollViewComponent>
        <View style={stationDetailsStyles.headerContainer}>
          <BackButton onPress={navigation.goBack} />
          <View style={stationDetailsStyles.titleContainer}>
            <StationTitle
              title={stationDetail?.uptainerName}
              description={stationDetail?.uptainerStreet}
            />
          </View>
        </View>

        <View style={stationDetailsStyles.imageContainer}>
          <Image
            source={require("../../../assets/images/cph.jpg")} //todo get image from backend
            style={stationDetailsStyles.image}
          />
        </View>

        <View style={stationDetailsStyles.buttonContainer}>
          <PrimaryColorButton
            onPress={() => {
              openStationDirectionPage();
            }}
            titleText={t("StationsScreen.showWay", currentLanguage)}
          />
        </View>

        <View style={stationDetailsStyles.buttonContainer2}>
          <WhiteColorButton
            onPress={() => {
              /* todo */
              navigation.navigate(Screens.UPTAINER_DETAILS, {
                uptainer: stationDetail,
              });
            }}
            titleText={t("StationsScreen.showProduct", currentLanguage)}
          />
        </View>
      </ScrollViewComponent>

    </InteractiveScreen>
  );
};

export default StationDetailScreen;
