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
import { Text } from "react-native-elements";

// import from files
import { navStyle } from "./src/styles/Stylesheet";
import { ChooseStation } from "./src/componets/molocules/stationOptions";
import { ChooseProducts, ChooseModels, ChooseBrands, } from "./src/componets/molocules/registerOptions";
import { ProductScreen } from "./src/screens/productScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { useFonts } from "expo-font";
//importing pages for navigation
import Home from "./src/screens/Home";
import Map from "./src/screens/map/Map";
import Profile from "./src/screens/Profile";
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
import { LanguageProvider, } from "./src/Languages/LanguageHandler";
import StationDetailScreen from "./src/screens/map/stationDetail/StationDetailScreen";
import SignIn from "./src/screens/SignIn";
import ArticlePage from "./src/screens/article/ArticlePage";
import UptainerDetails from "./src/screens/UptainerDetails";
import AccountSettings from "./src/screens/ProfileSetings/AccountSettings";
import Notifications from "./src/screens/ProfileSetings/Notifications";

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
import YourStats from "./src/screens/YourStats";
import StatsInfo from "./src/componets/atoms/Stats/StatsInfo"; // COMPONENT!!!!!!!!! <--------------------
import VisitedUptainerStat from "./src/componets/atoms/Stats/VisitedUptainerStat";
import InfographicCO2Screen from "./src/screens/InfographicCO2Screen";

import Screens from "./src/utils/ScreenPaths";
import { firebaseAurth } from "./src/utils/Firebase";

console.log("Init App");
const Stack = createNativeStackNavigator();

