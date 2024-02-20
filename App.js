import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "expo-font";

//Providers
import { LanguageProvider } from './src/Languages/LanguageHandler';
import { LoaderProvider } from "./src/components/molecules/LoaderContext";
import { TaskContextProvider } from './src/context/TaskContext';

//Pages for navigation
//Auth
import Login from './src/screens/Login';
//Home
import Home from './src/screens/Home';
//ServiceAdmin
import Uptainer from './src/screens/ServiceAdmin/Uptainer';
import OverView from './src/screens/ServiceAdmin/OverView'
import ServiceAdminMain from './src/screens/ServiceAdmin/ServiceAdminMain';
import React from 'react';
import AddItem from './src/screens/AddItem';
import ReportedItems from './src/screens/ReportedItems';


export default function App() {

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

  const Stack = createNativeStackNavigator()
  return (
    <LoaderProvider>
      <LanguageProvider>
        <TaskContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
              <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
              <Stack.Screen options={{ headerShown: false }} name="ServiceAdminMain" component={ServiceAdminMain} />
              <Stack.Screen options={{ headerShown: false }} name="Uptainer" component={Uptainer} />
              <Stack.Screen options={{ headerShown: false }} name="OverView" component={OverView} />
              <Stack.Screen options={{ headerShown: false }} name="AddItem" component={AddItem} />
            <Stack.Screen options={{ headerShown: false }} name="ReportedItems" component={ReportedItems} />
          </Stack.Navigator>
          </NavigationContainer>
        </TaskContextProvider>
      </LanguageProvider>
    </LoaderProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
