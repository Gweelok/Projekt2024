import {
  View,
  Text,
  SafeAreaView,
  Button,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { Backgroundstyle, Buttons, Primarycolor1 } from "../styles/Stylesheet";
import Navigationbar from "../componets/Navigationbar";
import React from "react";
import { t, useLanguage } from "../Languages/LanguageHandler";
import CategoryDropdown from './form/CategoryDropdown';

const Add = ({ navigation }) => {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <View style={Backgroundstyle.interactive_screens}>
      <ScrollView style={AddStyles.container}>
        <Text style={AddStyles.header}>
          {t("UpdroppForm.title", currentLanguage)}
        </Text>

        {/* replace following View with your own component.
                1. You should not delete the styles.marginView, if you want to add new style,
                create a new style in Stylesheet and add it after styles.marginView in the list.
                an example: style={[styles.marginView, styles.imageUploadStyle]}
                2. put all the components in the folder screens/form/, which is designed to
                put all the files related to this page.
                */}
        <View style={[AddStyles.marginView]}>
          <Text>Image upload. </Text>
        </View>
        <View style={[AddStyles.marginView,]}>
           <CategoryDropdown />
        </View>
        <View style={[AddStyles.marginView]}>
          <Text>Product dropdown</Text>
        </View>
        <View style={[AddStyles.marginView]}>
          <Text>Brand dropdown</Text>
        </View>
        <View style={[AddStyles.marginView]}>
          <Text>Model dropdown</Text>
        </View>
        <View style={[AddStyles.marginView]}>
          <Text>Condition dropdown</Text>
        </View>
        <View style={[AddStyles.marginView, { marginBottom: 20 }]}>
          <Text>Description field</Text>
        </View>
        <View style={[AddStyles.marginView, { marginBottom: 20 }]}>
          <Text style={[AddStyles.informativeText]}>
            {t("UpdroppForm.informativeText", currentLanguage)}
          </Text>
        </View>
        <View style={[AddStyles.marginView, { marginBottom: 20 }]}>
          <Pressable
            onPress={() => {
              navigation.navigate("QRScanner");
            }}
            style={[Buttons.main_button, { borderWidth: 1, width: "100%" }]}
          >
            <Text style={Buttons.main_buttonText}>
              {t("UpdroppForm.scanButton", currentLanguage)}
            </Text>
          </Pressable>
        </View>
        <View style={[AddStyles.marginView]}>
          <Pressable
            style={[
              Buttons.secondary_button,
              { borderWidth: 2, width: "100%" },
            ]}
          >
            <Text style={Buttons.secondary_buttonText}>
              {t("UpdroppForm.scanLaterButton", currentLanguage)}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <Navigationbar navigation={navigation} />
    </View>
  );
};

const AddStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  header: {
    fontFamily: "space-grotesk-bold",
    fontSize: 35,
    color: Primarycolor1,
    fontWeight: "bold",
    marginBottom: 20,
  },
  marginView: {
    marginLeft: 8,
    marginRight: 8,
  },
  informativeText: {
    fontSize: 15,
    color: Primarycolor1,
    fontWeight: "500",
  },
});

export default Add;
