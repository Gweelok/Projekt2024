import { View, StyleSheet, Text, Touchable, TouchableOpacity } from "react-native"
import { styles } from "../../styles/styleSheet";

const TextLink = ({ path, location, navigation, textValue, status }) => {
    const isInactiv = !status;
    return (
        <View>

            <Text style={[style.textMargin,
            isInactiv === true
            ? style.isInactiv
            : '']
            }>{textValue.text}</Text>

            <TouchableOpacity 
            onPress={() => { navigation.navigate(path, {location}) }}
            disabled={isInactiv}
            >
                <Text style={[styles.link,
                isInactiv === true
                ? style.isInactiv
            : '']}>{textValue.link}</Text>
            </TouchableOpacity>

        </View>
    )
}

const style = StyleSheet.create({
    textMargin: {
        marginBottom: 10
    },
    isInactiv: {
        color: 'grey'
    }
})

export default TextLink