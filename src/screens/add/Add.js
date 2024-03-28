import { View, Text, Button, Pressable, Alert } from "react-native";

import addStyles from "./addStyles";
import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";

import React, { useState, useContext } from "react";
import { t, useLanguage } from "../../languages/LanguageHandler";

//Form components
import DescriptionField from "../../components/form/description-field/DescriptionField";
import CategoryDropdown from "../../components/form/category-dropdown/CategoryDropdown";
import ImageUpload from "../../components/form/image-upload/ImageUpload";
import ProductDropdown from "../../components/form/product-dropdown/ProductDropdown";
import BrandDropdown from "../../components/form/brand-dropdown/BrandDropdown";
import ModelDropdown from "../../components/form/model-dropdown/ModelDropdown";
import ConditionDropdown from "../../components/form/condition-dropdown/ConditionDropdown";
import { BadgeContext } from "../../contexts/BadgeContext/BadgeContext";

import { firebaseApp, firebaseDB } from "../../utils/Repo/Firebase";
import ScrollViewComponent from "../../components/ScrollViewComponent/ScrollViewComponent";
import { createItemDraft, updateItemById } from "../../utils/Repo/Items";
import { LoaderContext } from "../../contexts/LoaderContext/LoaderContext";
import Screens from "../../utils/ScreenPaths";
import { useNavigation } from "@react-navigation/native";

// ------- Unused -------
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

