import { View, StyleSheet, Text, Touchable, TouchableOpacity } from "react-native"
import { styles } from "../../styles/styleSheet";

const TextLink = ({ path, location, navigation, textValue }) => {

    return (
        <View>

            <Text style={style.textMargin}>{textValue.text}</Text>

            <TouchableOpacity onPress={() => { navigation.navigate(path, {location}) }}>
                <Text style={styles.link}>{textValue.link}</Text>
            </TouchableOpacity>

        </View>
    )
}

const style = StyleSheet.create({
    textMargin: {
        marginBottom: 10
    }
})

export default TextLink