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
import SignUpScreen from "./src/screens/SignUpScreen"
import { View } from "react-native-ui-lib";
import { useFonts } from 'expo-font';
//importing pages for navigation 
import Home from "./src/screens/Home";
import Map from "./src/screens/Map";
import Profile from "./src/screens/Profile";
import Add from "./src/screens/Add";
import Stat from "./src/screens/Stat";



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

  //Loading the font 
  const [fontsLoaded] = useFonts({
    'space-grotesk': require('./assets/fonts/SpaceGrotesk-Regular.ttf'),
    'space-grotesk-bold': require('./assets/fonts/SpaceGrotesk-Bold.ttf'),

  });

  if (!fontsLoaded) {
    // Font is not yet loaded, return null or a loading screen
    return null;
  }
  // Main navigation of all the views
  return (
    <NavigationContainer theme={navStyle}>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Homepage"
          component={Home}
        />
        <Stack.Screen
          name="Map"
          component={Map}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          name="Stats"
          component={Stat}
        />
        <Stack.Screen
          name="Add"
          component={Add}
        />
        <Stack.Screen
          name="Products"
          component={ProductScreen}
          options={{ title: "Products" }}
        />
        
        <Stack.Screen
          name="Pro"
          component={ProScreen}
          options={{ title: "Products" }}
        />
        <Stack.Screen
          name="Bnd"
          component={BndScreen}
          options={{ title: "Brands" }}
        />
        <Stack.Screen
          name="Mod"
          component={ModScreen}
          options={{ title: "Models" }}
        />
        <Stack.Screen name="Stations" component={StationsScreen} />
        <Stack.Screen
          name="Thanks"
          component={ThanksScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
