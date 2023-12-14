import React, { useState,useEffect} from "react";
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

const products = [
  {
    id: 1,
    catId: 1,
    name: "Speakers",
    co2Footprint: 10,
  },
  {
    id: 2,
    catId: 1,
    name: "Bluetooth speakers",
    co2Footprint: 15,
  },
  {
    id: 3,
    catId: 1,
    name: "Headset and Headphones",
    co2Footprint: 20,
  },
  {
    id: 4,
    catId: 1,
    name: "Turntable",
    co2Footprint: 30,
  },
  {
    id: 5,
    catId: 1,
    name: "Radio",
    co2Footprint: 50,
  },
  {
    id: 6,
    catId: 1,
    name: "Amplifier",
    co2Footprint: 40,
  },
  {
    id: 7,
    catId: 1,
    name: "Stereo",
    co2Footprint: 80,
  },
  {
    id: 8,
    catId: 2,
    name: "Foodprocessor",
    co2Footprint: 40,
  },
  {
    id: 9,
    catId: 2,
    name: "Mixer",
    co2Footprint: 20,
  },
  {
    id: 10,
    catId: 2,
    name: "Blender",
    co2Footprint: 30,
  },
  {
    id: 11,
    catId: 2,
    name: "Juicer",
    co2Footprint: 40,
  },
  {
    id: 12,
    catId: 2,
    name: "Coffee maker",
    co2Footprint: 40,
  },
  {
    id: 13,
    catId: 2,
    name: "Electric kettle",
    co2Footprint: 20,
  },
  {
    id: 14,
    catId: 3,
    name: "Vacuum cleaner",
    co2Footprint: 50,
  },
  {
    id: 15,
    catId: 3,
    name: "Robot vacuums",
    co2Footprint: 100,
  },
  {
    id: 16,
    catId: 3,
    name: "Steam mop",
    co2Footprint: 10,
  },
  {
    id: 17,
    catId: 4,
    name: "Tablet",
    co2Footprint: 250,
  },
  {
    id: 18,
    catId: 4,
    name: "Smartphone",
    co2Footprint: 100,
  },
  {
    id: 19,
    catId: 4,
    name: "Laptop",
    co2Footprint: 300,
  },
  {
    id: 20,
    catId: 4,
    name: "Desktop computer",
    co2Footprint: 450,
  },
  {
    id: 21,
    catId: 4,
    name: "Computer screen",
    co2Footprint: 150,
  },
  {
    id: 22,
    catId: 4,
    name: "Keyboard",
    co2Footprint: 60,
  },
  {
    id: 23,
    catId: 4,
    name: "Computer mouse",
    co2Footprint: 20,
  },
  {
    id: 24,
    catId: 5,
    name: "Flatscreen tv (not smart)",
    co2Footprint: 200,
  },
  {
    id: 25,
    catId: 5,
    name: "Smart tv",
    co2Footprint: 300,
  },
  {
    id: 26,
    catId: 5,
    name: "Gaming console",
    co2Footprint: 250,
  },
]

