import { useState } from "react"
import CustomInput1 from "../atoms/CustomInput1"
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native"
import { Primarycolor1, Primarycolor3 } from "../../styles/styleSheet"
import { windowHeight, windowWidth } from "../../utils/Dimensions"
import { t, useLanguage } from "../../Languages/LanguageHandler"

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {currentLanguage} = useLanguage()
    return (
        <SafeAreaView style={style.container}>
            <Text style={style.title}>{t("loginScreen.login", currentLanguage)}</Text>
            <CustomInput1 placeholder={t('loginScreen.username', currentLanguage)} value={username} onChange={setUsername}></CustomInput1>
            <CustomInput1 placeholder={t("loginScreen.password", currentLanguage)} value={password} onChange={setPassword}></CustomInput1>
            <Pressable style={style.button}><Text style={style.buttonText}>{t("loginScreen.login", currentLanguage)}</Text></Pressable>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        width: windowWidth * 0.9,
        marginLeft: windowWidth * 0.05,
        marginTop: windowHeight * 0.33
    },
    button: {
        height: 45,
        marginTop: 15,
        padding: 10,
        backgroundColor: Primarycolor1,
        
    },
    buttonText: {
        color: Primarycolor3,
        alignSelf: 'center',
        fontSize: 16
    },
    title: {
        color: Primarycolor1,
        fontSize: 30
    }
})
export default LoginForm