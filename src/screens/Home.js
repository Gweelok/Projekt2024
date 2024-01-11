import { View, StyleSheet } from "react-native"
import HomeContent from "../components/Home/HomeContent"
import { windowHeight, windowWidth } from "../utils/Dimensions"
import UptainerButtonList from "../components/Home/UptainerButtonList"

const Home = () => {
    return (
        <View style={style.container}>
            <HomeContent></HomeContent>
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
