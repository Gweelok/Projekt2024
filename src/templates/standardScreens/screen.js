import { SafeAreaView, View } from "react-native";
import screenStyle from "./screen-styles/screenStyle";

const Screen = ({children}) => {

/*
    This is a standard screen that utilizes flex to take up the full size of the screen.
    It also has bodywrapper added so that screen has 5% padding horizontal.
    
    Note that this screen doesn't have padding at the top and  "alignItems: "center";.
*/    

    return (
        <SafeAreaView style={screenStyle.screen}>
            <View style={screenStyle.bodyWrapper}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default Screen;