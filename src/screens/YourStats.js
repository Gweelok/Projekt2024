import React, { } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { t, useLanguage } from "../Languages/LanguageHandler";
import { Backgroundstyle, HeaderText, Primarycolor1, styles } from "../styles/Stylesheet";
import ScrollViewComponent from "../componets/atoms/ScrollViewComponent";
import { useNavigation } from "@react-navigation/native";
import LightbulbIcon from "../componets/svg-components/LightbulbIcon";
import Icon from "react-native-vector-icons/FontAwesome"; // for Facebook
import Icon2 from "react-native-vector-icons/FontAwesome";
import ArticleSlider from "./article/ArticleSlider";
import GreenBox from "../styles/GreenBox";
import { convertKgToTons, } from "../utils/uptainersUtils";
import VisitedUptainerStat from "../componets/atoms/Stats/VisitedUptainerStat";

const YourStats = (props) => {
  const { currentLanguage } = useLanguage();
  const navigation = useNavigation();



  const co2Data = props.userco2Data
  const co2Equivalent = props.userco2Equivalent
  const myMostVisitedUptainer = props.myMostVisitedUptainer



  return (
    <View>
      <View style={{ marginTop: 25, marginBottom: 10 }}>
        <Text
          style={[styles.article_text, { fontWeight: "bold", fontSize: 18 }]}
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
            {t("StatsPage.ItemsDonated", currentLanguage)}
          </Text>
          <Text style={[HeaderText.Header, { marginLeft: 0, marginTop: 10, fontSize: 35 }]}>
            {co2Data.userDonatedItems}
          </Text>
        </View>

        <View style={[Backgroundstyle.informationScreens, { paddingTop: 5 }]}>
          <Text style={[styles.paragraph_text, { marginTop: 5, fontSize: 14 }]}>
            {t("StatsPage.ItemsCollected", currentLanguage)}
          </Text>
          <Text style={[HeaderText.Header, { marginLeft: 0, marginTop: 10, fontSize: 35 }]}>
            {co2Data.userTakenItems}
          </Text>
        </View>
      </View>




      <View style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("MyDrafts")}>
          <Text style={styles.link}>
            {t("StatsPage.Overview", currentLanguage)}
          </Text>
        </TouchableOpacity>
      </View>


      <View style={{ marginTop: 20 }}>
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
            data={convertKgToTons(co2Data.totalC02Saved)}
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
            {t("StatsPage.CO2AmountBefore", currentLanguage) + " " + convertKgToTons(co2Data.totalC02Saved) + " " + t("StatsPage.CO2Amount", currentLanguage) + ": " + co2Equivalent.totalEquivalent + " " + t("StatsPage.Fact_equavalent", currentLanguage)}
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
  );
};

export default YourStats;
