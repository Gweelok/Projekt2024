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
import {createItemDraft, getCurrentUser} from "../utils/Repo";


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

  const [image, setImage] = useState(itemData?.imageUrl || ""); 
  const [category, setCategory] = useState(itemData?.category || null);
  const [product, setProduct] = useState(itemData?.product || null);
  const [brand, setBrand] = useState(itemData?.brand || null);
  const [model, setModel] = useState(itemData?.model || "");
  const [condition, setCondition] = useState(itemData?.condition || "");
  const [description, setDescription] = useState(itemData?.description || ""); 

  const { badgeCount, setBadgeCount } = React.useContext(BadgeContext);
  const handleSaveButtonClick = async () => {

    await createItemDraft(product.productId, brand.brandId, model.modelId, category.categoryId, image, description, condition);
    navigation.navigate("ProductSaved");
    setBadgeCount(prevCount => prevCount + 1);
  };

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
            <ImageUpload onImageSelect={setImage} data={itemData?.imageUrl}/>
          </View>

          <CategoryDropdown onCategorySelect={setCategory} data={ itemData?.category}/>

          <ProductDropdown categorySelected={!!category} onProductSelect={setProduct} data={itemData?.product}/>

          <BrandDropdown productSelected={!!product} onBrandSelect={setBrand} data={itemData?.brand}/>

          <ModelDropdown brandSelected={!!brand} onModelSelect={setModel}  data = {itemData?.model}/>

          <ConditionDropdown onConditionSelect={setCondition} data = {itemData?.condition}/>

          <View style={ {marginBottom: 20}}>
            <DescriptionField data={itemData?.itemDescription} onInputComplete={setDescription}/>
          </View>

          <View style={{marginBottom: 20}}>
            <Text style={[AddStyles.informativeText]}>
              {t("UpdroppForm.informativeText", currentLanguage)}
            </Text>
          </View>

          <View style={{marginBottom: 20}}>
            <Pressable
              onPress={() => {
                navigation.navigate("QRScanner", {
                  product: product.productId, 
                  brand: brand.brandId, 
                  model: model.modelId, 
                  category: category.categoryId, 
                  condition: condition, 
                  description: description, 
                  image: image
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
            onPress={handleSaveButtonClick}
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
   display: "flex",
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
