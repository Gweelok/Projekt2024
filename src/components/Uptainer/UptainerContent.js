import { View } from "react-native"
import UptainerInfo from "./UptainerInfo"
import UptainerTaskList from "./UptainerTaskList"


const UptainerContent = ({ location }) => {
    return (
        <View>
            <UptainerInfo location={location}></UptainerInfo>                
            <UptainerTaskList></UptainerTaskList>  
        </View>
    )
}


export default UptainerContent