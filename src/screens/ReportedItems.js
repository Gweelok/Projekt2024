import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import UptainerContent from "../components/Uptainer/UptainerContent";
import UptainerInfo from "../components/Uptainer/UptainerInfo";
import LoadingScreen from "./LoadingScreen";
import { LoaderContext } from "../components/molecules/LoaderContext";
import Navigationbar from "../components/organisms/Navigationbar";
import ScrollViewComponent from "../components/atoms/ScrollViewComponent";
import {
  styles,
  Buttons,
  Backgroundstyle,
  Primarycolor1,
} from "../styles/styleSheet";
import GlobalStyle from "../styles/GlobalStyle";

import {
  getItemsInUptainer,
  getItemById,
  getProductById,
  getUptainerById,
} from "../utils/Repo";
import { useLanguage, t } from "../Languages/LanguageHandler";

const ReportedItems = ({ navigation, route }) => {
  const { location } = route.params;
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [itemList, setItemList] = useState([]);
  return (
    <View>
      <View style={[GlobalStyle.BodyWrapper]}>
        <UptainerInfo location={location}></UptainerInfo>
        <ScrollViewComponent>
          {/* <UptainerContent location={location}></UptainerContent> */}
        </ScrollViewComponent>
      </View>
    </View>
  );
};

export default ReportedItems;
