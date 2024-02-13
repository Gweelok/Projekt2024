import { StyleSheet, View } from "react-native";
import UptainerInfo from "../components/atoms/UptainerInfo";
import GlobalStyle from "../styles/GlobalStyle";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import AddUptainerForm from "../components/AddUptainer/AddUptainerForm";

export default function AddUptainer ({ route }) {
    const {location} = route.params;

    return (
        <View style={[style.container, GlobalStyle.BodyWrapper]}>
            <UptainerInfo location={location}/>
            <AddUptainerForm></AddUptainerForm>
        </View>
    )
} 

const style = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        marginTop: 40,
        alignItems: 'center',
    },
})