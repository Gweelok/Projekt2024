import { Text, TouchableOpacity, View } from "react-native";
import { React, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { t, useLanguage } from "../../../languages/LanguageHandler";
import { useNavigation } from "@react-navigation/native";
import { LoaderContext } from "../../../contexts/LoaderContext/LoaderContext";
import { convertKgToTons } from "../../../utils/uptainersUtils";
import { BoxLink } from "../../box-link/BoxLink";
import Screens from "../../../utils/ScreenPaths";
import visitedUptainerStatStyles from "./visitedUptainerStatsStyles";

export const VisitedUptainerStats = (props) => {
  const { currentLanguage } = useLanguage();
  const navigation = useNavigation();
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const uptainer = props.uptainer;

  return (
    <View style={visitedUptainerStatStyles.container}>
      <View>
        <View>
          <TouchableOpacity>
            <View style={visitedUptainerStatStyles.boxLinkContainer}>
              <View style={visitedUptainerStatStyles.bodyWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    setIsLoading(true);
                    navigation.navigate(Screens.UPTAINER_DETAILS, {
                      uptainer: uptainer,
                    });
                  }}
                >
                  <Text style={visitedUptainerStatStyles.menuItemText}>
                    {uptainer.uptainerName}{" "}
                  </Text>
                  <Text style={visitedUptainerStatStyles.uptainerStreet}>
                    {uptainer.uptainerStreet}, {uptainer.uptainerCity},{" "}
                    {uptainer.uptainerZip}{" "}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={visitedUptainerStatStyles.iconContainer}>
                <AntDesign
                  name="right"
                  style={visitedUptainerStatStyles.menuItemArrow}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={visitedUptainerStatStyles.bodyWrapper}>
          <Text style={visitedUptainerStatStyles.itemsReusedText}>
            {uptainer.takenItems} {t("StatsPage.ItemsReused", currentLanguage)}
          </Text>
          <Text style={visitedUptainerStatStyles.co2SavedText}>
            {convertKgToTons(uptainer.savedCO2)}
            {t("StatsPage.CO2Save", currentLanguage)}
          </Text>
        </View>

        <View>
          <BoxLink
            msg={t("StatsPage.Info", currentLanguage)}
            onPress={() => {
              navigation.navigate(Screens.STATS_INFO);
            }}
            style={visitedUptainerStatStyles.bodyWrapper}
          />
        </View>
      </View>
    </View>
  );
};
export default VisitedUptainerStats;
