import { View, StyleSheet, Text } from "react-native"
import Navigationbar from "../components/organisms/Navigationbar"
import UptainerInfo from "../components/atoms/UptainerInfo"
import TextLinkList  from "../components/organisms/TextLinkList"
import { windowHeight, windowWidth } from "../../src/utils/Dimensions"
import GlobalStyle from "../styles/GlobalStyle"
import { styles } from "../styles/styleSheet"

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
            "text": "Review the condition of the Uptainer",
            "link": "Uptainer condition"
        }
    }

    const linkStatus = {
        "overview": true,
        "reportedItems": true,
        "uptainerCondition": false,
    }

    return (
        <View style={[style.container, GlobalStyle.BodyWrapper]}>
            <UptainerInfo location={location}></UptainerInfo>

            <TextLinkList navigation={navigation} location={location} textValue={textValue}
            linkStatus={linkStatus}></TextLinkList >
            {linkStatus.overview === true && linkStatus.reportedItems === true && linkStatus.uptainerCondition === true &&
            <Text style={styles.paragraph_text}>Tasks list completed</Text>
            }
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