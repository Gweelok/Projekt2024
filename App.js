/**
 *  MAIN FILE
 * 	Where navigation between the different views happen
 *  There's also a temporary button that inports testdata,
 * 	just in case you need to restart database
 *
 *  not implemented but wished i did: redux, or any other way to store values between screens
 * **/

import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// base style import
import { Text, Button } from "react-native-elements";

// import from files
import {
  navStyle,
  elementsStyles,
  marginBottom,
} from "./src/styles/Stylesheet";
import { ChooseStation } from "./src/componets/molocules/stationOptions";
import {
  ChooseCatagories,
  ChooseProducts,
  ChooseModels,
  ChooseBrands,
} from "./src/componets/molocules/registerOptions";
import { DashboardScreen } from "./src/screens/dashboardScreen";
import { ProductScreen } from "./src/screens/productScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { View } from "react-native-ui-lib";
import { useFonts } from "expo-font";
//importing pages for navigation
import Home from "./src/screens/Home";
import Map from "./src/screens/map/Map";
import Profile from "./src/screens/Profile";
import ProfilePage from "./src/screens/profilePages/ProfilePage";
import ContactUs from "./src/screens/profilePages/ContactUs";
import DataPolicy from "./src/screens/profilePages/DataPolicy";
import LogoutConfirmation from "./src/screens/profilePages/LogoutConfirmation";
import MyDrafts from "./src/screens/profilePages/MyDrafts";
import MySettings from "./src/screens/profilePages/MySettings";
import Add from "./src/screens/Add";
import Stat from "./src/screens/Stat";
import DetailView from "./src/screens/DetailView";
import TermsAndConditions from "./src/screens/TermsAndConditions";
import ProfileCreated from "./src/screens/ProfileCreated";
import LandingScreen from "./src/screens/LandingScreen";
import {
  useLanguage,
  LanguageProvider,
  t,
} from "./src/Languages/LanguageHandler";
import StationDetailScreen from "./src/screens/map/stationDetail/StationDetailScreen";
import Info from "./src/screens/Info";
import SignIn from "./src/screens/SignIn";
import ArticlePage from "./src/screens/article/ArticlePage";
import UptainerDetails from "./src/screens/UptainerDetails";
import AccountSettings from "./src/screens/ProfileSetings/AccountSettings";
import Notifications from "./src/screens/ProfileSetings/Notifications";

import { seedCheck } from "./src/utils/Repo"; //seed data(only works if DB is empty)
import TakeQRScanner from "./src/screens/form/TakeQRScanner";
import AddQRScanner from "./src/screens/form/AddQRScanner";
import PrivacyPolicy from "./src/screens/profilePages/DataPolicy";
import ProductSaved from "./src/screens/form/ProductSaved";

import { BadgeContext } from "./src/screens/form/BadgeContext";

import DeleteAccount from "./src/screens/ProfileSetings/deleteAccount";

import ProductIsTakenScreen from "./src/screens/ProductIsTakenScreen";
import ProductTaken from "./src/screens/form/ProductTaken";
import ThankYouscreen from "./src/screens/Thankyouscreen";
import ChangePassword from "./src/screens/ProfileSetings/ChangePassword";

import { LoaderProvider } from "./src/componets/LoaderContext";
import CameraScreen from "./src/screens/form/CameraScreen";
import ForgotPassword from "./src/screens/ForgotPassword";
import SplashScreen from "./src/screens/Splash/SplashScreen";
import LoadingScreen from "./src/screens/Splash/LoadingScreen";
//import ProductDropdown from "./src/screens/form/ProductDropdown";
import YourStats from "./src/screens/YourStats";
import StatsInfo from "./src/componets/atoms/Stats/StatsInfo";
import VisitedUptainerStat from "./src/componets/atoms/Stats/VisitedUptainerStat";

import {Screens} from "./src/utils/ScreenPaths";

console.log("start");
const Stack = createNativeStackNavigator();

