import { View, StyleSheet } from "react-native"
import { windowHeight, windowWidth } from "../utils/Dimensions"

const Uptainer = () => {
    return (
        <View style={style.container}>
          
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