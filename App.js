import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
//Providers
import { LanguageProvider } from "./src/Languages/LanguageHandler";
import { LoaderProvider } from "./src/components/molecules/LoaderContext";

//importing pages for navigation
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Uptainer from "./src/screens/Uptainer";
import OverView from "./src/screens/OverView";
import ServiceAdminMain from "./src/screens/ServiceAdminMain";
import AddQRScanner from "./src/screens/AddQRScanner"; //For testing QR Scannerimport AddItem from './src/screens/AddItem';


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
        <NavigationContainer>
          <Stack.Navigator initialRouteName="AddQRScanner">
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
            <Stack.Screen
              options={{ headerShown: false }}
              name="OverView"
              component={OverView}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ServiceAdminMain"
              component={ServiceAdminMain}
            />
            {/*     For testing QR Scanner */}
            <Stack.Screen
              options={{ headerShown: false }}
              name="AddQRScanner"
              component={AddQRScanner}
            />
            <Stack.Screen options={{ headerShown: false }} name="AddItem" component={AddItem} />
          </Stack.Navigator>
        </NavigationContainer>
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
