import { View, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import TextLink from "../molecules/TextLink";
import Spacer from "../atoms/Spacer";

const TextLinkList = ({ navigation, textValue }) => {

    return (
        <View style={style.container}>

                <TextLink path={'OverView'} navigation={navigation} textValue={textValue.overview}></TextLink>

                <Spacer height={25}></Spacer>

                <TextLink navigation={navigation} textValue={textValue.items}></TextLink>

                <Spacer height={25}></Spacer>

                <TextLink navigation={navigation} textValue={textValue.condition}></TextLink>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        marginTop: 40,
        width: "75%"
    },
    textMargin: {
        marginBottom: 20
    }
})

export default TextLinkList 