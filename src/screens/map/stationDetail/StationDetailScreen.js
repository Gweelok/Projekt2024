import React from 'react';
import Navigationbar from '../../../componets/Navigationbar';
import {StyleSheet, StatusBar, Image, View, Dimensions, Platform, Linking, ScrollView,SafeAreaView} from "react-native";
import BackButton from '../../../componets/BackButton';
import StationTitle from "./StationTitle";
import { Backgroundstyle } from "../../../styles/Stylesheet";
import PrimaryColorButton from "./PrimaryColorButton";
import WhiteColorButton from "./WhiteColorButton";
import GlobalStyle from "../../../styles/GlobalStyle";
import ScrollViewComponent from "../../../componets/atoms/ScrollViewComponent";
import { t, useLanguage } from "../../../Languages/LanguageHandler";
import Screens from "../../../utils/ScreenPaths";

const { width } = Dimensions.get('window');
const imageSize = width * 0.85;

const StationDetailScreen = ({ route, navigation }) => {
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
      <View style={Backgroundstyle.interactive_screens}>
        <ScrollViewComponent >
          <SafeAreaView  style={GlobalStyle.BodyWrapper} >
          <View >
            <BackButton onPress={navigation.goBack} />
          </View>
          <View style={styles.titleContainer}>
            <StationTitle
              title={stationDetail?.uptainerName}
              description={stationDetail?.uptainerStreet} //todo get title and description from backend
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../../assets/images/cph.jpg")} //todo get image from backend
              style={styles.image}
            />
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryColorButton
              onPress={() => {
                openStationDirectionPage();
              }}
              titleText={t("StationsScreen.showWay", currentLanguage)}
            />
          </View>
          <View style={styles.buttonContainer2}>
            <WhiteColorButton
              onPress={() => {
                /* todo */
                navigation.navigate(Screens.UPTAINER_DETAILS, {
                  uptainerData: {
                    id: stationDetail?.id,
                    name: stationDetail?.uptainerName,
                    location: stationDetail?.uptainerStreet,
                    // Add other properties if needed
                  },
                });
              }}
              titleText={t("StationsScreen.showProduct", currentLanguage)}
            />
          </View>
          </SafeAreaView>
        </ScrollViewComponent>
        <Navigationbar navigation={navigation} />
      </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    position: "absolute",
    left: 19,
  },
  titleContainer: {
    marginTop: StatusBar.currentHeight ,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
   // marginTop: 50,
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 25,
  },
  buttonContainer2: {
     alignItems: 'center',
    marginTop: 30,
  },
});

export default StationDetailScreen;

