import { View, StyleSheet} from "react-native"
import UptainerList from "./UptainerList"
import Navigationbar from "../organisms/Navigationbar"
import { windowHeight, windowWidth } from "../../utils/Dimensions"

const ServiceAdminContent = ({navigation}) => {
   
    return (
        <View style={style.container}>
            <UptainerList></UptainerList>
            <Navigationbar navigation={navigation} ></Navigationbar>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        //Added height for the status bar to obtain the correct screen height.
        height: windowHeight,
        width: windowWidth,
    }
})

export default ServiceAdminContent
