import { Text, TouchableOpacity, View } from "react-native";
import { React, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LoaderContext } from "../../../contexts/LoaderContext/LoaderContext";
import Screens from "../../../utils/ScreenPaths";
import yourVisitedUptainerStyles from "./yourVisitedUptainerStatsStyles";

export const YourVisitedUptainerStats = (value) => {
  const navigation = useNavigation();
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  const uptainerData = value["value"];

  // Create variables for information about uptainer
  let location = "n/d";
  let address = "n/d";
  let city = "n/d";
  let zip = "n/d";

  if (value) {
    location = uptainerData["uptainerName"];
    address = uptainerData["uptainerStreet"];
    city = uptainerData["uptainerCity"];
    zip = uptainerData["uptainerZip"];
  }
  return (
    <View style={yourVisitedUptainerStyles.container}>
      <View>
        <View>
          <TouchableOpacity
            onPress={() => {
              setIsLoading(true);
              navigation.navigate(Screens.UPTAINER_DETAILS, {
                uptainer: uptainerData,
              });
            }}
          >
            <View style={yourVisitedUptainerStyles.boxLink}>
              <View style={yourVisitedUptainerStyles.bodyWrapper}>
                <Text style={yourVisitedUptainerStyles.menuItemText}>
                  {location}{" "}
                </Text>
                <Text style={yourVisitedUptainerStyles.addressText}>
                  {address}, {city}, {zip}{" "}
                </Text>
              </View>
              <View style={yourVisitedUptainerStyles.iconContainer}>
                <AntDesign
                  name="right"
                  style={yourVisitedUptainerStyles.menuItemArrow}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default YourVisitedUptainerStats;
