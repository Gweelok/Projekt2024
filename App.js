/**
 *  MAIN FILE
 * 	Where navigation between the different views happen
 * **/
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import from files
import { navStyle } from "./src/styles/Stylesheet";
import { useFonts } from "expo-font";

//importing pages for navigation
//Init screens
import SplashScreen from "./src/screens/Splash/SplashScreen";
import LoadingScreen from "./src/screens/start-loading-screen/LoadingScreen";

//Sign in & Sign up
import SignUpScreen from "./src/screens/sign-up/SignUpScreen";
import SignIn from "./src/screens/sign-in/SignIn";

import Home from "./src/screens/home/Home";

//Map
import Map from "./src/screens/map/Map";
import StationDetailScreen from "./src/screens/station-details/StationDetailScreen";

//Profilepages
import Profile from "./src/screens/profile/Profile";
import ContactUs from "./src/screens/contact-us/ContactUs";
import DataPolicy from "./src/screens/data-policy/DataPolicy";
import LogoutConfirmation from "./src/screens/logout-confirmation/LogoutConfirmation";
import MyDrafts from "./src/screens/my-drafts/MyDrafts";
import MySettings from "./src/screens/my-settings/MySettings";
import AccountSettings from "./src/screens/account-settings/AccountSettings";
import Notifications from "./src/screens/notifications/Notifications";
import DeleteAccount from "./src/screens/delete-account/deleteAccount";
import ChangePassword from "./src/screens/change-password/ChangePassword";

import Add from "./src/screens/add/Add";
import Stat from "./src/screens/stat/Stat";
import DetailView from "./src/screens/detail-view/DetailView";
import TermsAndConditions from "./src/screens/terms-and-condition/TermsAndConditions";
import ProfileCreated from "./src/screens/profile-created/ProfileCreated";
import LandingScreen from "./src/screens/landing-screen/LandingScreen";

import ArticlePage from "./src/screens/article-page/ArticlePage";
import UptainerDetails from "./src/screens/uptainer-details/UptainerDetails";

import TakeQRScanner from "./src/screens/take-qr/TakeQRScanner";
import AddQRScanner from "./src/screens/add-qr/AddQRScanner";
import ProductSaved from "./src/screens/product-saved/ProductSaved";

import ProductIsTakenScreen from "./src/screens/product-is-taken/ProductIsTakenScreen";
import ThankYouscreen from "./src/screens/thank-you/Thankyouscreen";

import ForgotPassword from "./src/screens/forgot-password/ForgotPassword";
import InfographicCO2Screen from "./src/screens/infographic-co2/InfographicCO2Screen";

//Providers/Contexts
import { BadgeContext } from "./src/contexts/BadgeContext/BadgeContext";
import { LanguageProvider } from "./src/languages/LanguageHandler";
import { LoaderProvider } from "./src/contexts/LoaderContext/LoaderContext";

