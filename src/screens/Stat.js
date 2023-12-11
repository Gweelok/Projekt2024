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
import { getAllItems, getAllUptainers, getProductById} from "../utils/Repo";

const Stat = ({ navigation }) => {
    const { currentLanguage } = useLanguage();
    let [data, setData] = useState({
        bestUptainer: {},
        allTakenItems: 0,
        todayTakenItems: 0,
        yesterdayTakenItems: 0,
        allTakenItemsMonth: {},
        });

    const allItems = async () => {
    
    // Load all items from database
    //const items = await getAllItems();
    // Load all Uptainers from database
    const allUptainers = await getAllUptainers();

    const allUptainersStat = {}
    //Create all Uptainers in allUptainersStat
    for (let i = 0; i < allUptainers.length; i ++ ){
        allUptainersStat[allUptainers[i]["uptainerId"]] = {
            "uptainerCity": allUptainers[i]["uptainerCity"],
            "uptainerName": allUptainers[i]["uptainerName"],
            "uptainerStreet": allUptainers[i]["uptainerStreet"],
            "upTainerID": allUptainers[i]["uptainerId"], 
            "itemsReused": 0,
            "savedCO2":0,
            "numberUsers":0,
        }
    }
    // Test Items
    const items =
    [
        {
            itemTakenDate: "2023-12-10",
            itemTaken: true,
            itemUptainer: "-NbzQlf95xoexGIlcIpX",
            itemproduct: "-NbzQlfHewkweUD_k_Ym",
        },
        {
            itemTakenDate: "2023-12-10",
            itemTaken: true,
            itemUptainer: "-NbzQlf95xoexGIlcIpY",
            itemproduct: "-NbzQlfCJqUDW4jtThUc",
        },
        {
            itemTakenDate: "2023-12-09",
            itemTaken: true,
            itemUptainer: "-NbzQlf95xoexGIlcIpY",
            itemproduct: "-NbzQlfCJqUDW4jtThUc",
        },
        {
            itemTakenDate: "2023-11-06",
            itemTaken: true,
            itemUptainer: "-NbzQlf95xoexGIlcIpY",
            itemproduct: "-NbzQlfCJqUDW4jtThUc",
        },
        {
            itemTakenDate: "2023-11-06",
            itemTaken: true,
            itemUptainer: "-NbzQlf95xoexGIlcIpX",
            itemproduct: "-NbzQlfHewkweUD_k_Ym",
        },
        {
            itemTakenDate: "2023-09-06",
            itemTaken: true,
            itemUptainer: "-NbzQlf95xoexGIlcIpX",
            itemproduct: "-NbzQlfHewkweUD_k_Ym",
        },            
        {
            itemTakenDate: "2023-07-06",
            itemTaken: true,
            itemUptainer: "-NbzQlf95xoexGIlcIpX",
            itemproduct: "-NbzQlfHewkweUD_k_Ym",
        },
        {
            itemTakenDate: "2023-07-06",
            itemTaken: true,
            itemUptainer: "-NbzQlf95xoexGIlcIpY",
            itemproduct: "-NbzQlfCJqUDW4jtThUc",
        },
        {
            itemTakenDate: "2023-07-06",
            itemTaken: true,
            itemUptainer: "-NbzQlf95xoexGIlcIpY",
            itemproduct: "-NbzQlfCJqUDW4jtThUc",
        },
        {
            itemTakenDate: "2023-07-06",
            itemTaken: true,
            itemUptainer: "-NbzQlf95xoexGIlcIpY",
            itemproduct: "-NbzQlfCJqUDW4jtThUc",
        },
    ]

    // Create variables for counting
    let allNumberTakenItems = 0;
    let todayNumberTakenItems = 0;
    let yesterdayNumberTakenItems = 0;

    //Date today
    const today = new Date();
    
    //Date yersterday
    const yesterday = new Date(today - 86400000);
    
    //Create a dictionary for counting reused items by month
    const allTakenItemsMonth ={};
    
    for (let i=0; i < items.length; i ++) {
        //Counting how many times Uptainer was used for putting item
        if(allUptainersStat[items[i]["itemUptainer"]]){
            allUptainersStat[items[i]["itemUptainer"]]["numberUsers"] += 1;
        }
        //Filter items, which was taken
        if (items[i].itemTaken == true) {
            //Counting how many times Uptainer was used for taking item
            if(allUptainersStat[items[i]["itemUptainer"]]){
                allUptainersStat[items[i]["itemUptainer"]]["numberUsers"] += 1;
                allUptainersStat[items[i]["itemUptainer"]]["itemsReused"] += 1;
                //Getting info about co2Footprint this item
                const productInfo = await getProductById(items[i]["itemproduct"]);
                allUptainersStat[items[i]["itemUptainer"]]["savedCO2"] += productInfo["co2Footprint"];
            }

            allNumberTakenItems += 1;
            //Filter reused items, which have itemTakenDate. itemTakenDate should has format "YYYY-MM-DD" (like itemTakenDate: "2023-12-06")
            if (items[i].itemTakenDate){
                const itemTakenDate = new Date(items[i].itemTakenDate);
                if (itemTakenDate.toLocaleDateString() == today.toLocaleDateString()) {
                    todayNumberTakenItems += 1
                }
                if (itemTakenDate.toLocaleDateString() == yesterday.toLocaleDateString()) {
                    yesterdayNumberTakenItems += 1
                }
                if (allTakenItemsMonth[itemTakenDate.getFullYear().toString() + "-" + (itemTakenDate.getMonth() + 1).toString()]) {
                allTakenItemsMonth[itemTakenDate.getFullYear().toString() + "-" + (itemTakenDate.getMonth() + 1).toString()] += 1
                }
                else{
                    allTakenItemsMonth[itemTakenDate.getFullYear().toString() + "-" + (itemTakenDate.getMonth() + 1).toString()] = 1
                }
                
            }

        }
    }
    //Definition of the most popular Uptainer
    const bestUptainerId = Object.entries(allUptainersStat).reduce((acc,curr) => acc[1]["numberUsers"] > curr[1]["numberUsers"] ? acc : curr)[0];
    const bestUptainer = allUptainersStat[bestUptainerId];

    //Create result after counting reused items
    result = {
        allTakenItems: allNumberTakenItems,
        todayTakenItems: todayNumberTakenItems,
        yesterdayTakenItems: yesterdayNumberTakenItems,
        allTakenItemsMonth: allTakenItemsMonth, //{"2023-Dec": 1, "2023-Jul": 1, "2023-Nov": 1, "2023-Sep": 1}
        bestUptainer: bestUptainer,
    }
    //Print for checking
    //console.log(result);
   
    return result
    }
  
    useEffect(() => {async function fetchData(){
    const result = await allItems();
    setData(result)         
    }
    fetchData()}, []);

  const handlePress = () => {
    navigation.goBack();
  };
  const [activeButton, setActiveButton] = useState("main"); // 'main' or 'secondary'

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
              </View>
              <View style={[{ height: 285 }]}>
                <ChartForStats value={data["allTakenItemsMonth"]}/>
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
                  <Text style={[styles.paragraph_text, { marginLeft: 5 }]}>
                    {" "}
                    {t("StatsPage.kgCO2", currentLanguage)}
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
                    {" "}
                    {t("StatsPage.Amount", currentLanguage)}{" "}
                  </Text>
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
                <VisitedUptainerStat navigation={navigation} value={data["bestUptainer"]}/>
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
