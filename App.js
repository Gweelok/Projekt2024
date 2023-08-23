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

// sqlite database
import { dropAll, createTestData, database } from "./src/utils/Database";

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
//import { seedCheck } from "./src/utils/FirebaseSeed"; //uncomment to seed data(only works if DB is empty)

import { seedCheck } from "./src/utils/Repo"; //seed data(only works if DB is empty)
console.log("start");
const Stack = createNativeStackNavigator();

// Main function that everything runs in
export default function App() {
  // hook that gets and sets test data for resting
  const [test, setTest] = useState(0);
  useEffect(() => {
    function showdata(data) {
      console.log(data);
    }
    database.getData(showdata, "Items");
    //dropAll();
    //createTestData();
  }, []);

  //FirebaseSeed data here:
  var doneTheStuff;
  if (!doneTheStuff) {
    doneTheStuff = true;
    seedCheck(); //seed data(only works if DB is empty)
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
    <LanguageProvider>
      <NavigationContainer theme={navStyle}>
        <Stack.Navigator initialRouteName="Landingscreen">
          <Stack.Screen
            name="Landingscreen"
            component={LandingScreen}
            options={{ animation: "none", headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ animation: "none", headerShown: false }}
          />
          <Stack.Screen
            name="Sign in"
            component={SignIn}
            options={{ animation: "none", headerShown: false }}
          />
          <Stack.Screen
            name="Homepage"
            component={Home}
            options={{ animation: "none", headerShown: false }}
          />
          <Stack.Screen name="DetailView" component={DetailView} />
          <Stack.Screen
            name="Infopage"
            component={ArticlePage}
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{ animation: "none", headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ animation: "none", headerShown: false }}
          />
          <Stack.Screen
            name="ContactUs"
            component={ContactUs}
            options={{ animation: "none" }}
          />
          <Stack.Screen
            name="DataPolicy"
            component={DataPolicy}
            options={{ animation: "none" }}
          />
          <Stack.Screen
            name="MyDrafts"
            component={MyDrafts}
            options={{ animation: "none" }}
          />
          <Stack.Screen
            name="MySettings"
            component={MySettings}
            options={{ animation: "none" }}
          />
          <Stack.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
            options={{ animation: "none" }}
          />
          <Stack.Screen
            name="ProfileCreated"
            component={ProfileCreated}
            options={{ animation: "none" }}
          />
          <Stack.Screen
            name="Stats"
            component={Stat}
            options={{ animation: "none", headerShown: false }}
          />
          <Stack.Screen
            name="Add"
            component={Add}
            options={{ animation: "none", headerShown: false }}
          />
          <Stack.Screen
            name="Products"
            component={ProductScreen}
            options={{ title: "Products", animation: "none" }}
          />

          <Stack.Screen
            name="Pro"
            component={ProScreen}
            options={{ title: "Products", animation: "none" }}
          />
          <Stack.Screen
            name="Bnd"
            component={BndScreen}
            options={{ title: "Brands", animation: "none" }}
          />
          <Stack.Screen
            name="Mod"
            component={ModScreen}
            options={{ title: "Models", animation: "none" }}
          />
          <Stack.Screen name="Stations" component={StationsScreen} />
          <Stack.Screen
            name="StationDetails"
            component={StationDetailScreen}
            options={{ headerShown: false }} // hides the header
          />
          <Stack.Screen
            name="Thanks"
            component={ThanksScreen}
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="LogoutConfirmation"
            component={LogoutConfirmation}
            options={{ animation: "none" }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{ headerShown: true, animation: "none" }}
          />
          <Stack.Screen
            name="UptainerDetails"
            component={UptainerDetails}
            options={{ headerShown: true, animation: "none" }}
          />

          <Stack.Screen
            name="LogoutConfirmation"
            component={LogoutConfirmation}
            options={{ animation: "none" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 23 }}>Thank You</Text>
        <Text style={{ fontSize: 15 }}>
          You have registered an item on Station: {estId}
        </Text>
      </SafeAreaView>
    );
  }
}
