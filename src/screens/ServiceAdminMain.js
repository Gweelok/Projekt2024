import { View, StyleSheet } from "react-native"
import { useState } from "react"

import Navigationbar from "../components/organisms/Navigationbar"
import UptainerInfo from "../components/Uptainer/UptainerInfo"
import TextLinkList from "../components/organisms/TextLinkList"

import { windowHeight, windowWidth } from "../../src/utils/Dimensions"
import GlobalStyle from "../styles/GlobalStyle"
import { styles } from "../styles/styleSheet"

const ServiceAdminMain = ({ navigation, route }) => {
    const [isSolved, setIsSolved] = useState({ overview: false, reportedItems: false, uptainerCondition: false });

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

            <TextLinkList navigation={navigation} location={location} textValue={textValue}
                linkStatus={isSolved}>
            </TextLinkList >

            {isSolved.overview && isSolved.reportedItems && isSolved.uptainerCondition &&
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