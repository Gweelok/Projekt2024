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
        fontSize: 12,
        color: Primarycolor1,
        marginTop: 5
    },
})
export default Distance;