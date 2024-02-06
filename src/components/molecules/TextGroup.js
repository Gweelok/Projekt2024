import { View, StyleSheet, Text} from "react-native"

const Textgroup = ({value}) => {
   

   
    return (
        <View style={style.container}>

            <Text>{value.text}</Text>
            <Text>{value.link}</Text> 

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20
    }
})

export default Textgroup