const Stat = ({ navigation }) => {
  const { currentLanguage } = useLanguage();

  const handlePress = () => {
    navigation.goBack();
  };
  const [activeButton, setActiveButton] = useState("main"); // 'main' or 'secondary'
  const [co2Data, setCO2Data] = useState({
    todayCO2Saved: 0,
    yesterdayCO2Saved: 0,
    totalCO2Saved: 0,
  });
  useEffect(() => {
    updateCO2Savings();
  }, []); 

  const updateCO2Savings = () => {
    const currentDate = new Date().toLocaleDateString();
    
    // Check if it's a new day
    if (currentDate !== co2Data.lastUpdateDate) {
      // Reset today's savings
      setCO2Data((prevData) => ({
        ...prevData,
        todayCO2Saved: 0,
        yesterdayCO2Saved: prevData.todayCO2Saved,
        lastUpdateDate: currentDate,
      }));
    }

    const todaySavings = calculateSavings('today');
    const yesterdaySavings = calculateSavings('yesterday');

    setCO2Data((prevData) => ({
      ...prevData,
      todayCO2Saved: prevData.todayCO2Saved + todaySavings,
      yesterdayCO2Saved: prevData.yesterdayCO2Saved + yesterdaySavings,
      totalCO2Saved: prevData.totalCO2Saved + todaySavings,
    }));
  };

  const calculateSavings = (type) => {
    const savings = products.reduce((acc, product) => {
      return acc + product.co2Footprint;
    }, 0);

    return savings;
  };

  const convertKgToTons = (kg) => {
    if (kg >= 1000) {
      return (kg / 1000).toFixed(2) + " t";
    } else {
      return kg + " kg";
    }
  };
  
  const co2EquivalentFact = 10;
  const co2SavedFact = 4;
  
  const calculateCO2Equivalent = (fact, kg) => {
    const equivalent = Math.round(fact * kg);
    const comparisonText = equivalent > 1 ? comparison + "s" : comparison; // Pluralize if necessary
    return `${equivalent} `;
  };

  const convertCO2Saved = (fact, kg) => {
    const threshold = 100;
    if (kg >= threshold) {
      return Math.round(kg / threshold) + " " ;
    } else {
      return kg + " " + comparison;
    }
  };

  const todayEquivalent = calculateCO2Equivalent(co2EquivalentFact, co2Data.todayCO2Saved);
  const todaySavedConverted = convertCO2Saved(co2SavedFact, co2Data.todayCO2Saved);
  
  const Calculate_co2_Equivalent = (co2_pers, co2_total, conv_factor, comparison) => {
    console.log(
      "10 kg of CO2 is equivalent to approximately",
      Math.round(10 * conv_factor),
      comparison
    );

    console.log(
      "Your personal CO2 contribution is equivalent to approximately",
      Math.round(co2_pers * conv_factor),
      comparison
    );
    console.log(
      "So",
      co2_total,
      "kg would amount to approximately",
      Math.round(co2_total * conv_factor),
      comparison
    );

    const calc_pers = co2_pers * conv_factor; 
    const calc_total = co2_total * conv_factor; 

    return {
      personalEquivalent: Math.round(calc_pers),
      totalEquivalent: Math.round(calc_total),
    };
  };

  const co2_pers = 10; 
  const co2_total = 100; 
  const conv_factor = 4 / 10; 
  const comparison = "loads of washing and drying."; 

  const { personalEquivalent, totalEquivalent } = Calculate_co2_Equivalent(
    co2_pers,
    co2_total,
    conv_factor,
    comparison
  );

  const handlePress1 = (button) => {
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
        <ScrollViewComponent>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-start",
            }}
          >
            <BackButton onPress={handlePress} />
            <Text
              style={[
                HeaderText.Header,
                { fontFamily: "space-grotesk-Medium" },
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
                onPress={() => handlePress1("main")}
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
                onPress={() => handlePress1("secondary")}
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
                  <View>
                    <GreenBox
                      msg={t("StatsPage.SoFar", currentLanguage)}
                      data={"50000 t."}
                      secondMsg={t("StatsPage.Yesterday", currentLanguage)}
                      secondData={"57 t"}
                    />
                  </View>
                  <View>
                    <GreenBox
                      msg={t("StatsPage.InTotal", currentLanguage)}
                      data={"50000 t."}
                    />
                  </View>
                </View>
              </View>
              <View style={[{ height: 285 }]}>
                <ChartForStats />
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
                    data={convertKgToTons(co2Data.todayCO2Saved)}
                    secondMsg={t("StatsPage.Yesterday", currentLanguage)}
                    secondData={convertKgToTons(co2Data.yesterdayCO2Saved)}
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
                      marginTop: 20,
                      marginBottom: 3,
                      marginRight: "4%",
                    },
                  ]}
                >
                  <LightbulbIcon />
                  <Text style={[styles.paragraph_text,{marginLeft:5}]}> {t('StatsPage.kgCO2', currentLanguage)}:{todayEquivalent}</Text>
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
                  <Text style={[styles.paragraph_text, {marginLeft:5}]}> {t('StatsPage.Amount', currentLanguage)}: {todaySavedConverted} </Text>
                </View>
              </View>
              <View style={[{ alignContent: "center", marginTop: 30 }]}>
                <Text style={styles.menuItem_text}>
                  {t("StatsPage.BestAcheieve", currentLanguage)}
                </Text>
              </View>
              <StreetStat />
              <StreetStat />
              <StreetStat />
              <View style={[{ alignContent: "center", marginTop: 30 }]}>
                <Text style={[styles.menuItem_text, { marginBottom: 10 }]}>
                  {t("StatsPage.MostVisitedUptainer", currentLanguage)}
                </Text>
                <VisitedUptainerStat navigation={navigation} />
              </View>
            </View>
          ) : (
            <YourStats />
          )}
        </ScrollViewComponent>
      </SafeAreaView>
      <Navigationbar navigation={navigation} />
    </View>
  );
};

export default Stat;
