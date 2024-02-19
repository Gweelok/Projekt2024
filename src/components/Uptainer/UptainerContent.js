import { View } from "react-native"
import UptainerInfo from "../atoms/UptainerInfo"
import UptainerTaskList from "./UptainerTaskList"
import Navigationbar from "../organisms/Navigationbar"


const UptainerContent = ({ location }) => {
    return (
        <View>
            <UptainerInfo location={location}></UptainerInfo>                
            <UptainerTaskList location={location}></UptainerTaskList>
        </View>
    )
}


export default UptainerContent