// Main function that everything runs in
export default function App() {

  //______ Code for handling auto-sign in ______________________
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);
  const [fontsLoaded] = useFonts({
    "space-grotesk": require("./assets/fonts/SpaceGrotesk-Regular.ttf"),
    "space-grotesk-bold": require("./assets/fonts/SpaceGrotesk-Bold.ttf"),
    "space-grotesk-Medium": require("./assets/fonts/SpaceGrotesk-Medium.ttf"),
  });

  // Handle user state changes
  function onAuthState(user) {
    setUser(user);
    if (user) { setIsActive(true) }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebaseAurth.onAuthStateChanged(onAuthState);
    return subscriber; // Unsubscribe on unmount
  }, []);

  //_____________________________________________________________

  if (!fontsLoaded || initializing) {
    // Font is not yet loaded, return null or a loading screen
    return null;
  }

  // Main navigation of all the views
  return (
    <LanguageProvider>
      <LoaderProvider>
        <BadgeContext.Provider value={{ badgeCount, setBadgeCount }}>
          <NavigationContainer theme={navStyle}>

            {user ? (
              <Stack.Navigator
                initialRouteName={Screens.HOME}
                screenOptions={{
                  headerShown: false,
                  animation: "none",
                  gestureEnabled: false,
                }}
              >
                <Stack.Screen
                  name={Screens.HOME}
                  component={Home}
                />

                <Stack.Screen
                  name={Screens.DETAIL_VIEW}
                  options={{ animation: "none", headerShown: false, }}
                  component={DetailView}
                />

                <Stack.Screen
                  name={Screens.ARTICLE_PAGE}
                  component={ArticlePage}
                />
                <Stack.Screen
                  name={Screens.MAP}
                  component={Map}
                />
                <Stack.Screen
                  name={Screens.PROFILE}
                  component={Profile}
                />
                <Stack.Screen
                  name={Screens.CONTACT_US}
                  component={ContactUs}
                />

                <Stack.Screen
                  name={Screens.DATA_POLICY}
                  component={DataPolicy}
                />
                <Stack.Screen
                  name={Screens.MY_DRAFTS}
                  component={MyDrafts}
                />
                <Stack.Screen
                  name={Screens.MY_SETTINGS}
                  component={MySettings}
                />

                <Stack.Screen
                  name={Screens.CHANGE_PASSWORD}
                  component={ChangePassword}
                />

                <Stack.Screen
                  name={Screens.DELETE_ACCOUNT}
                  component={DeleteAccount}
                />

                <Stack.Screen
                  name={Screens.ACCOUNT_SETTINGS}
                  component={AccountSettings}
                />
                <Stack.Screen
                  name={Screens.NOTIFICATIONS}
                  component={Notifications}
                />
                <Stack.Screen
                  name={Screens.TERMS_AND_CONDITIONS}
                  component={TermsAndConditions}
                />

                <Stack.Screen
                  name={Screens.PROFILE_CREATED}
                  component={ProfileCreated}
                />
                <Stack.Screen
                  name={Screens.STATS_INFO}
                  component={StatsInfo}
                />
                <Stack.Screen
                  name={Screens.VISITED_UPTAINER_STAT}
                  component={VisitedUptainerStat}
                />
                <Stack.Screen
                  name={Screens.STATS}
                  component={Stat}
                />
                <Stack.Screen
                  name={Screens.YOUR_STATS}
                  component={YourStats}
                />
                <Stack.Screen
                  name={Screens.ADD}
                  component={Add}
                />
                <Stack.Screen
                  name={Screens.TAKE_QR_SCANNER}
                  component={TakeQRScanner}
                />
                <Stack.Screen
                  name={Screens.ADD_QR_SCANNER}
                  component={AddQRScanner}
                />
                <Stack.Screen
                  name={Screens.PRODUCTS}
                  component={ProductScreen}
                />

                <Stack.Screen
                  name={Screens.PRO}
                  component={ProScreen}
                />
                <Stack.Screen
                  name={Screens.BND}
                  component={BndScreen}
                />
                <Stack.Screen
                  name={Screens.MOD}
                  component={ModScreen}
                />
                <Stack.Screen
                  name={Screens.STATIONS}
                  component={StationsScreen}
                />
                <Stack.Screen
                  name={Screens.STATION_DETAILS}
                  component={StationDetailScreen}
                />
                <Stack.Screen
                  name={Screens.THANKS}
                  component={ThanksScreen}
                />
                <Stack.Screen
                  name={Screens.LOGOUT_CONFIRMATION}
                  component={LogoutConfirmation}
                />
                <Stack.Screen
                  name={Screens.PRIVACY_POLICY}
                  component={PrivacyPolicy}
                />
                <Stack.Screen
                  name={Screens.UPTAINER_DETAILS}
                  component={UptainerDetails}
                />
                <Stack.Screen
                  name={Screens.PRODUCT_SAVED}
                  component={ProductSaved}
                />
                <Stack.Screen
                  name={Screens.PRODUCT_IS_TAKEN}
                  component={ProductIsTakenScreen}
                />

                <Stack.Screen
                  name={Screens.PRODUCT_TAKEN}
                  component={ProductTaken}
                />
                <Stack.Screen
                  name={Screens.THANK_YOU}
                  component={ThankYouscreen}
                />
                <Stack.Screen
                  name={Screens.CAMERA}
                  component={CameraScreen}
                />
                <Stack.Screen
                  name={Screens.FORGOT_PASSWORD}
                  component={ForgotPassword}
                />

                <Stack.Screen
                  name={Screens.INFO_GRAPHIC_CO2}
                  component={InfographicCO2Screen}
                />

              </Stack.Navigator>) : isActive && !user ? (
                <Stack.Navigator
                  initialRouteName={Screens.SIGN_IN}
                  screenOptions={{
                    headerShown: false,
                    animation: "none",
                    gestureEnabled: false,
                  }}
                >
                  <Stack.Screen
                    name={Screens.SIGN_IN}
                    component={SignIn}
                  />
                  <Stack.Screen
                    name={Screens.SIGN_UP}
                    component={SignUpScreen}
                  />

                  <Stack.Screen
                    name={Screens.TERMS_AND_CONDITIONS}
                    component={TermsAndConditions}
                  />

                </Stack.Navigator>) : (
              <Stack.Navigator
                initialRouteName={Screens.SPLASH}
                screenOptions={{
                  headerShown: false,
                  animation: "none",
                  gestureEnabled: false,
                }}
              >
                <Stack.Screen
                  name={Screens.SPLASH}
                  component={SplashScreen}
                />
                <Stack.Screen
                  name={Screens.LOADING}
                  component={LoadingScreen}
                />
                <Stack.Screen
                  name={Screens.LANDING}
                  component={LandingScreen}
                />
                <Stack.Screen
                  name={Screens.SIGN_UP}
                  component={SignUpScreen}
                />
                <Stack.Screen
                  name={Screens.SIGN_IN}
                  component={SignIn}
                />

                <Stack.Screen
                  name={Screens.TERMS_AND_CONDITIONS}
                  component={TermsAndConditions}
                />

              </Stack.Navigator>)}

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
