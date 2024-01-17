import { View, StyleSheet } from "react-native"
import { windowHeight, windowWidth } from "../../utils/Dimensions"
import UptainerInfo from "./UptainerInfo"

const UptainerContent = ({location}) => {
    return (
        <View style={style.container}>
            <UptainerInfo location={location}></UptainerInfo>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth
    }
})

export default UptainerContent