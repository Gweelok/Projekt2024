import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import {
  styles,
  Backgroundstyle,
  HeaderText,
  Buttons,
} from "../styles/Stylesheet";
import Navigationbar from "../componets/Navigationbar";
import { t, useLanguage } from "../Languages/LanguageHandler";
import GlobalStyle from "../styles/GlobalStyle";
import StreetStat from "../componets/atoms/Stats/StreetStat";
import VisitedUptainerStat from "../componets/atoms/Stats/VisitedUptainerStat";
import LightbulbIcon from "../componets/svg-components/LightbulbIcon";
import YourStats from "./YourStats";
import GreenBox from "../styles/GreenBox";
import ScrollViewComponent from "../componets/atoms/ScrollViewComponent";
import ChartForStats from "../componets/atoms/Stats/ChartForStats";
import {
  getCurrentUser,
  getAllProducts,
} from "../utils/Repo";
import { getAllItemAndUptainerStats, getAllCO2Stats, calculateGeneralStats, Calculate_co2_Equivalent, convertKgToTons, getUserStats } from "../utils/uptainersUtils";
import { BoxLink } from "../styles/BoxLink";
import LoadingScreen from "../componets/LoadingScreen";
import { useNavigation } from "@react-navigation/core";

const Stat = () => {
  const navigation = useNavigation()
  const { currentLanguage } = useLanguage();
  const [activeButton, setActiveButton] = useState("main"); // 'main' or 'secondary'
  const [isLoading, setIsLoading] = useState(true)


  const [data, setData] = useState({
    myMostVisitedUptainers: [],
    mostVisitedUptainers: [], // not used
    allTakenItems: 0,
    todayTakenItems: 0,
    yesterdayTakenItems: 0,
    allTakenItemsMonth: {},
    top3Uptainers: [],  // not used
    top3UptainersThisMonth:[]
  });


  // Overall Stats
  const [co2Data, setCO2Data] = useState({
    todayCO2Saved: 0,
    yesterdayCO2Saved: 0,
    totalCO2Saved: 0,
  })
  const [co2Equivalent, setco2Equivalent] = useState({
    co2_pers: 10,
    personalEquivalent: 0,
    totalEquivalent: 0
  })


  // Yours Stats
  const [userco2Data, setuserco2Data] = useState({
    totalC02Saved: 0,
    userDonatedItems: 0,
    userCollectedItems: 0,
    userCollectedItemsCO2: 0,
    userDonatedItemsCO2: 0
  })
  const [userco2Equivalent, setuserco2Equivalent] = useState({
    co2_pers: 10,
    personalEquivalent: 0,
    totalEquivalent: 0
  })





  const fetchData = async () => {
    const generalStats = await calculateGeneralStats()
    const stats = await getAllItemAndUptainerStats(generalStats)
    const totalCO2Savings = await getAllCO2Stats(generalStats)



    setData(stats)
    setCO2Data(totalCO2Savings)
    setco2Equivalent(Calculate_co2_Equivalent(totalCO2Savings.totalCO2Saved))
  }


  const fetchUserData = async () => {
    const userStats = await getUserStats()

    setuserco2Data(userStats)
    setuserco2Equivalent(Calculate_co2_Equivalent(userStats.totalC02Saved))
  }


  const fetchAllData = async () => {
    try {
      await fetchData()
      await fetchUserData()
      setIsLoading(false)
    } catch (error) {
      Alert.alert("Error", error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [activeButton]);








  const handlePress = (button) => {
    setActiveButton(button);
  };

  return (
    <View
      style={[
        Backgroundstyle.interactive_screens,
        GlobalStyle.BodyWrapper,
        { flex: 1, justifyContent: "center" },
      ]}
    >
      <LoadingScreen isLoaderShow={isLoading}></LoadingScreen>
      <SafeAreaView>
        <ScrollViewComponent>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-start",
            }}
          >
            <Text
              style={[
                HeaderText.Header,
                { fontFamily: "space-grotesk-Medium" },
                { marginLeft: 0 },
              ]}
            >
              <Text>{t("StatsPage.Header", currentLanguage)}</Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <View style={{ width: "48%" }}>
              <TouchableOpacity
                style={[
                  activeButton === "main"
                    ? Buttons.main_button
                    : Buttons.secondary_button,
                ]}
                onPress={() => handlePress("main")}
              >
                <Text
                  style={
                    activeButton === "main"
                      ? Buttons.main_buttonText
                      : Buttons.secondary_buttonText
                  }
                >
                  {t("StatsPage.MainButton", currentLanguage)}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "48%" }}>
              <TouchableOpacity
                style={[
                  activeButton === "secondary"
                    ? Buttons.main_button
                    : Buttons.secondary_button,
                ]}
                onPress={() => handlePress("secondary")}
              >
                <Text
                  style={
                    activeButton === "secondary"
                      ? Buttons.main_buttonText
                      : Buttons.secondary_buttonText
                  }
                >
                  {t("StatsPage.SecondaryButton", currentLanguage)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {activeButton === "main" ? (
            <View style={{ justifyContent: "space-between", marginTop: 10 }}>
              <View style={{ marginTop: 15, marginBottom: 10 }}>
                <Text
                  style={[
                    styles.article_text,
                    { fontWeight: "bold", fontSize: 18 },
                  ]}
                >
                  {t("StatsPage.AmountReduced", currentLanguage)}
                </Text>
              </View>




              <View>
                <View>
                  <GreenBox
                    msg={t("StatsPage.SoFar", currentLanguage)}
                    data={data.todayTakenItems}
                    secondMsg={t("StatsPage.Yesterday", currentLanguage)}
                    secondData={data.yesterdayTakenItems}
                  />
                </View>


                <View>
                  <GreenBox
                    msg={t("StatsPage.InTotal", currentLanguage)}
                    data={data.allTakenItems}
                  />
                </View>
              </View>





              <View style={[{ height: 285 }]}>
                <ChartForStats
                  value={data.allTakenItemsMonth}
                />
              </View>




              <View style={{ marginTop: 20 }}>
                <View style={{ marginTop: 2, marginBottom: 20 }}>
                  <Text
                    style={[
                      styles.article_text,
                      { fontWeight: "bold", fontSize: 18 },
                    ]}
                  >
                    {t("StatsPage.AmountCO2", currentLanguage)}
                  </Text>
                </View>

                <View>
                  <View>
                    <GreenBox
                      msg={t("StatsPage.SoFar", currentLanguage)}
                      data={co2Data.todayCO2Saved}
                      secondMsg={t("StatsPage.Yesterday", currentLanguage)}
                      secondData={co2Data.yesterdayCO2Saved}
                    />
                  </View>


                  <View>
                    <GreenBox
                      msg={t("StatsPage.InTotal", currentLanguage)}
                      data={convertKgToTons(co2Data.totalCO2Saved)}
                    />
                  </View>
                </View>
              </View>


              <View>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 20,
                      marginBottom: 3,
                      marginRight: "4%",
                    },
                  ]}
                >
                  <LightbulbIcon />
                  <Text style={[styles.paragraph_text, { marginLeft: 5 }]}>
                    {convertKgToTons(co2Equivalent.co2_pers) + " " + t("StatsPage.CO2Equivalent", currentLanguage) + ": " + co2Equivalent.personalEquivalent + " " + t("StatsPage.Fact_equavalent", currentLanguage)}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 3,
                      marginBottom: 3,
                      marginRight: "4%",
                    },
                  ]}
                >
                  <LightbulbIcon />
                  <Text style={[styles.paragraph_text, { marginLeft: 5 }]}>
                    {t("StatsPage.CO2AmountBefore", currentLanguage) + " " + convertKgToTons(co2Data.totalCO2Saved) + " " + t("StatsPage.CO2Amount", currentLanguage) + ": " + co2Equivalent.totalEquivalent + " " + t("StatsPage.Fact_equavalent", currentLanguage)}
                  </Text>
                </View>
              </View>



              {data.top3UptainersThisMonth.length != 0 &&
                <View style={[{ alignContent: "center", marginTop: 30 }]}>
                  <Text style={styles.menuItem_text}>
                    {t("StatsPage.BestAcheieve", currentLanguage)}
                  </Text>

                  {data.top3UptainersThisMonth.map((uptainer, index) => {
                    return (
                      <View key={index}>
                        <StreetStat uptainer={uptainer} pos={100 - (index * 25)} />
                      </View>
                    )
                  })}
                </View>
              }





              {data.myMostVisitedUptainers.length != 0 &&
                <View style={[{ alignContent: "center", marginTop: 30 }]}>
                  <Text style={[styles.menuItem_text, { marginBottom: 10 }]}>
                    {t("StatsPage.MyMostVisitedUptainer", currentLanguage)}
                  </Text>
                  <VisitedUptainerStat
                    uptainer={data.myMostVisitedUptainers[0]}
                  />
                </View>
              }





            </View>
          ) : (
            <YourStats
              myMostVisitedUptainers={data.myMostVisitedUptainers}
              userco2Data={userco2Data}
              userco2Equivalent={userco2Equivalent}
            />
          )}




        </ScrollViewComponent>
      </SafeAreaView>
      <Navigationbar navigation={navigation} />
    </View>
  );
};

export default Stat;
