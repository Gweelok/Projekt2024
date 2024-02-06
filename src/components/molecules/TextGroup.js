import { View, StyleSheet, Text} from "react-native"
import {styles} from "../../styles/styleSheet";

const Textgroup = ({value}) => {
   

   
    return (
        <View style={style.container}>

            <Text>{value.text}</Text>
            <Text style={styles.link}>{value.link}</Text> 

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