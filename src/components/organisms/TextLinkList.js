import { View, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import TextLink from "../molecules/TextLink";
import Spacer from "../atoms/Spacer";

const TextLinkList = ({ location, navigation, textValue, linkStatus }) => {
    return (
        <View style={style.container}>

                <TextLink status={true} path={'OverView'} location={location} navigation={navigation} textValue={textValue.overview}></TextLink>

                <Spacer height={25}></Spacer>
                {/* Add correct path */}
                <TextLink status={linkStatus.overview} path={'ServiceAdminMain'} location={location} navigation={navigation} textValue={textValue.items}></TextLink>

                <Spacer height={25}></Spacer>
                {/* Add linkStatus.reportedItems */}
                <TextLink status={linkStatus.overview} path={'Uptainer'} location={location} navigation={navigation} textValue={textValue.condition}></TextLink>
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