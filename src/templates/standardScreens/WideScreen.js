import { SafeAreaView } from "react-native";
import screenStyle from "./screen-styles/screenStyle";

const WideScreen = ({ children }) => {

/*
    This is a screen that don't utilize body wrapper.
    It takes up the full size of the screen and have padding on top.
*/        

    return (
        <SafeAreaView style={screenStyle.wideScreen}>
            {children}
        </SafeAreaView>
    )
}

export default WideScreen;