
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
import { getAllItems, getAllUptainers, getProductById, getCurrentUser, getDraftFromUser} from "../utils/Repo";

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
    const [refreshing, setRefresh] = useState(false);
    const onRefresh = () =>{
      
      setRefresh(true)
      setTimeout(()=>{ setRefresh(false)}, 1000)
    }

    const { currentLanguage } = useLanguage();
    let [data, setData] = useState({
        allTakenItems: 0,
        todayTakenItems: 0,
        yesterdayTakenItems: 0,
        allTakenItemsMonth: {},
        bestUptainers: [],
        });

    const calculateStatistic = async () => {
    
    // Load all items from database
    //const items = await getAllItems();

    // Load current user
    const userCurrent  = await getCurrentUser()
    // Load all Uptainers from database
    const allUptainers = await getAllUptainers();
    const allUptainersStat = {}
    //Create all Uptainers in allUptainersStat
    for (let i = 0; i < allUptainers.length; i ++ ){
        allUptainersStat[allUptainers[i]["uptainerId"]] = {
            uptainerCity: allUptainers[i]["uptainerCity"],
            uptainerName: allUptainers[i]["uptainerName"],
            uptainerStreet: allUptainers[i]["uptainerStreet"],
            uptainerId: allUptainers[i]["uptainerId"], 
            itemsReused: 0,
            savedCO2:0,
            numberUsers:0,
            uptainerDescription: allUptainers[i]["uptainerDescription"],
            uptainerImage: allUptainers[i]["uptainerImage"],
            uptainerLatitude: allUptainers[i]["uptainerLatitude"],
            uptainerLongitude: allUptainers[i]["uptainerLongitude"],
            uptainerQR: allUptainers[i]["uptainerQR"],
            uptainerZip: allUptainers[i]["uptainerZip"],
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
            itemUser: "lywlgHhkOcXEa53j9jPADYoWmrO2",
            itemTakenUser: ""
        },
        {
            itemTakenDate: "2023-12-10",
            itemTaken: true,
            itemUptainer: "-NbzQlf95xoexGIlcIpY",
            itemproduct: "-NbzQlfCJqUDW4jtThUc",
            itemUser: "lywlgHhkOcXEa53j9jPADYoWmrO2",
            itemTakenUser: "lywlgHhkOcXEa53j9jPADYoWmrO2"
        },
        {
            itemTakenDate: "2023-12-09",
            itemTaken: true,
            itemUptainer: "-NbzQlf95xoexGIlcIpY",
            itemproduct: "-NbzQlfCJqUDW4jtThUc",
            itemUser: "",
            itemTakenUser: "lywlgHhkOcXEa53j9jPADYoWmrO2"
        },
        {
            itemTakenDate: "2023-11-06",
            itemTaken: true,
            itemUptainer: "-NbzQlf95xoexGIlcIpY",
            itemproduct: "-NbzQlfCJqUDW4jtThUc",
            itemUser: "",
            itemTakenUser: "lywlgHhkOcXEa53j9jPADYoWmrO2"
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
          if(items[i]["itemUser"] == userCurrent["id"]){
            
            allUptainersStat[items[i]["itemUptainer"]]["numberUsers"] += 1;
        }}
        //Filter items, which was taken
        if (items[i].itemTaken == true) {
            //Counting how many times Uptainer was used for taking item
            if(allUptainersStat[items[i]["itemUptainer"]]){
              if(items[i]["itemTakenUser"] == userCurrent["id"]){
                allUptainersStat[items[i]["itemUptainer"]]["numberUsers"] += 1;
              }
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
    //Definition of the most popular Uptainers for current user
    //Sorting by number of users
    const sortedUptainers = Object.values(allUptainersStat).sort(function(uptainer1, uptainer2){
      return uptainer2["numberUsers"] - uptainer1["numberUsers"]
    })
    //Filtering uptainers with number of users > 0
    const sortedFiltredUptainers = sortedUptainers.filter(function(uptainer){
      return uptainer["numberUsers"] > 0
    })

    //Create result after counting reused items
    result = {
        allTakenItems: allNumberTakenItems,
        todayTakenItems: todayNumberTakenItems,
        yesterdayTakenItems: yesterdayNumberTakenItems,
        allTakenItemsMonth: allTakenItemsMonth, //{"2023-12": 1, "2023-07": 1, "2023-11": 1, "2023-09": 1}
        bestUptainers: sortedFiltredUptainers,
    }
    //Print for checking
    console.log(result);
   
    return result
    }
  
    useEffect(() => {async function fetchData(){
    const result = await calculateStatistic();
    setData(result)         
    }
    fetchData()}, []);
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
        <ScrollViewComponent refreshing={refreshing} onRefresh={onRefresh}>
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
                <ChartForStats value={data["allTakenItemsMonth"]} refreshing={refreshing}/>
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
                <VisitedUptainerStat navigation={navigation} value={data["bestUptainers"].slice(0, 1)}/>
              </View>
            </View>
          ) : (
            <YourStats value={data["bestUptainers"].slice(0, 3)}/>
          )}
        </ScrollViewComponent>
      </SafeAreaView>
      <Navigationbar navigation={navigation} />
    </View>
  );
};

export default Stat;
