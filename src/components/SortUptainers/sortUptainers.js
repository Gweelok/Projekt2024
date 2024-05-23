import { getAllUptainers } from "../../utils/Repo/Uptainers";
import React, { useContext, useEffect, useState } from "react";
import { BoxLink } from "../box-link/BoxLink";
import * as Location from "expo-location";
import { View, Text } from "react-native";
import Uptainer from "../Uptainer/Uptainer";
import ScrollViewComponent from "../ScrollViewComponent/ScrollViewComponent";
import QuizPoll from "../QuizPoll/QuizPoll";
import { useLanguage, t } from "../../languages/LanguageHandler";
import { sortUptainersByDistance } from "../../utils/uptainersUtils";
import OnHideView from "../OnHideView/OnHideView";
import Screens from "../../utils/ScreenPaths";
import { LoaderContext } from "../../contexts/LoaderContext/LoaderContext";
import sortUptainersStyles from "./sortUptainerStyles";
import { useNavigation } from "@react-navigation/native";
import { getItemsDetails, getItemsInUptainer } from "../../utils/Repo/Items";

const SortUptainers = ({ noProductFound }) => {
  const navigation = useNavigation()

  const [userLocation, setUserLocation] = useState(null);
  const [sortedUptainers, setSortedUptainers] = useState([]);
  const [uptainersList, setUptainerList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { currentLanguage, setLanguage } = useLanguage();
  const { isLoading, setIsLoading } = useContext(LoaderContext);


  const fetchData = async () => {
    try {
      // Fetch the list of uptainers
      let uptainerList = await getAllUptainers();

      uptainerList = await Promise.all(uptainerList.map(async (uptainer) => {
        const items = await getItemsInUptainer(uptainer.uptainerId);
        const updatedData = await getItemsDetails(items);

        return ({
          ...uptainer,
          items: updatedData
        })
      }))


      setUptainerList(uptainerList);
      setRefreshing(false);
      setIsLoading(false)
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
    setIsLoading(true);
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
    return displayedUptainers.map((uptainer) => (
      <Uptainer
        key={uptainer.uptainerId}
        uptainerData={uptainer}
        userLocation={userLocation}
        items={uptainer.items}
      />
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
  const renderError = () => (
    <Text style={sortUptainersStyles.noProductFoundErr}>
      {t("SearchField.notProductFound", currentLanguage)}
    </Text>
  );
  // Determine the list of uptainers to use for rendering
  const uptainerList = userLocation ? sortedUptainers : uptainersList;
  return (
    //I added the Scrollview component from Home.js due to it is necceseery for make the refresh on the page
    <View style={sortUptainersStyles.container}>
      {isLoading && <View style={sortUptainersStyles.loadingContainer}></View>}
      <ScrollViewComponent refreshing={refreshing} onRefresh={onRefresh}>
        {/* Display the list of sorted uptainers using the Uptainer component */}
        {noProductFound && renderError()}
        <OnHideView hide={noProductFound}>
          {uptainerList[0] && (
            <Uptainer
              key={uptainerList[0].uptainerId}
              uptainerData={uptainerList[0]}
              userLocation={userLocation}
              items={uptainerList[0].items}
            />
          )}
        </OnHideView>
        {/* Display BoxLink component */}
        <BoxLink
          msg="Hvordan funger UPDROPP?"
          onPress={navigatetoinfo}
          style={sortUptainersStyles.wrapper}
        />

        {/* Display the QuizComponent */}
        <QuizPoll data={PollData} />
        <QuizPoll data={QuizData} />
        <OnHideView hide={noProductFound}>{renderUptainers()}</OnHideView>
      </ScrollViewComponent>
    </View>
  );
};

export default SortUptainers;