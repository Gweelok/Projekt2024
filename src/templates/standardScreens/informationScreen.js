import { SafeAreaView, View } from "react-native";
import screenStyle from "./screen-styles/screenStyle";

const InformationScreen = ({children}) => {

/*
    This is a info screen that has top padding and utilizes flex to take up the full size of the screen.
    It also has bodywrapper added so that screen has 5% padding horizontal.
    Background color is Light Green.
*/    

    return (
        <SafeAreaView style={screenStyle.information}>
            <View style={screenStyle.bodyWrapper}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default InformationScreen;