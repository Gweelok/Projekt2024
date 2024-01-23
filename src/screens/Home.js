import { View, StyleSheet } from "react-native"
import HomeContent from "../components/home/HomeContent"
import { windowHeight, windowWidth } from "../utils/Dimensions"

const Home = ({navigation}) => {
    return (
        <View style={style.container}>
            <HomeContent navigation={navigation}></HomeContent>
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
