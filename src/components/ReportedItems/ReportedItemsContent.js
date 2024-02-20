import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";

import UptainerInfo from "../atoms/UptainerInfo";

import LoadingScreen from "../../screens/LoadingScreen";
import { LoaderContext } from "../molecules/LoaderContext";
import NavgationButton from "../atoms/NavigationButton";

import { getImage, getItemByUptainerId } from "../../utils/Repo";

import { windowHeight, windowWidth } from "../../utils/Dimensions";
import { Buttons, styles } from "../../styles/styleSheet";

const ReportedItemsContent = ({ location }) => {
  const [reportedItemsList, setReportedItemsList] = useState([]);
  const [imgUrlList, setImgUrlList] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  const solvedButtonText = "Task Solved";
  const navigationPath = "ServiceAdminMain";

  //Right now reported items logic is not implemented.
  //So the items that are fetched are all the items in the uptainer
  async function fetchReportedItems() {
    const reportedItems = await getItemByUptainerId(location.uptainerId);
    setReportedItemsList(reportedItems);

    const imgUrlPromises = reportedItems.map(async (item) => {
      const imageUrl = await getImage(item.itemImage);
      return { id: item.itemId, url: imageUrl };
    });

    const imgUrlList = await Promise.all(imgUrlPromises);
    setImgUrlList(imgUrlList);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchReportedItems()
      .catch((error) => {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "An error occurred while fetching data.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onPressMarkSolved = () => {
    //Not implemented yet
  };

  const renderReportedItem = ({ item }) => (
    <View>
      <Image
        source={{ uri: item.url }}
        style={{ width: 100, height: 100, margin: 20, marginBottom: 10 }}
      />
    </View>
  );

  return (
    <View style={style.container}>
      {isLoading && <LoadingScreen isLoaderShow={isLoading} />}

      {location && <UptainerInfo location={location} />}

      {!isLoading && (
        <View style={style.list}>
          <FlatList
            data={imgUrlList}
            extraData={reportedItemsList}
            renderItem={renderReportedItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        </View>
      )}

      {/* Not implemented yet. Is put just to see the style of page structure. 
      Once the page is implemented, button styling needs to be updated.*/}
      <View>
        <NavgationButton
          disabled={true}
          path={navigationPath}
          text={solvedButtonText}
          param={location}
          buttonStyle={Buttons.main_button}
          textStyle={Buttons.main_buttonText}
          callback={onPressMarkSolved}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    top: "5%",
  },
  list: {
    height: windowHeight * 0.6, //Needs to be updated once the whole page is implemented.
    width: windowWidth,
    alignItems: "center",
  },
});
export default ReportedItemsContent;
