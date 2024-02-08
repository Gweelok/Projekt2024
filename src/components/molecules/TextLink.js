import { View, StyleSheet, Text } from "react-native"
import { styles } from "../../styles/styleSheet";

const TextLink = ({ textValue }) => {

    return (
        <View>

            <Text style={style.textMargin}>{textValue.text}</Text>
            <Text style={styles.link}>{textValue.link}</Text>

        </View>
    )
}

const style = StyleSheet.create({
    textMargin: {
        marginBottom: 10
    }
})

export default TextLink