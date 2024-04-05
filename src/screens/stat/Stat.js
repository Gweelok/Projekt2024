import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { styles } from "../../styles/Stylesheet";
import { t, useLanguage } from "../../languages/LanguageHandler";

import statStyles from "./statStyles";
import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";

import StreetStat from "../../components/Stats/StreetStats/StreetStat";
import VisitedUptainerStats from "../../components/Stats/VisitedUptainerStats/VisitedUptainerStats";
import LightbulbIcon from "../../components/svg-components/LightbulbIcon";
import YourStats from "../../components/YourStats/YourStats";
import GreenBox from "../../components/green-box/GreenBox";
import { LoaderContext } from "../../contexts/LoaderContext/LoaderContext";
import ScrollViewComponent from "../../components/ScrollViewComponent/ScrollViewComponent";
import ChartForStats from "../../components/Stats/ChartForStats/ChartForStats";
import {
  getAllItemAndUptainerStats,
  getAllCO2Stats,
  calculateGeneralStats,
  Calculate_co2_Equivalent,
  convertKgToTons,
  getUserStats,
} from "../../utils/uptainersUtils";
import { useNavigation } from "@react-navigation/core";
import { set } from "firebase/database";

const Stat = () => {
  const navigation = useNavigation();
  const { currentLanguage } = useLanguage();
  const [activeButton, setActiveButton] = useState("main"); // 'main' or 'secondary'
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  const [data, setData] = useState({
    myMostVisitedUptainers: [],
    mostVisitedUptainers: [], // not used
    allTakenItems: 0,
    todayTakenItems: 0,
    yesterdayTakenItems: 0,
    allTakenItemsMonth: {},
    top3Uptainers: [], // not used
    top3UptainersThisMonth: [],
  });

  // Overall Stats
  const [co2Data, setCO2Data] = useState({
    todayCO2Saved: 0,
    yesterdayCO2Saved: 0,
    totalCO2Saved: 0,
  });
  const [co2Equivalent, setco2Equivalent] = useState({
    co2_pers: 10,
    personalEquivalent: 0,
    totalEquivalent: 0,
  });

  // Yours Stats
  const [userco2Data, setuserco2Data] = useState({
    totalC02Saved: 0,
    userDonatedItems: 0,
    userCollectedItems: 0,
    userCollectedItemsCO2: 0,
    userDonatedItemsCO2: 0,
  });
  const [userco2Equivalent, setuserco2Equivalent] = useState({
    co2_pers: 10,
    personalEquivalent: 0,
    totalEquivalent: 0,
  });

  const fetchData = async () => {
    const generalStats = await calculateGeneralStats();
    const stats = await getAllItemAndUptainerStats(generalStats);
    const totalCO2Savings = await getAllCO2Stats(generalStats);

    setData(stats);
    setCO2Data(totalCO2Savings);
    setco2Equivalent(Calculate_co2_Equivalent(totalCO2Savings.totalCO2Saved));
  };

  const fetchUserData = async () => {
    const userStats = await getUserStats();

    setuserco2Data(userStats);
    setuserco2Equivalent(Calculate_co2_Equivalent(userStats.totalC02Saved));
  };

  const fetchAllData = async () => {
    try {
      await fetchData();
      await fetchUserData();
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchAllData();
  }, [activeButton]);

  const handlePress = (button) => {
    setActiveButton(button);
  };

  return (
    <InteractiveScreen>
      <ScrollViewComponent>
        <View style={statStyles.headerContainer}>
          <Text style={statStyles.headerText}>
            <Text>{t("StatsPage.Header", currentLanguage)}</Text>
          </Text>
        </View>

        <View style={statStyles.buttonContainer}>
          <View style={statStyles.buttonPlacer}>
            <TouchableOpacity
              style={[
                activeButton === "main"
                  ? statStyles.mainButton
                  : statStyles.secondaryButton,
              ]}
              onPress={() => handlePress("main")}
            >
              <Text
                style={
                  activeButton === "main"
                    ? statStyles.mainButtonText
                    : statStyles.secondaryButtonText
                }
              >
                {t("StatsPage.MainButton", currentLanguage)}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={statStyles.buttonPlacer}>
            <TouchableOpacity
              style={[
                activeButton === "secondary"
                  ? statStyles.mainButton
                  : statStyles.secondaryButton,
              ]}
              onPress={() => handlePress("secondary")}
            >
              <Text
                style={
                  activeButton === "secondary"
                    ? statStyles.mainButtonText
                    : statStyles.secondaryButtonText
                }
              >
                {t("StatsPage.SecondaryButton", currentLanguage)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeButton === "main" ? (
          <View style={statStyles.mainContentContainer}>
            <View style={statStyles.amountReducedContainer}>
              <Text style={statStyles.amountReducedText}>
                {t("StatsPage.AmountReduced", currentLanguage)}
              </Text>
            </View>

            <GreenBox
              msg={t("StatsPage.SoFar", currentLanguage)}
              data={data.todayTakenItems}
              secondMsg={t("StatsPage.Yesterday", currentLanguage)}
              secondData={data.yesterdayTakenItems}
            />

            <GreenBox
              msg={t("StatsPage.InTotal", currentLanguage)}
              data={data.allTakenItems}
            />

            <View style={statStyles.chart}>
              <ChartForStats value={data.allTakenItemsMonth} />
            </View>

            <View style={statStyles.amountCO2Container}>
              <View style={statStyles.amountCO2TextContainer}>
                <Text style={statStyles.amountCO2Text}>
                  {t("StatsPage.AmountCO2", currentLanguage)}
                </Text>
              </View>

              <GreenBox
                msg={t("StatsPage.SoFar", currentLanguage)}
                data={co2Data.todayCO2Saved}
                secondMsg={t("StatsPage.Yesterday", currentLanguage)}
                secondData={co2Data.yesterdayCO2Saved}
              />

              <GreenBox
                msg={t("StatsPage.InTotal", currentLanguage)}
                data={convertKgToTons(co2Data.totalCO2Saved)}
              />
            </View>

            <View style={statStyles.equivalentContainerTop}>
              <LightbulbIcon />
              <Text style={statStyles.equivalentText}>
                {convertKgToTons(co2Equivalent.co2_pers) +
                  " " +
                  t("StatsPage.CO2Equivalent", currentLanguage) +
                  ": " +
                  co2Equivalent.personalEquivalent +
                  " " +
                  t("StatsPage.Fact_equavalent", currentLanguage)}
              </Text>
            </View>

            <View style={statStyles.equivalentContainerBottom}>
              <LightbulbIcon />
              <Text style={statStyles.equivalentText}>
                {t("StatsPage.CO2AmountBefore", currentLanguage) +
                  " " +
                  convertKgToTons(co2Data.totalCO2Saved) +
                  " " +
                  t("StatsPage.CO2Amount", currentLanguage) +
                  ": " +
                  co2Equivalent.totalEquivalent +
                  " " +
                  t("StatsPage.Fact_equavalent", currentLanguage)}
              </Text>
            </View>

            {data.top3UptainersThisMonth.length != 0 && (
              <View style={statStyles.statsContainer}>
                <Text style={styles.menuItem_text}>
                  {t("StatsPage.BestAcheieve", currentLanguage)}
                </Text>

                {data.top3UptainersThisMonth.map((uptainer, index) => {
                  return (
                    <View key={index}>
                      <StreetStat uptainer={uptainer} pos={100 - index * 25} />
                    </View>
                  );
                })}
              </View>
            )}

            {data.myMostVisitedUptainers.length != 0 && (
              <View style={statStyles.statsContainer}>
                <Text style={statStyles.mostVisitedText}>
                  {t("StatsPage.MyMostVisitedUptainer", currentLanguage)}
                </Text>

                <VisitedUptainerStats
                  uptainer={data.myMostVisitedUptainers[0]}
                />
              </View>
            )}
          </View>
        ) : (
          <YourStats
            myMostVisitedUptainers={data.myMostVisitedUptainers}
            userco2Data={userco2Data}
            userco2Equivalent={userco2Equivalent}
          />
        )}
      </ScrollViewComponent>

    </InteractiveScreen>
  );
};

export default Stat;
