import { View, StyleSheet, Text } from "react-native"
import Navigationbar from "../components/organisms/Navigationbar"
import UptainerInfo from "../components/Uptainer/UptainerInfo"
import TextLinkList  from "../components/organisms/TextLinkList"
import { windowHeight, windowWidth } from "../../src/utils/Dimensions"
import GlobalStyle from "../styles/GlobalStyle"

const ServiceAdminMain = ({ navigation, route }) => {
    const { location } = route.params;

    //Check if needed to be extracted later to language??
    const textValue = {
        "overview": {
            "text": "Review the items in the Uptainer",
            "link": "Overview"
        },
        "items": {
            "text": "Review the reported items",
            "link": "Reported items"
        },
        "condition": {
            "text": "Review the conditions of the Uptainer",
            "link": "Uptainer condition"
        }
    }

    return (
        <View style={[style.container, GlobalStyle.BodyWrapper]}>
            <UptainerInfo location={location}></UptainerInfo>

            <TextLinkList navigation={navigation} textValue={textValue}></TextLinkList >

            <Navigationbar navigation={navigation} ></Navigationbar>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50
    }
})

export default ServiceAdminMain