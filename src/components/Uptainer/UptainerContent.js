import { View, StyleSheet } from "react-native"
import { windowHeight, windowWidth } from "../../utils/Dimensions"
import UptainerInfo from "./UptainerInfo"

const UptainerContent = ({ location }) => {
    return (
        <View style={style.container}>
            <View style={[style.uptainerInfo, style.content]}>
                <UptainerInfo location={location}></UptainerInfo>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 70,
        height: windowHeight,
        width: windowWidth
    },
    content:{
        paddingHorizontal: '15%'   
    }
})

export default UptainerContent