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
import { openAddressOnMap } from "../../utils/uptainersUtils";

const StationDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { stationDetail } = route?.params;
  console.log("stationDetail", stationDetail);

  const { currentLanguage, setLanguage } = useLanguage();

  const openStationDirectionPage = async() => {
    openAddressOnMap({
      lat: stationDetail.uptainerLatitude,
      long: stationDetail.uptainerLongitude,
      name: stationDetail.uptainerName
    })
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
