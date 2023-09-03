import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { HeaderText, Primarycolor1 } from "../../styles/Stylesheet";
import { useNavigation } from "@react-navigation/native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import { Ionicons } from "@expo/vector-icons";
import { GoBackButton } from "../../styles/GoBackButton";
import DraftCard from "../../componets/DraftCard";
import { ScrollView } from "react-native";

const dummyData = [
  {
    id: 1,
    image: require("../../../assets/images/cph.jpg"),
    category: "Books",
    description: "dhhjddhkhdkdhkdknk",
    brand: "Casio",
    condition: "Very Good",
  },
  {
    id: 2,
    image: require("../../../assets/images/cph.jpg"),
    category: "Books",
    description: "dhhjddhkhdkdhkdknk",
    brand: "Apple",
    model: "iPhone",
    condition: "Good",
  },
  {
    id: 3,
    image: require("../../../assets/images/cph.jpg"),
    category: "Books",
    description: "dhhjddhkhdkdhkdknk",
    brand: "Casio",
    condition: "Very Good",
  },
];
const MyDrafts = () => {
  const navigation = useNavigation();
  const { currentLanguage } = useLanguage();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={36}
            style={DraftStyle.arrow}
          />
        </TouchableOpacity>
        <Text style={[HeaderText.Header]}>
          {t("MyDraftsScreen.Header", currentLanguage)}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {dummyData.map((cur, i) => (
          <DraftCard
            key={i}
            props={cur}
            onPress={() => {
              navigation.navigate("QRScanner");
            }}
            onCancelPress={() => {
              console.log("pressed");
              Alert.alert(
                `${t("MyDraftsScreen.closeButtonTitle", currentLanguage)}`,
                `${t("MyDraftsScreen.closeButtonAsking", currentLanguage)}`,
                [
                  {
                    text: `${t(
                      "MyDraftsScreen.closeButtonAnswerNo",
                      currentLanguage
                    )}`,
                    //onPress: () => console.log('Cancel Pressed'),
                    style: "cancel",
                  },
                  {
                    text: `${t(
                      "MyDraftsScreen.closeButtonAnswerYes",
                      currentLanguage
                    )}`,
                  },
                ]
              );
            }}
          />
        ))}
        <View style={[{ marginTop: 50, minHeight: 200, marginBottom: 100 }]} />
      </ScrollView>
    </View>
  );
};

export default MyDrafts;

const DraftStyle = StyleSheet.create({
  arrow: {
    marginTop: 15,
    height: 42,
    width: 42,
    color: "white",
    marginLeft: 30,
    backgroundColor: Primarycolor1,
  },
});
