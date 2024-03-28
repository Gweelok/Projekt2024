import { SafeAreaView, View } from "react-native";
import screenStyle from "./screen-styles/screenStyle";

/*
    This is a standard screen that has top padding and utilizes flex to take up the full size of the screen.
    It also has bodywrapper added so that screen has 5% padding horizontal.
    Background color is white.
*/

const InteractiveScreen = ({ children }) => {
  return (
    <SafeAreaView style={screenStyle.interactive}>
      <View style={screenStyle.bodyWrapper}>{children}</View>
    </SafeAreaView>
  );
};

export default InteractiveScreen;
