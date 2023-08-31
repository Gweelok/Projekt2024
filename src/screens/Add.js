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
import React, { useState } from "react";
import { t, useLanguage } from "../Languages/LanguageHandler";
import CategoryDropdown from "./form/CategoryDropdown";
import CustomInput from "../componets/atoms/CustomInput";
import ImageUpload from "./form/ImageUpload";
import ProductDropdown from "./form/ProductDropdown";
import BrandDropdown from "./form/BrandDropdown";
import ModelDropdown from "./form/ModelDropdown";

const Add = ({ navigation }) => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [category, setCategory] = useState(null);
  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);

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

        <View style={[AddStyles.marginView, { marginBottom: 20 }]}>
          <CustomInput showStar={false}>
            <ImageUpload />
          </CustomInput>
        </View>
        <View style={[AddStyles.marginView]}>
          <CategoryDropdown onCategorySelect={setCategory} />
        </View>
        <View style={[AddStyles.marginView]}>
          <ProductDropdown
            categorySelected={!!category}
            onProductSelect={setProduct}
          />
        </View>
        <View style={[AddStyles.marginView]}>
          <BrandDropdown productSelected={!!product} onBrandSelect={setBrand} />
        </View>
        <View style={[AddStyles.marginView]}>
          <ModelDropdown brandSelected={!!brand} />
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
            onPress={() => {
              navigation.navigate("ProductSaved");
            }}
          >
            <Text style={Buttons.secondary_buttonText}>
              {t("UpdroppForm.scanLaterButton", currentLanguage)}
            </Text>
          </Pressable>
        </View>
        <View style={[{ marginTop: 50, minHeight: 200, marginBottom: 100 }]} />
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
