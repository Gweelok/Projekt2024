import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { LoaderProvider } from "./src/components/LoaderContext";
//Providers
import { LanguageProvider } from "./src/Languages/LanguageHandler";
import { LoaderProvider } from "./src/components/molecules/LoaderContext";

//importing pages for navigation
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Uptainer from "./src/screens/Uptainer";
import QRScanner from "./src/screens/QRScanner"; // For QR Scan testing, delete later
import OverView from './src/screens/OverView'
import ServiceAdminMain from "./src/screens/ServiceAdminMain";

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

  const Stack = createNativeStackNavigator();
  return (
    <LoaderProvider>
      <LanguageProvider>
        <LoaderProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="QRScanner">
              <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />
              <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
              <Stack.Screen
              options={{ headerShown: false }}
              name="Uptainer"
              component={Uptainer}
            />
            <Stack.Screen options={{ headerShown: false }} name="OverView" component={OverView} />
              {/* For QRScan testing, delete later */}
            <Stack.Screen
              options={{ headerShown: false }}
              name="QRScanner"
              component={QRScanner}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ServiceAdminMain"
              component={ServiceAdminMain}
            />
            </Stack.Navigator>
          </NavigationContainer>
        </LoaderProvider>
    </LanguageProvider>
    </LoaderProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
