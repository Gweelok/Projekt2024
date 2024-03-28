import { StyleSheet, Text } from "react-native";
import { calculateDistance } from "../../utils/uptainersUtils";
import distanceStyles from "./distanceStyles";

const Distance = ({ userLocation, uptainer }) => (
  <Text style={style.distance}>
    {`${calculateDistance(
      { latitude: userLocation.latitude, longitude: userLocation.longitude },
      {
        latitude: uptainer.uptainerLatitude,
        longitude: uptainer.uptainerLongitude,
      }
    )} km`}
  </Text>
);

const style = StyleSheet.create({
  distance: {
    fontSize: distanceStyles.distance.fontSize,
    color: distanceStyles.distance.color,
    marginTop: distanceStyles.distance.marginTop,
  },
});
export default Distance;
