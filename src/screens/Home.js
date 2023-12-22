import { View, Text, StyleSheet } from "react-native"
import HomeContent from "../components/Home/HomeContent"
import { windowHeight, windowWidth } from "../utils/Dimensions"

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