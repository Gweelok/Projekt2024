import { StyleSheet, View } from "react-native";
import UptainerInfo from "../components/atoms/UptainerInfo";
import GlobalStyle from "../styles/GlobalStyle";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import AddItemForm from "../components/AddItem/AddItemForm";

export default function AddItem ({ route }) {
    let location = route.params;


    return (
        <View style={[style.container, GlobalStyle.BodyWrapper]}>
            <UptainerInfo location={location}/>
            <AddItemForm></AddItemForm>
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