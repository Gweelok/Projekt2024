import { SafeAreaView, View } from "react-native";
import screenStyle from "./screen-styles/screenStyle";

const MessageScreen = ({children}) => {

/*
    This is a message screen that utilizes flex to take up the full size of the screen.
    It also has bodywrapper added so that screen has 5% padding horizontal.
    Background color is Dark Green.
*/    

    return (
        <SafeAreaView style={screenStyle.message}>
            <View style={screenStyle.bodyWrapper}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default MessageScreen;