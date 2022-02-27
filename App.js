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
import { LandingPage } from "./src/componets/atoms/landingPage";
import { RegisterItem } from "./src/componets/atoms/registerItem";
import {
  ChooseCatagories,
  ChooseProducts,
  ChooseModels,
  ChooseBrands,
} from "./src/componets/molocules/registerOptions";
import { DashboardScreen } from "./src/screens/dashboardScreen";
import { ProductScreen } from "./src/screens/productScreen";
import { View } from "react-native-ui-lib";

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

  // Main navigation of all the views
  return (
    <NavigationContainer theme={navStyle}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={LandingScreen}
          options={{
            title: "Overview",
            headerRight: () => (
              <Button
                buttonStyle={elementsStyles.buttonStyles}
                title={test ? "Drop" : "TEST!"}
                onPress={() => {
                  test ? dropAll() : createTestData();
                  setTest(!test);
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Dash"
          component={DashboardScreen}
          options={{ title: "Dashboard" }}
        />
        <Stack.Screen
          name="Products"
          component={ProductScreen}
          options={{ title: "Products" }}
        />
        <Stack.Screen
          name="Cat"
          component={CatScreen}
          options={{ title: "Catagories" }}
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
  function LandingScreen({ navigation }) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LandingPage navigation={navigation} />
        <View style={elementsStyles.buttonsWrapper}>
          <Button
            icon={{
              name: "bar-chart",
              size: 25,
              color: "white",
            }}
            buttonStyle={elementsStyles.buttonStyles}
            title={"Your \n statistics"}
            onPress={() => {
              navigation.navigate("Dash");
            }}
          />
          <RegisterItem navigation={navigation} navplace={"Cat"} />
          <Button
            icon={{
              name: "flag",
              size: 25,
              color: "white",
            }}
            buttonStyle={elementsStyles.productButtonStyles}
            title={"Products"}
            onPress={() => {
              navigation.navigate("Products");
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  // eslint-disable-next-line react/prop-types
  function StationsScreen({ navigation, route }) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <ChooseStation navigation={navigation} route={route} />
      </SafeAreaView>
    );
  }

  function CatScreen({ navigation }) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ChooseCatagories navigation={navigation} />
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