const Add = ({ route }) => {
  const itemData = route.params?.itemData;
  
  const navigation = useNavigation();
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  // you can fetch the final result of all field through here
  const { currentLanguage, setLanguage } = useLanguage();

  const [image, setImage] = useState(itemData?.imageUrl || "");
  const [category, setCategory] = useState(itemData?.category || "");
  const [product, setProduct] = useState(itemData?.product || "");
  const [brand, setBrand] = useState(itemData?.brand || "");
  const [model, setModel] = useState(itemData?.model || "");
  const [condition, setCondition] = useState(itemData?.itemcondition || "");
  const [isProductDropdownVisible, setIsProductDropdownVisible] =
    useState(false);
  const [isBrandDropdownVisible, setIsBrandDropdownVisible] = useState(false);
  const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] =
    useState(true);
  const [isModelDropdownVisible, setIsModelDropdownVisible] = useState(false);
  const [isConditionDropdownVisible, setIsConditionDropdownVisible] =
    useState(false);
  const [description, setDescription] = useState(
    itemData?.itemDescription || ""
  );

  const { badgeCount, setBadgeCount } = React.useContext(BadgeContext);

  const handleSaveButtonClick = async () => {
    setIsLoading(true);

    const itemId = itemData?.itemId;
    if (itemId) {
      const updatedData = {
        ...itemData,
        itemproduct: product?.productId,
        itemBrand: brand?.brandId,
        itemModel: model?.modelId,
        itemCategory: category?.categoryId,
        itemDescription: description,
        itemcondition: condition,
      };
      const res = await updateItemById(itemId, updatedData, image);
      setIsLoading(false);

      if (res.itemUpdated) {
        navigation.replace(Screens.PRODUCT_SAVED);
      }
    } else {
      // Check if at least one of the fields has a value
      if (
        product ||
        brand ||
        model ||
        category ||
        image ||
        description ||
        condition
      ) {
        const response = await createItemDraft(
          product?.productId,
          brand?.brandId,
          model?.modelId,
          category?.categoryId,
          image,
          description,
          condition
        );

        if (response.draftAdded) {
          navigation.replace(Screens.PRODUCT_SAVED);
          setBadgeCount((prevCount) => prevCount + 1);
        } else {
          Alert.alert(
            t("QrScannerScreen.Error", currentLanguage),
            t("UpdroppForm.maxDraft", currentLanguage)
          );
        }
      } else {
        Alert.alert("Error", "At least one field must have a value");
        console.log("At least one field must have a value");
      }
      setIsLoading(false);
    }
  };

  const addProductConditions = () => {
    if (!product || !condition || !category) {
      Alert.alert(t("UpdroppForm.noData", currentLanguage));
    } else {
      navigation.navigate(Screens.ADD_QR_SCANNER, {
        ...itemData,
        product: product,
        brand: brand,
        category: category,
        model: model,
        itemId: itemData?.itemId,
        itemproduct: product?.productId,
        itemBrand: brand?.brandId,
        itemModel: model?.modelId,
        itemCategory: category?.categoryId,
        itemDescription: description,
        itemcondition: condition,
        image: image,
      });
    }
  };

  const handleSkipCategoryDropdown = () => {
    setIsProductDropdownVisible(true);
  };

  const handleSkipProductDropdown = () => {
    setIsBrandDropdownVisible(true);
  };
  const handleSkipBrandDropdown = () => {
    setIsModelDropdownVisible(true);
  };
  const handleSkipModelDropdown = () => {
    setIsConditionDropdownVisible(true);
  };

  const handleSkipConditionDropdown = () => {
    setIsConditionDropdownVisible(!isConditionDropdownVisible); // Toggle visibility
  };

  return (
    <InteractiveScreen>
      <ScrollViewComponent>
        <View style={addStyles.formContainer}>
          <Text style={addStyles.header}>
            {t("UpdroppForm.title", currentLanguage)}
          </Text>
        </View>

        <View style={addStyles.imgContainer}>
          <ImageUpload
            onImageSelect={setImage}
            data={
              itemData?.itemImage !== "Items/Default.jpg"
                ? itemData?.imageUrl
                : null
            }
          />
        </View>

        <CategoryDropdown
          onCategorySelect={setCategory}
          data={itemData?.category}
          isVisible={isCategoryDropdownVisible}
          onSkip={handleSkipCategoryDropdown}
          isProductDropdownVisible={isProductDropdownVisible}
          setIsProductDropdownVisible={setIsProductDropdownVisible}
        />

        <ProductDropdown
          onProductSelect={setProduct}
          categorySelected={!!category} // Pass the state of category selection
          data={itemData?.product}
          category={category}
          setIsBrandDropdownVisible={setIsBrandDropdownVisible}
          isBrandDropdownVisible={isBrandDropdownVisible}
          onSkip={handleSkipProductDropdown}
          isVisible={isProductDropdownVisible}
        />

        <BrandDropdown
          onBrandSelect={setBrand}
          productSelected={!!product}
          product={product}
          data={itemData?.brand}
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
          brand={brand}
          product={product}
          data={itemData?.model}
          isVisible={isModelDropdownVisible}
          setIsVisible={setIsModelDropdownVisible}
          onSkip={handleSkipModelDropdown}
          setIsConditionDropdownVisible={setIsConditionDropdownVisible}
          isConditionDropdownVisible={isConditionDropdownVisible}
        />

        <ConditionDropdown
          onConditionSelect={setCondition}
          data={itemData?.itemcondition}
          onSkip={handleSkipConditionDropdown}
          isVisible={isConditionDropdownVisible}
          setIsVisible={setIsConditionDropdownVisible}
        />

        <View style={addStyles.spacer}>
          <DescriptionField
            data={itemData?.itemDescription}
            onInputComplete={setDescription}
          />
        </View>

        <View style={addStyles.spacer}>
          <Text style={[addStyles.informativeText]}>
            {t("UpdroppForm.informativeText", currentLanguage)}
          </Text>
        </View>

        <Pressable
          style={addStyles.scanButton}
          onPress={() => {
            addProductConditions();
          }}
        >
          <Text style={addStyles.scanButtonText}>
            {t("UpdroppForm.scanButton", currentLanguage)}
          </Text>
        </Pressable>

        <Pressable
          style={addStyles.scanLaterButton}
          onPress={handleSaveButtonClick}
        >
          <Text style={addStyles.scanLaterButtonText}>
            {t("UpdroppForm.scanLaterButton", currentLanguage)}
          </Text>
        </Pressable>
      </ScrollViewComponent>

    </InteractiveScreen>
  );
};

export default Add;
