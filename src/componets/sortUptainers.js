import { getAllUptainers } from "../utils/Repo";
import React, { useEffect, useState } from "react";
import { BoxLink } from "../styles/BoxLink";
import * as Location from "expo-location";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import Uptainer from "./Uptainer";
import GlobalStyle from "../styles/GlobalStyle";
import ScrollViewComponent from "./atoms/ScrollViewComponent";
import QuizPoll from "./atoms/QuizPoll";
import { useLanguage, t } from "../Languages/LanguageHandler";
import { sortUptainersByDistance } from "../utils/uptainersUtils";
import { Primarycolor1 } from "../styles/Stylesheet";
import LoadingScreen from "./LoadingScreen";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import OnHideView from "./atoms/OnHideView";
import { Screens } from "../utils/ScreenPaths";

const SortUptainers = ({ navigation, noProductFound }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [sortedUptainers, setSortedUptainers] = useState([]);
  const [uptainersList, setUptainerList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { currentLanguage, setLanguage } = useLanguage();
  const [loading, setLoading] = useState(true)

  const finishLoading = async () => setLoading(false)

  const fetchData = async () => {
    try {
      // Fetch the list of uptainers
      const uptainerList = await getAllUptainers();
      setUptainerList(uptainerList);
      setRefreshing(false);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  //fetchData();// Fetch data when component mounts
  //}, []);

  // Fetch user location and Uptainers list from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Request user's location permissions and get their current position
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
          });
          setUserLocation(location.coords);
        } else {
          console.log("Permission to access location was denied");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData(); // Fetch data when component mounts
  }, []);

  // Whenever the userLocation or Uptainers list changes, update the sortedUptainers state
  useEffect(() => {
    if (userLocation) {
      const sortedList = sortUptainersByDistance(userLocation, uptainersList);
      setSortedUptainers(sortedList);
    }
  }, [userLocation, uptainersList]);

  // Function to render list of Uptainers
  const renderUptainers = () => {
    // Create a new array without the first element
    const displayedUptainers = userLocation
      ? sortedUptainers.slice(1)
      : uptainersList.slice(1);

    // Render Uptainer components
    return displayedUptainers.map((item) => (
      <Uptainer key={item.uptainerId} uptainerData={item} userLocation={userLocation} />
    ));
  };

  // Navigation function to info page
  const navigatetoinfo = () => {
    // todo all the below data should get from server
    // Navigate to InfoPage with predefined content
    navigation.navigate(Screens.ARTICLE_PAGE, {
      title: "Five Uptainers are set to open in Kobenhavn area this year",
      content: [
        "Have you alwavs wanted to blog but are without a clue when it comes to doing so? Thispiece will provide basic" +
          " blogging information that can really help distinguish your blog frorthe competition, There is no reason to be scared!" +
          " Thanks to today's expanding technologyblogging is getting   easier all the time, You can pick up some great advice " +
          "from this articlewhich will prepare you to start blogging with confidence and effectivenest.",
        "Start your mailing list right away. The sooner you begin, the more time you wrill have to growyour list." +
          "This list will help you increase your revenue as time goes on. It is a serious mistak.to delay starting" +
          " your mailing list.",
        "Stay on top of what your competition is up to and then ensure you're always the " +
          "leader of thepack They are your rivals so you must follow their blogs, as well Remember, yourcompetitors are probabhy looking",
        "Stay on top of what your competition is up to and then ensure you're always the " +
          "leader of thepack They are your rivals so you must follow their blogs, as well Remember, yourcompetitors are probabhy looking",
        "Stay on top of what your competition is up to and then ensure you're always the " +
          "leader of thepack They are your rivals so you must follow their blogs, as well Remember, yourcompetitors are probabhy looking",
      ],
    });
  };

  //  Quiz and Poll mockup data, that should come from backend in the future
  const PollData = {
    question: t("PollQuestions.Poll1Question1", currentLanguage),
    type: "poll",
    options: [
      { text: "A) 0 ", responses: 15 },
      { text: "B) 1-3 ", responses: 30 },
      { text: "C) 4-6 ", responses: 3 },
      { text: "D) 7+ ", responses: 55 },
    ],
  };

  const QuizData = {
    question: t("QuizQuestions.Quiz1Question1", currentLanguage),
    type: "quiz",
    options: [
      {
        text: t("QuizQuestions.Quiz1Option1", currentLanguage),
        isCorrect: false,
      },
      {
        text: t("QuizQuestions.Quiz1Option2", currentLanguage),
        isCorrect: false,
      },
      {
        text: t("QuizQuestions.Quiz1Option3", currentLanguage),
        isCorrect: true,
      },
    ],
  };
  const renderError = () => <Text style={style.noProductFoundErr}>{t("SearchField.notProductFound", currentLanguage)}</Text>
  // Determine the list of uptainers to use for rendering
  const uptainerList = userLocation ? sortedUptainers : uptainersList;
  return (
    //I added the Scrollview component from Home.js due to it is necceseery for make the refresh on the page
    <View style={{ marginTop: 15 }}>
      {loading && 
      <View style={{width: windowWidth, height: windowHeight - 145, alignSelf: 'center', }}>
          <LoadingScreen isLoaderShow={loading}/>
      </View>}
      <ScrollViewComponent refreshing={refreshing} onRefresh={onRefresh}>
        {/* Display the list of sorted uptainers using the Uptainer component */}
        {noProductFound && renderError()}
        <OnHideView hide={noProductFound}>

          {uptainerList[0]  && (
            <Uptainer
            key={uptainerList[0].uptainerId}
            uptainerData={uptainerList[0]}
            userLocation={userLocation}
            finishLoading={finishLoading}
            />
            ) 
          }
        </OnHideView>
        {/* Display BoxLink component */}
        <BoxLink
          msg="Hvordan funger UPDROPP?"
          onPress={navigatetoinfo}
          style={GlobalStyle.BodyWrapper}
        />

        {/* Display the QuizComponent */}
        <QuizPoll data={PollData} />
        <QuizPoll data={QuizData} />
        <OnHideView hide={noProductFound}>

          {renderUptainers()}
        </OnHideView>
      </ScrollViewComponent>
    </View>
  );
};

const style = StyleSheet.create({
  noProductFoundErr: {
    fontSize: 16,
    fontWeight: '500',
    color: Primarycolor1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 20,
    zIndex: 1,
    paddingLeft: 5,
    width: '100%',

}
})
export default SortUptainers;
