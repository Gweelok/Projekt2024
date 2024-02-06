import { View, StyleSheet, Text } from "react-native"
import { styles } from "../../styles/styleSheet";

const Textgroup = ({ value }) => {



    return (
        <View style={style.container}>

            <Text style={style.textMargin}>{value.text}</Text>
            <Text style={styles.link}>{value.link}</Text>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20,
        width: "75%"
    },
    textMargin: {
        marginBottom: 10
    }
})

export default Textgroup