// Main function that everything runs in
export default function App() {
  // The notification badge for drafts
  const [badgeCount, setBadgeCount] = useState(0);
  // hook that gets and sets test data for resting

  //FirebaseSeed data here:
  var doneTheStuff;
  if (!doneTheStuff) {
    doneTheStuff = true;
    //seedCheck(); //seed data(only works if DB is empty)
  }

  //Loading the font
  const [fontsLoaded] = useFonts({
    "space-grotesk": require("./assets/fonts/SpaceGrotesk-Regular.ttf"),
    "space-grotesk-bold": require("./assets/fonts/SpaceGrotesk-Bold.ttf"),
    "space-grotesk-Medium": require("./assets/fonts/SpaceGrotesk-Medium.ttf"),
  });

  if (!fontsLoaded) {
    // Font is not yet loaded, return null or a loading screen
    return null;
  }
  // Main navigation of all the views
  return (
    //
      <LanguageProvider>
    <LoaderProvider>
      <BadgeContext.Provider value={{ badgeCount, setBadgeCount }}>
          <NavigationContainer theme={navStyle}>
            <Stack.Navigator
                initialRouteName={Screens.SplashScreen}
                screenOptions={{
                  headerShown: false, // This hides the header
                  animation: "none",
                  gestureEnabled: false,
                }}
            >
              <Stack.Screen
                name={Screens.SplashScreen}
                component={SplashScreen}
              />
              <Stack.Screen
                name={Screens.LoadingScreen}
                component={LoadingScreen}
              />
              <Stack.Screen
                name={Screens.LandingScreen}
                component={LandingScreen}
              />
              <Stack.Screen
                name={Screens.SignUpScreen}
                component={SignUpScreen}
              />
              <Stack.Screen
                name={Screens.SignIn}
                component={SignIn}
              />
              <Stack.Screen
                name={Screens.Home}
                component={Home}
              />

              <Stack.Screen 
              name={Screens.DetailView}
              options={{ animation: "none", headerShown: false,  }}
              component={DetailView} />

              <Stack.Screen
                name={Screens.ArticlePage}
                component={ArticlePage}
              />
              <Stack.Screen
                name={Screens.Map}
                component={Map}
              />
              <Stack.Screen
                name={Screens.Profile}
                component={Profile}
              />
              <Stack.Screen
                name={Screens.ContactUs}
                component={ContactUs}
              />

              <Stack.Screen
                name={Screens.DataPolicy}
                component={DataPolicy}
              />
              <Stack.Screen
                name={Screens.MyDrafts}
                component={MyDrafts}
              />
              <Stack.Screen
                name={Screens.MySettings}
                component={MySettings}
              />

              <Stack.Screen
                name={Screens.ChangePassword}
                component={ChangePassword}
              />

              <Stack.Screen
                name={Screens.DeleteAccount}
                component={DeleteAccount}
              />

              <Stack.Screen
                name={Screens.AccountSettings}
                component={AccountSettings}
              />
              <Stack.Screen
                name={Screens.Notifications}
                component={Notifications}
              />
              <Stack.Screen
                name={Screens.TermsAndConditions}
                component={TermsAndConditions}
              />
              <Stack.Screen
                name={Screens.ProfileCreated}
                component={ProfileCreated}
              />
              <Stack.Screen
                  name={Screens.StatsInfo}
                  component={StatsInfo}
              />
              <Stack.Screen
                  name={Screens.VisitedUptainerStat}
                  component={VisitedUptainerStat}
              />
              <Stack.Screen
                name={Screens.Stat}
                component={Stat}
              />
              <Stack.Screen
                  name={Screens.YourStats}
                  component={YourStats}
              />
              <Stack.Screen
                name={Screens.Add}
                component={Add}
              />
              <Stack.Screen
                name={Screens.TakeQRScanner}
                component={TakeQRScanner}
              />
              <Stack.Screen
                name={Screens.AddQRScanner}
                component={AddQRScanner}
              />
              <Stack.Screen
                name={Screens.ProductScreen}
                component={ProductScreen}
              />

              <Stack.Screen
                name={Screens.ProScreen}
                component={ProScreen}
              />
              <Stack.Screen
                name={Screens.BndScreen}
                component={BndScreen}
              />
              <Stack.Screen
                name={Screens.ModScreen}
                component={ModScreen}
              />
              <Stack.Screen
                  name={Screens.StationsScreen}
                  component={StationsScreen} />
              <Stack.Screen
                name={Screens.StationDetailScreen}
                component={StationDetailScreen}
              />
              <Stack.Screen
                name={Screens.ThanksScreen}
                component={ThanksScreen}
              />
              <Stack.Screen
                name={Screens.LogoutConfirmation}
                component={LogoutConfirmation}
              />
              <Stack.Screen
                name={Screens.PrivacyPolicy}
                component={PrivacyPolicy}
              />
              <Stack.Screen
                name={Screens.UptainerDetails}
                component={UptainerDetails}
              />
              <Stack.Screen
                name={Screens.ProductSaved}
                component={ProductSaved}
              />
              <Stack.Screen
                name={Screens.ProductIsTakenScreen}
                component={ProductIsTakenScreen}
              />
              <Stack.Screen
                name={Screens.ProductTaken}
                component={ProductTaken}
              />
              <Stack.Screen
                name={Screens.ThankYouscreen}
                component={ThankYouscreen}
              />
              <Stack.Screen
                name={Screens.CameraScreen}
                component={CameraScreen}
              />
              <Stack.Screen
                name={Screens.ForgotPassword}
                component={ForgotPassword}
              />
            </Stack.Navigator>
          </NavigationContainer>

      </BadgeContext.Provider>
    </LoaderProvider>
      </LanguageProvider>
  );
  //Screens

  // eslint-disable-next-line react/prop-types
  function StationsScreen({ navigation, route }) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <ChooseStation navigation={navigation} route={route} />
      </SafeAreaView>
    );
  }

  function ProScreen({ navigation, route }) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ChooseProducts route={route} navigation={navigation} />
      </SafeAreaView>
    );
  }

  function BndScreen({ navigation, route }) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ChooseBrands route={route} navigation={navigation} />
      </SafeAreaView>
    );
  }

  function ModScreen({ navigation, route }) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ChooseModels route={route} navigation={navigation} />
      </SafeAreaView>
    );
  }

  function ThanksScreen({ navigation, route }) {
    const { estId } = route.params;
    console.log("route.params ", route.params);
    setTimeout(() => navigation.navigate("Home"), 3000);
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 23 }}>Thank You</Text>
        <Text style={{ fontSize: 15 }}>
          You have registered an item on Station: {estId}
        </Text>
      </SafeAreaView>
    );
  }
}
