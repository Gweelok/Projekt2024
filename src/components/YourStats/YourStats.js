import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { t, useLanguage } from "../../languages/LanguageHandler";
import { useNavigation } from "@react-navigation/native";
//Style
import yourStatsStyles from "./yourStatsStyles";
//Icons
import LightbulbIcon from "../svg-components/LightbulbIcon";
import Icon from "react-native-vector-icons/FontAwesome"; // for Facebook
import Icon2 from "react-native-vector-icons/FontAwesome";
//Components
import YourVisitedUptainerStats from "../Stats/YourVisitedUptainerStats/YourVisitedUptainerStats";
import ArticleSlider from "../ArticleSlider/ArticleSlider";
import GreenBox from "../green-box/GreenBox";
//Utils
import { convertKgToTons } from "../../utils/uptainersUtils";
import Screens from "../../utils/ScreenPaths";

const YourStats = (props) => {
  const { currentLanguage } = useLanguage();
  const navigation = useNavigation();
  const co2Data = props.userco2Data;
  const co2Equivalent = props.userco2Equivalent;
  const myMostVisitedUptainers = props.myMostVisitedUptainers;

  return (
    <View>
      <View style={yourStatsStyles.amountReusedContainer}>
        <Text style={yourStatsStyles.amountReusedText}>
          {t("StatsPage.AmountReduced", currentLanguage)}
        </Text>
      </View>

      <View style={yourStatsStyles.itemsContainer}>
        <View style={yourStatsStyles.itemsDonatedContainer}>
          <Text style={yourStatsStyles.itemsText}>
            {t("StatsPage.ItemsDonated", currentLanguage)}
          </Text>

          <Text style={yourStatsStyles.itemsCo2Text}>
            {co2Data.userDonatedItems}
          </Text>
        </View>

        <View style={yourStatsStyles.itemsCollectedContainer}>
          <Text style={yourStatsStyles.itemsText}>
            {t("StatsPage.ItemsCollected", currentLanguage)}
          </Text>

          <Text style={yourStatsStyles.itemsCo2Text}>
            {co2Data.userCollectedItems}
          </Text>
        </View>
      </View>
      {/*overview link*/}
      <View style={yourStatsStyles.overviewLinkContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screens.MY_DRAFTS)}
        >
          <Text style={yourStatsStyles.overviewLink}>
            {t("StatsPage.Overview", currentLanguage)}
          </Text>
        </TouchableOpacity>
      </View>

      {/*amount c02*/}
      <View style={yourStatsStyles.amountCo2Container}>
        <Text style={yourStatsStyles.amountCo2Text}>
          {t("StatsPage.AmountCO2", currentLanguage)}
        </Text>
      </View>

      {/*display amount*/}
      <View style={yourStatsStyles.greenBoxContainer}>
        <GreenBox
          headerStyle={yourStatsStyles.greenBoxHeader}
          data={convertKgToTons(co2Data.totalC02Saved)}
        />
      </View>

      {/*Equivalent container 1*/}
      <View style={yourStatsStyles.equivalentContainerTop}>
        <LightbulbIcon />
        {/*Equivalent text*/}
        <Text style={yourStatsStyles.equivalentText}>
          {convertKgToTons(co2Equivalent.co2_pers) +
            " " +
            t("StatsPage.CO2Equivalent", currentLanguage) +
            ": " +
            co2Equivalent.personalEquivalent +
            " " +
            t("StatsPage.Fact_equavalent", currentLanguage)}
        </Text>
      </View>

      {/*Equivalent container 1*/}
      <View style={yourStatsStyles.equivalentContainerBottom}>
        <LightbulbIcon />
        {/*Equivalent text*/}
        <Text style={yourStatsStyles.equivalentText}>
          {t("StatsPage.CO2AmountBefore", currentLanguage) +
            " " +
            convertKgToTons(co2Data.totalC02Saved) +
            " " +
            t("StatsPage.CO2Amount", currentLanguage) +
            ": " +
            co2Equivalent.totalEquivalent +
            " " +
            t("StatsPage.Fact_equavalent", currentLanguage)}
        </Text>
      </View>

      {/*_____________________Break_______________________________________*/}
      {/*Socails field*/}

      <View style={yourStatsStyles.socialsContainer}>
        {/*fb container*/}
        <View style={yourStatsStyles.socialField}>
          {/*fb button*/}
          <View style={yourStatsStyles.socialButton}>
            <TouchableOpacity>
              {/*fb icon*/}
              <Icon name="facebook" style={yourStatsStyles.socialIcon} />
            </TouchableOpacity>
          </View>
        </View>
        {/*insta container*/}
        <View style={yourStatsStyles.socialField}>
          {/*insta button*/}
          <View style={yourStatsStyles.socialButton}>
            {/*insta icon*/}
            <TouchableOpacity>
              <Icon2 name="instagram" style={yourStatsStyles.socialIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/*socialTextField*/}
      <View style={yourStatsStyles.socialTextField}>
        {/*social  bottom text*/}
        <Text style={yourStatsStyles.socialText}>
          {t("StatsPage.Social", currentLanguage)}{" "}
        </Text>
      </View>

      {/*SPACER*/}
      <View style={yourStatsStyles.divider} />

      {myMostVisitedUptainers.length != 0 && (
        <View>
          {/*mostvisitedText*/}
          <Text style={yourStatsStyles.uptainer}>
            {t("StatsPage.MyMostVisitedUptainers", currentLanguage)}
          </Text>

          {myMostVisitedUptainers.map((uptainer, index) => {
            return (
              <View key={index}>
                <YourVisitedUptainerStats
                  value={uptainer}
                ></YourVisitedUptainerStats>
              </View>
            );
          })}
        </View>
      )}
      {/*getInspired*/}
      <View style={yourStatsStyles.getInspired}>
        {/*getInspired text*/}
        <Text style={yourStatsStyles.getInspiredText}>
          {t("StatsPage.GetInspired", currentLanguage)}
        </Text>
      </View>

      <ArticleSlider />
    </View>
  );
};

export default YourStats;