//Utils
import Screens from "./src/utils/ScreenPaths";
import visibleNavbarScreens from "./src/utils/navbarScreenList";
import { firebaseAurth } from "./src/utils/Repo/Firebase";
import Navigationbar from "./src/components/NavigationBar/Navigationbar";

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
  const [currentRoute, setCurrentRoute] = React.useState(Screens.HOME);

  // Handle user state changes
  function onAuthState(user) {
    setUser(user);
    if (user) {
      setIsActive(true);
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebaseAurth.onAuthStateChanged(onAuthState);
    return subscriber; // Unsubscribe on unmount
  }, []);

  //_____________________________________________________________

  if (!fontsLoaded || initializing || visibleNavbarScreens.length === 0) {
    // Font is not yet loaded, return null or a loading screen
    return null;
  }



  // Main navigation of all the views
  return (
    <LanguageProvider>
      <LoaderProvider>
        <BadgeContext.Provider value={{ badgeCount, setBadgeCount }}>
          <NavigationContainer theme={navStyle}
            onStateChange={(state) => {
              const routeName = state.routes[state.index].name;
              setCurrentRoute(routeName);
            }}
          >
            {user ? (
              <Stack.Navigator
                initialRouteName={Screens.HOME}
                screenOptions={{
                  headerShown: false,
                  animation: "none",
                  gestureEnabled: false,
                }}
              >
                <Stack.Screen name={Screens.HOME} component={Home} />
                <Stack.Screen name={Screens.DETAIL_VIEW} component={DetailView} />
                <Stack.Screen name={Screens.ARTICLE_PAGE} component={ArticlePage} />
                <Stack.Screen name={Screens.MAP} component={Map} />
                <Stack.Screen name={Screens.PROFILE} component={Profile} />
                <Stack.Screen name={Screens.CONTACT_US} component={ContactUs} />
                <Stack.Screen name={Screens.DATA_POLICY} component={DataPolicy} />
                <Stack.Screen name={Screens.MY_DRAFTS} component={MyDrafts} />
                <Stack.Screen name={Screens.MY_SETTINGS} component={MySettings} />
                <Stack.Screen name={Screens.CHANGE_PASSWORD} component={ChangePassword} />
                <Stack.Screen name={Screens.DELETE_ACCOUNT} component={DeleteAccount} />
                <Stack.Screen name={Screens.ACCOUNT_SETTINGS} component={AccountSettings} />
                <Stack.Screen name={Screens.NOTIFICATIONS} component={Notifications} />
                <Stack.Screen name={Screens.STATS} component={Stat} />
                <Stack.Screen name={Screens.ADD} component={Add} />
                <Stack.Screen name={Screens.TAKE_QR_SCANNER} component={TakeQRScanner} />
                <Stack.Screen name={Screens.ADD_QR_SCANNER} component={AddQRScanner} />
                <Stack.Screen name={Screens.STATION_DETAILS} component={StationDetailScreen} />
                <Stack.Screen name={Screens.LOGOUT_CONFIRMATION} component={LogoutConfirmation} />
                <Stack.Screen name={Screens.UPTAINER_DETAILS} component={UptainerDetails} />
                <Stack.Screen name={Screens.PRODUCT_SAVED} component={ProductSaved} />
                <Stack.Screen name={Screens.PRODUCT_IS_TAKEN} component={ProductIsTakenScreen} />
                <Stack.Screen name={Screens.THANK_YOU} component={ThankYouscreen} />
                <Stack.Screen name={Screens.INFO_GRAPHIC_CO2} component={InfographicCO2Screen} />
              </Stack.Navigator>
            ) : isActive && !user ? (
              <Stack.Navigator
                initialRouteName={Screens.SIGN_IN}
                screenOptions={{
                  headerShown: false,
                  animation: "none",
                  gestureEnabled: false,
                }}
              >
                <Stack.Screen name={Screens.SIGN_IN} component={SignIn} />
                <Stack.Screen name={Screens.SIGN_UP} component={SignUpScreen} />
                <Stack.Screen name={Screens.TERMS_AND_CONDITIONS} component={TermsAndConditions} />
                <Stack.Screen name={Screens.PROFILE_CREATED} component={ProfileCreated} />
                <Stack.Screen name={Screens.FORGOT_PASSWORD} component={ForgotPassword} />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator
                initialRouteName={Screens.SPLASH}
                screenOptions={{
                  headerShown: false,
                  animation: "none",
                  gestureEnabled: false,
                }}
              >
                <Stack.Screen name={Screens.SPLASH} component={SplashScreen} />
                <Stack.Screen name={Screens.LOADING} component={LoadingScreen} />
                <Stack.Screen name={Screens.LANDING} component={LandingScreen} />
                <Stack.Screen name={Screens.SIGN_UP} component={SignUpScreen} />
                <Stack.Screen name={Screens.SIGN_IN} component={SignIn} />
                <Stack.Screen name={Screens.TERMS_AND_CONDITIONS} component={TermsAndConditions} />
                <Stack.Screen name={Screens.PROFILE_CREATED} component={ProfileCreated} />
                <Stack.Screen name={Screens.FORGOT_PASSWORD} component={ForgotPassword} />
              </Stack.Navigator>
            )}
            {/*Displays bottom navbar if user and screen is in list. Sends currentRoute to navbar*/}
            {user && <Navigationbar currentRoute={currentRoute}></Navigationbar>}
          </NavigationContainer>

        </BadgeContext.Provider>
      </LoaderProvider>
    </LanguageProvider>
  );
}