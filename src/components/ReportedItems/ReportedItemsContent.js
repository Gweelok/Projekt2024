import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  View,
  StyleSheet,
  ScrollView,
  Text,
  RefreshControl,
  Image,
} from "react-native";

import ScrollViewComponent from "../atoms/ScrollViewComponent";

import UptainerContent from "../Uptainer/UptainerContent";
import UptainerInfo from "../Uptainer/UptainerInfo";
import TextLink from "../molecules/TextLink";

import { LoaderContext } from "../molecules/LoaderContext";

import {
  styles,
  Buttons,
  Backgroundstyle,
  Primarycolor1,
} from "../../styles/styleSheet";
import GlobalStyle from "../../styles/GlobalStyle";

import {
  getItemsInUptainer,
  getItemById,
  getProductById,
  getUptainerById,
} from "../../utils/Repo";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { set } from "firebase/database";

const ReportedItemsContent = ({ location }) => {
  const [reportedItemsList, setreportedItemsList] = useState([]);
  const [imgUrlList, setImgUrlList] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoaderContext);
 

  async function fetchReportedItems() {
    const reportedItems = await getItemsInUptainer(location.uptainerId);
    setreportedItemsList(reportedItems);
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

  return (
    <View style={style.container}>
      {isLoading && <LoadingScreen isLoaderShow={isLoading} />}
      <UptainerInfo location={location} />
      <ScrollViewComponent>
        {reportedItemsList.map((item, index) => {
          return (
            <View key={index} style={style.list}>
              <Text>{item.name}</Text>
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri: item.imgUrl,
                }}
              />
            </View>
          );
        })}
      </ScrollViewComponent>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  list: {
    height: 300,
  },
  linkText: {
    textAlign: "center",
  },
});
export default ReportedItemsContent;
