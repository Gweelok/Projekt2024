import {
  View,
  Text,
  SafeAreaView,
  Button,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import {Backgroundstyle, Buttons, Primarycolor1, Primarycolor3} from "../styles/Stylesheet";
import Navigationbar from "../componets/Navigationbar";
import React, {useState} from "react";
import {t, useLanguage} from "../Languages/LanguageHandler";
import CategoryDropdown from './form/CategoryDropdown';
import CustomInput from "../componets/atoms/CustomInput";
import ImageUpload from "./form/ImageUpload";
import ProductDropdown from './form/ProductDropdown';
import BrandDropdown from './form/BrandDropdown';
import ModelDropdown from './form/ModelDropdown';
import ConditionDropdown from "./form/ConditionDropdown";

const Add = ({navigation}) => {
  const {currentLanguage, setLanguage} = useLanguage();
  const [category, setCategory] = useState(null);
  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  // you can fetch the final result of condition field through here
  const [condition, setCondition] = useState(null);

  return (
    <View>
      <ScrollView>
        <View style={{
          paddingTop: 50,
          flex: 1,
          backgroundColor: Primarycolor3,
          marginHorizontal: 30,
        }}>

          <Text style={AddStyles.header}>
            {t("UpdroppForm.title", currentLanguage)}
          </Text>

          {/* 1. replace following View with your own component.
              2. put all the components in the folder screens/form/, which is designed to put all the files related to this page.*/}

          <View style={[{marginBottom: 20}]}>
            <CustomInput showStar={false}>
              <ImageUpload/>
            </CustomInput>
          </View>

          <CategoryDropdown onCategorySelect={setCategory}/>

          <ProductDropdown categorySelected={!!category} onProductSelect={setProduct}/>

          <BrandDropdown productSelected={!!product} onBrandSelect={setBrand}/>

          <ModelDropdown brandSelected={!!brand}/>

          <ConditionDropdown onConditionSelect={setCondition}/>

          <View style={[AddStyles.marginView, {marginBottom: 20}]}>
            <Text>Description field</Text>
          </View>

          <View style={{marginBottom: 20}}>
            <Text style={[AddStyles.informativeText]}>
              {t("UpdroppForm.informativeText", currentLanguage)}
            </Text>
          </View>

          <View style={{marginBottom: 20}}>
            <Pressable
              onPress={() => {
                navigation.navigate("QRScanner");
              }}
              style={[Buttons.main_button, {borderWidth: 1, width: "100%"}]}
            >
              <Text style={Buttons.main_buttonText}>
                {t("UpdroppForm.scanButton", currentLanguage)}
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={[
              Buttons.secondary_button,
              {borderWidth: 2, width: "100%"},
            ]}
            onPress={() => {
              navigation.navigate("ProductSaved");
            }}
          >
            <Text style={Buttons.secondary_buttonText}>
              {t("UpdroppForm.scanLaterButton", currentLanguage)}
            </Text>
          </Pressable>

          <View style={{marginBottom: 120}}/>
        </View>
      </ScrollView>
      <Navigationbar navigation={navigation}/>
    </View>
  );
};

const AddStyles = StyleSheet.create({
  header: {
    fontFamily: "space-grotesk-bold",
    fontSize: 35,
    color: Primarycolor1,
    fontWeight: "bold",
    marginBottom: 20,
  },
  informativeText: {
    fontSize: 15,
    color: Primarycolor1,
    fontWeight: "500",
  },
});

export default Add;
