import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "expo-font";

import { LanguageProvider } from './src/Languages/LanguageHandler';

//importing pages for navigation
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Uptainer from './src/screens/Uptainer';
<<<<<<< HEAD
import QRScanner from './src/screens/QRScanner'; // For testing
=======
import ServiceAdminMain from './src/screens/ServiceAdminMain';
>>>>>>> main


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
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='QRScanner'>
          <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
          <Stack.Screen options={{ headerShown: false }} name="Uptainer" component={Uptainer} />
<<<<<<< HEAD
          {/* For testing */}
          <Stack.Screen options={{ headerShown: false }} name="QRScanner" component={QRScanner} /> 
=======
          <Stack.Screen options={{ headerShown: false }} name="ServiceAdminMain" component={ServiceAdminMain} />
>>>>>>> main
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
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
