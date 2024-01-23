import { StyleSheet, Text } from "react-native";
import { calculateDistance } from "../../utils/uptainersUtils";
import { Primarycolor1 } from "../../styles/Stylesheet";

const Distance = ({userLocation, uptainer}) => (
    <Text style={style.distance}>{`${calculateDistance(
        {latitude: userLocation.latitude, longitude: userLocation.longitude},
        {latitude: uptainer.uptainerLatitude, longitude: uptainer.uptainerLongitude})} km`}
    </Text>
)

const style = StyleSheet.create({
    distance: {
        color: Primarycolor1,
        fontSize: 11
    },
})
export default Distance;