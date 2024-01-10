import { View, StyleSheet } from "react-native"
import UptainerList from "../components/Home/UptainerButtonList"
import { windowHeight, windowWidth } from "../utils/Dimensions"

const Home = () => {
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

export default Home