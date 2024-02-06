import { View, StyleSheet, Text} from "react-native"
import Navigationbar from "../components/organisms/Navigationbar"
import UptainerInfo from "../components/Uptainer/UptainerInfo"
import Textgroup from "../components/molecules/TextGroup"
import { windowHeight, windowWidth } from "../../src/utils/Dimensions"
import GlobalStyle from "../styles/GlobalStyle"

const ServiceAdminMain = ({navigation, route}) => {
    const { location } = route.params;

    const value = {
        "text":"Main text but we try it a bit longer for testing",
        "link":"link text but we try it for testing"
    }
   
    return (
        <View style={[style.container, GlobalStyle.BodyWrapper]}>
            <UptainerInfo location={location}></UptainerInfo> 

             <Textgroup value={value}></Textgroup>
             <Textgroup value={value}></Textgroup>
             <Textgroup value={value}></Textgroup>
    
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
    },
})

export default ServiceAdminMain