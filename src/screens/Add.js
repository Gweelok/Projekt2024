import {
  View,
  Text,
  SafeAreaView,
  Button,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import {
  Backgroundstyle,
  Buttons,
  Primarycolor1,
  Primarycolor3,
} from "../styles/Stylesheet";
import Navigationbar from "../componets/Navigationbar";
import React, { useState, useContext, useEffect } from "react";
import { t, useLanguage } from "../Languages/LanguageHandler";
import DescriptionField from "./form/DescriptionField";
import CategoryDropdown from "./form/CategoryDropdown";
import CustomInput from "../componets/atoms/CustomInput";
import ImageUpload from "./form/ImageUpload";
import ProductDropdown from "./form/ProductDropdown";
import BrandDropdown from "./form/BrandDropdown";
import ModelDropdown from "./form/ModelDropdown";
import ConditionDropdown from "./form/ConditionDropdown";
import { BadgeContext } from "./form/BadgeContext";
import { firebaseApp, firebaseDB } from "../utils/Firebase";
import ScrollViewComponent from "../componets/atoms/ScrollViewComponent";
import { createItemDraft, getCurrentUser, updateItemById } from "../utils/Repo";
import { Camera } from "expo-camera";
import { LoaderContext } from "../componets/LoaderContext";
import LoadingScreen from "../componets/LoadingScreen";

const ProductDetailScreen = ({ route }) => {
  const { productId, userId } = route.params;

  const connectProductToUser = async () => {
    try {
      // Add a reference to the user's document
      const userDocRef = firebaseDB.collection("users").doc(userId);

      // Add the product ID to the user's document
      await userDocRef.update({
        products: firebaseApp.firestore.FieldValue.arrayUnion(productId),
      });

      Alert.alert("Success", "Product connected to user successfully");
    } catch (error) {
      console.error("Error connecting product to user:", error);
      Alert.alert("Error", "Failed to connect product to user");
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

const Add = ({ route, navigation }) => {
  const itemData = route.params?.itemData;
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  // you can fetch the final result of all field through here
  const { currentLanguage, setLanguage } = useLanguage();

  const [image, setImage] = useState(itemData?.imageUrl || "");
  const [category, setCategory] = useState(itemData?.category || null);
  const [product, setProduct] = useState(itemData?.product || null);
  const [brand, setBrand] = useState(itemData?.brand || "");
  const [model, setModel] = useState(itemData?.model || "");
  const [condition, setCondition] = useState(
    itemData?.condition ? itemData?.condition : itemData?.itemcondition || null
  );
  const [isProductDropdownVisible, setIsProductDropdownVisible] = useState(false);
  const [isBrandDropdownVisible, setIsBrandDropdownVisible] = useState(false);
  const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] = useState(true);
  const [isModelDropdownVisible, setIsModelDropdownVisible] = useState(false);
  const [isConditionDropdownVisible, setIsConditionDropdownVisible] = useState(false);



  const [description, setDescription] = useState(
    itemData?.description || ""
  );
  
  const { badgeCount, setBadgeCount } = React.useContext(BadgeContext);
  const handleSaveButtonClick = async () => {
    setIsLoading(true);
    const itemId = itemData?.itemId
    if (itemId) {
      const updatedData = {

        itemproduct: product instanceof Object ? product.productId : itemData?.itemproduct,
        itemBrand: brand instanceof Object ? brand.brandId : itemData?.itemBrand,
        itemModel: model instanceof Object ? model.modelId : itemData?.itemModel,
        itemCategory: category instanceof Object ? category.categoryId : itemData?.itemCategory,
        itemDescription: description ? description : itemData?.itemDescription,
        itemcondition: condition ? condition : itemData?.itemcondition,
      }
      const res = await updateItemById(itemId, updatedData, image instanceof Object ? image : null)
      if (res.itemUpdated){
        navigation.navigate("ProductSaved");
      }
      console.log(updatedData)
    } else{

      const response = await createItemDraft(
          product.productId,
          brand.brandId,
          model.modelId,
          category.categoryId,
          image,
          description,
          condition
        );
        if (response.draftAdded){
            navigation.navigate("ProductSaved");
            setBadgeCount((prevCount) => prevCount + 1);
        } else {
          console.log('item darft limit exeeded')
      }
            
    }
    setIsLoading(false);
  };

  const addProductConditions = () => {
    if (
      !product.productId ||
      !condition ||
      !category.categoryId
    ) {
      Alert.alert(t("UpdroppForm.noData", currentLanguage));
    } else {
      navigation.navigate("AddQRScanner", {
        itemId: itemData?.itemId,
        product: product instanceof Object ? product.productId : itemData?.itemproduct,
        brand: brand instanceof Object ? brand.brandId : itemData?.itemBrand,
        model: model instanceof Object ? model.modelId : itemData?.itemModel,
        category: category instanceof Object ? category.categoryId : itemData?.itemCategory,
        condition: condition ? condition : itemData?.itemcondition,
        description: description ? description : itemData?.itemDescription,
        image: image,
      });
    }
  };
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status === "granted");
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const cameraStatus = await Camera.requestCameraPermissionsAsync();
  //     setHasCameraPermissions(cameraStatus.status == "granted");
  //   })();
  // }, []);
  const handleSkipCategoryDropdown = () => {
    setIsProductDropdownVisible(true);
  };

  const handleSkipProductDropdown = () => {
    setIsBrandDropdownVisible(true);
  };
  const handleSkipBrandDropdown = () => {
   setIsModelDropdownVisible(true)
  };
  const handleSkipModelDropdown = () => {
    setIsConditionDropdownVisible(true);
  };

  const handleSkipConditionDropdown = () => {
    setIsConditionDropdownVisible(!isConditionDropdownVisible); // Toggle visibility
  };



  return (
    <SafeAreaView>
      <ScrollViewComponent>
        <View
          style={{
            paddingTop: 50,
            flex: 1,
            backgroundColor: Primarycolor3,
            marginHorizontal: 30,
          }}
        >
          <Text style={AddStyles.header}>
            {t("UpdroppForm.title", currentLanguage)}
          </Text>

          <View style={[{ marginBottom: 10 }]}>
            <ImageUpload onImageSelect={setImage} data={itemData?.itemImage !== "Items/Default.jpg" ? itemData?.imageUrl : null}/>
          </View>

          <CategoryDropdown
              onCategorySelect={setCategory}
              data={itemData?.category ? itemData?.category: itemData?.itemCategory }
              isVisible={isCategoryDropdownVisible}
              onSkip={handleSkipCategoryDropdown}
              isProductDropdownVisible={isProductDropdownVisible}
              setIsProductDropdownVisible={setIsProductDropdownVisible}
          />




          <ProductDropdown
              onProductSelect={setProduct}
              categorySelected={!!category} // Pass the state of category selection
              data={itemData?.product ? itemData?.product : itemData?.itemproduct}
              setIsBrandDropdownVisible={setIsBrandDropdownVisible}
              isBrandDropdownVisible={isBrandDropdownVisible}
              onSkip={handleSkipProductDropdown}
              isVisible={isProductDropdownVisible}
          />

          <BrandDropdown
              onBrandSelect={setBrand}
              productSelected={!!product}
              data={itemData?.brand ? itemData?.brand : itemData?.itemBrand}
              isVisible={isBrandDropdownVisible}
              setIsVisible={setIsBrandDropdownVisible}
              onSkip={handleSkipBrandDropdown}
              shouldOpenBrandDropdown={isBrandDropdownVisible}
              setIsModelDropdownVisible={setIsModelDropdownVisible}
              isModelDropdownVisible={isModelDropdownVisible}

          />

          <ModelDropdown
              brandSelected={!!brand}
              onModelSelect={setModel}
              data={itemData?.model ? itemData?.model : itemData?.itemModel}
              isVisible={isModelDropdownVisible}
              setIsVisible={setIsModelDropdownVisible}
              onSkip={handleSkipModelDropdown}
              setIsConditionDropdownVisible={setIsConditionDropdownVisible}
              isConditionDropdownVisible={isConditionDropdownVisible}
          />

          <ConditionDropdown
              onConditionSelect={setCondition}
              data={itemData?.condition ? itemData?.condition : itemData?.itemcondition}
              onSkip={handleSkipConditionDropdown}
              isVisible={isConditionDropdownVisible}
              setIsVisible={setIsConditionDropdownVisible}
          />

          <View style={{ marginBottom: 20 }}>
            <DescriptionField
              data={itemData?.itemDescription}
              onInputComplete={setDescription}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={[AddStyles.informativeText]}>
              {t("UpdroppForm.informativeText", currentLanguage)}
            </Text>
          </View>
          {isLoading && <LoadingScreen isLoaderShow={isLoading} />}
          <View style={{ }}>
            <Pressable
              onPress={() => {
                addProductConditions();
              }}
              style={[Buttons.main_button, { borderWidth: 1, width: "100%" }]}
            >
              <Text style={Buttons.main_buttonText}>
                {t("UpdroppForm.scanButton", currentLanguage)}
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={[
              Buttons.secondary_button,
              { borderWidth: 2, width: "100%" },
            ]}
            onPress={handleSaveButtonClick}
          >
            <Text style={Buttons.secondary_buttonText}>
              {t("UpdroppForm.scanLaterButton", currentLanguage)}
            </Text>
          </Pressable>
        </View>
      </ScrollViewComponent>
      <Navigationbar navigation={navigation} badgeCount={badgeCount} />
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
