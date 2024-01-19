import { View, StyleSheet, Dimensions, StatusBar } from "react-native"
import UptainerList from "./UptainerList"
import Navigationbar from "./Navigationbar"
import { windowHeight, windowWidth } from "../../utils/Dimensions"

const statusBar = StatusBar.currentHeight;

const ServiceAdmin = () => {
   
    return (
        <View style={style.container}>
            <UptainerList></UptainerList>

            <Navigationbar ></Navigationbar>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        //Added height for the status bar to obtain the correct screen height.
        height: windowHeight + statusBar,
        width: windowWidth,
    }
})

export default ServiceAdmin
