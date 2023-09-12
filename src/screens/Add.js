import {
  View,
  Text,
  SafeAreaView,
  Button,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert
} from "react-native";
import {Backgroundstyle, Buttons, Primarycolor1, Primarycolor3} from "../styles/Stylesheet";
import Navigationbar from "../componets/Navigationbar";
import React, {useState} from "react";
import {t, useLanguage} from "../Languages/LanguageHandler";
import DescriptionField from "./form/DescriptionField";
import CategoryDropdown from './form/CategoryDropdown';
import CustomInput from "../componets/atoms/CustomInput";
import ImageUpload from "./form/ImageUpload";
import ProductDropdown from './form/ProductDropdown';
import BrandDropdown from './form/BrandDropdown';
import ModelDropdown from './form/ModelDropdown';
import ConditionDropdown from "./form/ConditionDropdown";
import { BadgeContext } from "./form/BadgeContext";
import  { firebaseApp, firebaseDB } from '../utils/Firebase';


const ProductDetailScreen = ({ route }) => {
  const { productId, userId } = route.params;

  const connectProductToUser = async () => {
    try {
      // Add a reference to the user's document
      const userDocRef = firebaseDB.collection('users').doc(userId);

      // Add the product ID to the user's document
      await userDocRef.update({
        products: firebaseApp.firestore.FieldValue.arrayUnion(productId),
      });

      Alert.alert('Success', 'Product connected to user successfully');
    } catch (error) {
      console.error('Error connecting product to user:', error);
      Alert.alert('Error', 'Failed to connect product to user');
    }
  };

  return (
    <View>
      {/* Product details */}
      {/* Display product details here */}
      <Button title="Connect Product to User" onPress={connectProductToUser} />
    </View>
  );
};

const Add = ({navigation}) => {
  const {currentLanguage, setLanguage} = useLanguage();
  const [category, setCategory] = useState(null);
  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  // you can fetch the final result of condition field through here
  const [condition, setCondition] = useState(null);
  const { badgeCount, setBadgeCount } = React.useContext(BadgeContext);

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

          <View style={ {marginBottom: 20}}>
            <CustomInput showStar={false}>
            <DescriptionField />
            </CustomInput>
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
              //createItemDraft("productId", "brandId", "modelId", "categoryId", "itemImage", "itemDescription", "itemCondition", "uptainerId", "userId")
              navigation.navigate("ProductSaved");
              setBadgeCount(prevCount => prevCount + 1);
            }}
          >
            <Text style={Buttons.secondary_buttonText}>
              {t("UpdroppForm.scanLaterButton", currentLanguage)}
            </Text>
          </Pressable>

          <View style={{marginBottom: 120}}/>
        </View>
      </ScrollView>
      <Navigationbar navigation={navigation} badgeCount={badgeCount}/>
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
