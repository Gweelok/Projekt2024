import { View, StyleSheet } from "react-native";
import TextLink from "../molecules/TextLink";
import Spacer from "../atoms/Spacer";

const TextLinkList = ({ textValue }) => {

    return (
        <View style={style.container}>

            <TextLink textValue={textValue.overview}></TextLink>

            <Spacer height={25}></Spacer>

            <TextLink textValue={textValue.items}></TextLink>

            <Spacer height={25}></Spacer>

            <TextLink textValue={textValue.condition}></TextLink>

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