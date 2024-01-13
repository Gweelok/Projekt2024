import { SafeAreaView, StyleSheet, TextInput } from "react-native"
import { Primarycolor1, Primarycolor2, Primarycolor3, Primarycolor4 } from "../../styles/styleSheet"

const CustomInput1 = ({value, onChange, placeholder}) =>{
    return (
        <SafeAreaView>
            <TextInput placeholder={placeholder} style={[style.input, {color: value.length ? Primarycolor1 : Primarycolor2,}]} value={value} onChangeText={onChange}/>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    input: {
        height: 45,
        marginTop: 15,
        borderWidth: 3,
        borderColor: Primarycolor1,
        padding: 10,
        backgroundColor: Primarycolor3
      },
})

export default CustomInput1