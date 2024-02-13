import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  styles,
  Backgroundstyle,
  HeaderText,
  Buttons,
  Primarycolor1,
} from "../styles/Stylesheet";
import Navigationbar from "../componets/Navigationbar";
import { useNavigation } from "@react-navigation/native";
import { t, useLanguage } from "../Languages/LanguageHandler";
import BackButton from "../componets/BackButton";
import GlobalStyle from "../styles/GlobalStyle";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the appropriate icon library
import StreetStat from "../componets/atoms/Stats/StreetStat";
import VisitedUptainerStat from "../componets/atoms/Stats/VisitedUptainerStat";
import Svg, { Path } from "react-native-svg";
import LightbulbIcon from "../componets/svg-components/LightbulbIcon";
import YourStats from "./YourStats";
import GreenBox from "../styles/GreenBox";
import ScrollViewComponent from "../componets/atoms/ScrollViewComponent";
import ChartForStats from "../componets/atoms/Stats/ChartForStats";
import {
  getAllItems,
  getAllUptainers,
  getProductById,
  getCurrentUser,
  getDraftFromUser,
  getAllProducts,
} from "../utils/Repo";
import { items } from "../utils/Testdata";
import { set } from "firebase/database";
import { getAllItemAndUptainerStats, getAllCO2Stats, calculateGeneralStats, Calculate_co2_Equivalent, convertKgToTons } from "../utils/uptainersUtils";
import { BoxLink } from "../styles/BoxLink";
import { Divider } from "react-native-elements";

const Stat = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [userCurrent, setUserCurrent] = useState({});
  const [refreshing, setRefresh] = useState(false);
  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const { currentLanguage } = useLanguage();

  const [data, setData] = useState({
    bestUptainer: {},
    allTakenItems: 0,
    todayTakenItems: 0,
    yesterdayTakenItems: 0,
    allTakenItemsMonth: {},
    top3Uptainers: [],
  });

  const [activeButton, setActiveButton] = useState("main"); // 'main' or 'secondary'

  const [co2Data, setCO2Data] = useState({
    todayCO2Saved: 0,
    yesterdayCO2Saved: 0,
    totalCO2Saved: 0,
  });

  const [co2Equivalent, setco2Equivalent] = useState({
    co2_pers: 10,
    personalEquivalent: 0,
    totalEquivalent: 0
  })



  const fetchData = async () => {
    const generalStats = await calculateGeneralStats()

    const stats = await getAllItemAndUptainerStats(generalStats);
    setData(stats);

    const userCurrent = await getCurrentUser();
    setUserCurrent(userCurrent);

    const products = await getAllProducts();
    setProducts(products);


    const totalCO2Savings = await getAllCO2Stats(generalStats);

    setCO2Data({
      todayCO2Saved: totalCO2Savings.todayCO2Saved,
      yesterdayCO2Saved: totalCO2Savings.yesterdayCO2Saved,
      totalCO2Saved: totalCO2Savings.totalCO2Saved,
    });

    setco2Equivalent(Calculate_co2_Equivalent(totalCO2Savings.totalCO2Saved))
  }


  useEffect(() => {
    fetchData()
  }, []);










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
      <SafeAreaView>
        <ScrollViewComponent refreshing={refreshing} onRefresh={onRefresh}>
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


              <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
                <View
                  style={[
                    Backgroundstyle.informationScreens,
                    { paddingTop: 5, marginRight: 15 },
                  ]}
                >
                  <Text style={[styles.paragraph_text, { marginTop: 5, fontSize: 14 }]}>
                    {t("StatsPage.SoFar", currentLanguage)}
                  </Text>
                  <Text style={[HeaderText.Header, { marginLeft: 0, marginTop: 10, fontSize: 35 }]}>
                    {data.todayTakenItems}
                  </Text>
                </View>
                <View style={[Backgroundstyle.informationScreens, { paddingTop: 5 }]}>
                  <Text style={[styles.paragraph_text, { marginTop: 5, fontSize: 14 }]}>
                    {t("StatsPage.Yesterday", currentLanguage)}
                  </Text>
                  <Text style={[HeaderText.Header, { marginLeft: 0, marginTop: 10, fontSize: 35 }]}>
                    {data.yesterdayTakenItems}
                  </Text>
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
                  value={data["allTakenItemsMonth"]}
                  refreshing={refreshing}
                />
              </View>
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
                    {co2Equivalent.co2_pers + " " + t("StatsPage.kgCO2", currentLanguage) + ": " + co2Equivalent.personalEquivalent + " " + t("StatsPage.Fact_equavalent", currentLanguage)}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      marginTop: 5,
                      marginBottom: 3,
                      marginRight: "4%",
                    },
                  ]}
                >
                  <LightbulbIcon />
                  <Text style={[styles.paragraph_text, { marginLeft: 5 }]}>
                    {convertKgToTons(co2Data.totalCO2Saved) + " " + t("StatsPage.kgCO2Amount", currentLanguage) + ": " + co2Equivalent.totalEquivalent + " " + t("StatsPage.Fact_equavalent", currentLanguage)}
                  </Text>
                </View>
              </View>



              {data.top3Uptainers.length != 0 &&
                <View>
                  <Divider color={Primarycolor1} width={2} style={{ marginVertical: 20 }}></Divider>

                  <Text style={styles.menuItem_text}>
                    {t("StatsPage.BestAcheieve", currentLanguage)}
                  </Text>

                  {data.top3Uptainers.map((uptainer, index) => {
                    return (
                      <View>
                        <VisitedUptainerStat
                          navigation={navigation}
                          value={uptainer}
                          key={index}
                        />
                        {index < data.top3Uptainers.length-1 &&
                          <Divider color={Primarycolor1} width={1} style={{ marginVertical: 10 }}></Divider>
                        }
                      </View>
                    )
                  })}
                </View>
              }






              {data.bestUptainer &&
                <View>
                  <Divider color={Primarycolor1} width={2} style={{ marginVertical: 20 }}></Divider>
                  <Text style={[styles.menuItem_text, { marginBottom: 10 }]}>
                    {t("StatsPage.MostVisitedUptainer", currentLanguage)}
                  </Text>
                  <VisitedUptainerStat
                    navigation={navigation}
                    value={data.bestUptainer}
                  />
                </View>
              }


              <View>
                <BoxLink msg={t('StatsPage.Info', currentLanguage)} onPress={() => { navigation.navigate("StatsInfo") }} style={GlobalStyle.BodyWrapper} />
              </View>
            </View>
          ) : (
            <YourStats
              user={userCurrent}
              products={products}
              uptainers={[data["bestUptainer"]]}
            />
          )}
        </ScrollViewComponent>
      </SafeAreaView>
      <Navigationbar navigation={navigation} />
    </View>
  );
};

export default Stat;
