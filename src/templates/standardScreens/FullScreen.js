import { SafeAreaView } from "react-native";
import screenStyle from "./screen-styles/screenStyle";

const FullScreen = ({ children }) => {

    return (
        <SafeAreaView style={screenStyle.fullScreen}>
            {children}
        </SafeAreaView>
    )
}

export default FullScreen;