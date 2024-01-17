import { View, StyleSheet } from "react-native"
import { windowHeight, windowWidth } from "../utils/Dimensions"
import UptainerContent from "../components/Uptainer/UptainerContent"

const Uptainer = ({location}) => {
    return (
        <View style={style.container}>
            <UptainerContent location={location}></UptainerContent>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth
    }
})

export default Uptainer