import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { t, useLanguage } from "../Languages/LanguageHandler";
import {
  Backgroundstyle,
  HeaderText,
  Primarycolor1,
  styles,
} from "../styles/Stylesheet";
import ScrollViewComponent from "../componets/atoms/ScrollViewComponent";
import GlobalStyle from "../styles/GlobalStyle";
import { useNavigation } from "@react-navigation/native";
import LightbulbIcon from "../componets/svg-components/LightbulbIcon";
import Icon from "react-native-vector-icons/FontAwesome"; // for Facebook
import Icon2 from "react-native-vector-icons/FontAwesome";
import YourVisitedUptainer from "../componets/atoms/Stats/YourVisitedUptainer";
import ArticleSlider from "./article/ArticleSlider";
import GreenBox from "../styles/GreenBox";
import {
  getAllItems,
  getItemsFromUser,
  getCurrentUser,
  getAllProducts,
} from "../utils/Repo";
import { items } from "../utils/Testdata";
import {
  Calculate_co2_Equivalent,
  convertKgToTons,
  getUserStats,
} from "../utils/uptainersUtils";
import VisitedUptainerStat from "../componets/atoms/Stats/VisitedUptainerStat";

const YourStats = (props) => {
  const { currentLanguage } = useLanguage();
  const navigation = useNavigation();


  let [co2Data, setCO2Data] = useState({
    TotalCo2Footprint: 0,
    itemsDonated: 0,
    itemsTaken: 0,
  });

  const [co2Equivalent, setco2Equivalent] = useState({
    co2_pers: 10,
    personalEquivalent: 0,
    totalEquivalent: 0
  })


  const myMostVisitedUptainer = props.myMostVisitedUptainer

  useEffect(() => {
    getUserStats().then((userStats) => {
      setCO2Data({
        TotalCo2Footprint: userStats.totalC02Saved,
        itemsDonated: userStats.userDonatedItems,
        itemsTaken: userStats.userTakenItems,
      });

      setco2Equivalent(Calculate_co2_Equivalent(userStats.totalC02Saved))
    })
  }, []);


  return (
    <ScrollViewComponent>
      <View>
        <View style={{ marginTop: 25, marginBottom: 10 }}>
          <Text
            style={[styles.article_text, { fontWeight: "bold", fontSize: 18 }]}
          >
            {t("StatsPage.AmountReduced", currentLanguage)}
          </Text>
        </View>




        <View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
            <GreenBox
              msg={t("StatsPage.ItemsDonated", currentLanguage)}
              data={co2Data.itemsDonated}
            />
            <GreenBox
              msg={t("StatsPage.ItemsCollected", currentLanguage)}
              data={co2Data.itemsTaken}
            />
          </View>
        </View>




        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate("MyDrafts")}>
            <Text style={styles.link}>
              {t("StatsPage.Overview", currentLanguage)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text
            style={[
              styles.article_text,
              { fontWeight: "bold", fontSize: 18, marginBottom: -10 },
            ]}
          >
            {t("StatsPage.AmountCO2", currentLanguage)}
          </Text>
        </View>


        <View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
            <GreenBox
              msg={t("StatsPage.InTotal", currentLanguage)}
              data={convertKgToTons(co2Data.TotalCo2Footprint)}
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
              {t("StatsPage.CO2AmountBefore", currentLanguage)+" "+convertKgToTons(co2Data.TotalCo2Footprint) + " " + t("StatsPage.CO2Amount", currentLanguage) + ": " + co2Equivalent.totalEquivalent + " " + t("StatsPage.Fact_equavalent", currentLanguage)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
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
            <View
              style={{
                backgroundColor: Primarycolor1,
                alignItems: "center",
                borderRadius: 3,
                padding: 4,
                height: 35,
                width: 35,
              }}
            >
              <TouchableOpacity>
                <Icon name="facebook" size={30} color="white" />
              </TouchableOpacity>
            </View>
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
            <View
              style={{
                backgroundColor: Primarycolor1,
                alignItems: "center",
                borderRadius: 3,
                padding: 2,
                height: 35,
                width: 35,
              }}
            >
              <TouchableOpacity>
                <Icon2 name="instagram" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10, alignItems: "center" }}>
          <Text style={[styles.paragraph_text, { fontSize: 14 }]}>
            {t("StatsPage.Social", currentLanguage)}{" "}
          </Text>
        </View>
        <View>
          <View
            style={{
              backgroundColor: Primarycolor1,
              height: 3,
              marginTop: 40,
              marginBottom: 30,
            }}
          />
        </View>


        {myMostVisitedUptainer &&
          <View>
            <Text style={[styles.menuItem_text, { marginBottom: 10 }]}>
              {t("StatsPage.MyMostVisitedUptainer", currentLanguage)}
            </Text>
            <VisitedUptainerStat
              navigation={navigation}
              uptainer={myMostVisitedUptainer}
            />
          </View>
        }

        <View style={{ marginTop: 25, marginBottom: 10 }}>
          <Text
            style={[styles.article_text, { fontWeight: "bold", fontSize: 18 }]}
          >
            {t("StatsPage.GetInspired", currentLanguage)}
          </Text>
        </View>
        <ArticleSlider />
      </View>
    </ScrollViewComponent>
  );
};

export default YourStats;
