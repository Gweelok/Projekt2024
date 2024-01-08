import { SafeAreaView, StyleSheet, TextInput } from "react-native"
import { Primarycolor1 } from "../../styles/styleSheet"

const CustomInput1 = ({value, onChange, placeholder}) =>{
    return (
        <SafeAreaView>
            <TextInput placeholder={placeholder} style={style.input} value={value} onChangeText={onChange}/>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    input: {
        height: 45,
        margin: 12,
        borderWidth: 3,
        borderColor: Primarycolor1,
        padding: 10,
      },
})

export default CustomInput1