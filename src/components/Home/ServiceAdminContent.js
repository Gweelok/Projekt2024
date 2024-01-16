import { View, StyleSheet } from "react-native"
import UptainerList from "./UptainerList"
import { windowHeight, windowWidth } from "../../utils/Dimensions"

const ServiceAdmin = () => {
    return (
        <View style={style.container}>
            <UptainerList></UptainerList>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth
    }
})

export default ServiceAdmin
