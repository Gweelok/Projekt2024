import { View, Text, StyleSheet } from "react-native"
import { windowHeight, windowWidth } from "../utils/Dimensions"
import { Primarycolor1, Primarycolor2, Primarycolor3 } from "../styles/styleSheet"
import LoginForm from "../components/Login/LoginForm"

const Login = ({navigation}) =>{
    return (
        <View style={style.container}>
            <LoginForm navigation={navigation}/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        marginTop: 28,
        width: windowWidth,
        height: windowHeight,
        backgroundColor: Primarycolor2,
    }
})

export default Login