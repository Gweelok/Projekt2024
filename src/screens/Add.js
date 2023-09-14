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
import ScrollViewComponent from "../componets/atoms/ScrollViewComponent";


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

const Add = ({route, navigation}) => {
  const itemData = route.params?.itemData;

  // you can fetch the final result of all field through here
  const {currentLanguage, setLanguage} = useLanguage();

  const [image, setImageUrl] = useState(itemData?.image || null);
  const [category, setCategory] = useState(itemData?.category || null);
  const [product, setProduct] = useState(itemData?.product || null);
  const [brand, setBrand] = useState(itemData?.brand || null);
  const [model, setModel] = useState(itemData?.model || null);
  const [condition, setCondition] = useState(itemData?.condition || null);
  const [description, setDescription] = useState(itemData?.description || null);

  const { badgeCount, setBadgeCount } = React.useContext(BadgeContext);

  return (
    <SafeAreaView>
      <ScrollViewComponent>
        <View style={{
          paddingTop: 50,
          flex: 1,
          backgroundColor: Primarycolor3,
          marginHorizontal: 30,
        }}>

          <Text style={AddStyles.header}>
            {t("UpdroppForm.title", currentLanguage)}
          </Text>

          <View style={[{marginBottom: 10}]}>
            <ImageUpload onSelectedImage={setImageUrl} data={itemData?.image} />
          </View>

          <CategoryDropdown onCategorySelect={setCategory} data={ itemData?.category}/>

          <ProductDropdown categorySelected={!!category} onProductSelect={setProduct} data={itemData?.product}/>

          <BrandDropdown productSelected={!!product} onBrandSelect={setBrand} data={itemData?.brand}/>

          <ModelDropdown brandSelected={!!brand} onModelSelect={setModel}  data = {itemData?.model}/>

          <ConditionDropdown onConditionSelect={setCondition} data = {itemData?.condition}/>

          <View style={ {marginBottom: 20}}>
            <DescriptionField data={itemData?.description} onInputComplete={setDescription}/>
          </View>

          <View style={{marginBottom: 20}}>
            <Text style={[AddStyles.informativeText]}>
              {t("UpdroppForm.informativeText", currentLanguage)}
            </Text>
          </View>

          <View style={{marginBottom: 20}}>
            <Pressable
              onPress={() => { //props for send the draft infor to QR code screen so it can be saved on scan.
                navigation.navigate("QRScanner" ,{
                  product: product, 
                  brand: brand, 
                  model: model, 
                  category: category, 
                  itemImage: image,
                  itemDescription: description,
                  itemCondition: condition, 
                });
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

        </View>
      </ScrollViewComponent>
      <Navigationbar navigation={navigation} badgeCount={badgeCount}/>
    </SafeAreaView>
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
