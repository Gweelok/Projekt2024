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
  } from "../../styles/styleSheet";
  import React, { useState, useContext, useEffect } from "react";
  import { t, useLanguage } from "../../Languages/LanguageHandler";
  import CategoryDropdown from "./CategoryDropdown";
  import ImageUpload from "./ImageUpload";
  import ProductDropdown from "./ProductDropdown";
  import BrandDropdown from "./BrandDropdown";
  import ModelDropdown from "./ModelDropdown";
  import ConditionDropdown from "./ConditionDropdown";
  import { Camera } from "expo-camera";
  import { LoaderContext } from "../molecules/LoaderContext";
  import LoadingScreen from "../molecules/LoaderContext";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
  
  
  
  const AddUptainerForm = ({ location }) => {
    const { isLoading, setIsLoading } = useContext(LoaderContext);
    // you can fetch the final result of all field through here
    const { currentLanguage, setLanguage } = useLanguage();
  
    const [image, setImage] = useState("");
    const [category, setCategory] = useState(null);
    const [product, setProduct] = useState(null);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [condition, setCondition] = useState(null);
    const [isProductDropdownVisible, setIsProductDropdownVisible] = useState(false);
    const [isBrandDropdownVisible, setIsBrandDropdownVisible] = useState(false);
    const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] = useState(true);
    const [isModelDropdownVisible, setIsModelDropdownVisible] = useState(false);
    const [isConditionDropdownVisible, setIsConditionDropdownVisible] = useState(false);
    
    const handleSaveButtonClick = async () => {
      setIsLoading(true);  
    // this is an main's app code to work on add item do you tweaks as you like
    //   const itemId = itemData?.itemId
    //   if (itemId) {
    //     const updatedData = {
  
    //       itemproduct: product instanceof Object ? product.productId : itemData?.itemproduct,
    //       itemBrand: brand instanceof Object ? brand.brandId : itemData?.itemBrand,
    //       itemModel: model instanceof Object ? model.modelId : itemData?.itemModel,
    //       itemCategory: category instanceof Object ? category.categoryId : itemData?.itemCategory,
    //       itemDescription: description ? description : itemData?.itemDescription,
    //       itemcondition: condition ? condition : itemData?.itemcondition,
    //     }
    //     const res = await updateItemById(itemId, updatedData, image instanceof Object ? image : null)
    //     if (res.itemUpdated){
    //       navigation.navigate("ProductSaved");
    //     }
    //     console.log(updatedData)
    //   } else{
  
    //     const response = await createItemDraft(
    //         product?.productId,
    //         brand?.brandId,
    //         model?.modelId,
    //         category?.categoryId,
    //         image,
    //         description,
    //         condition
    //       );
    //       if (response.draftAdded){
    //           navigation.navigate("ProductSaved");
    //           setBadgeCount((prevCount) => prevCount + 1);
    //       } else {
    //         console.log('item darft limit exeeded')
    //     }
              
    //   }
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
        // navigation.navigate("AddQRScanner", {
        //   itemId: itemData?.itemId,
        //   product: product instanceof Object ? product.productId : itemData?.itemproduct,
        //   brand: brand instanceof Object ? brand.brandId : itemData?.itemBrand,
        //   model: model instanceof Object ? model.modelId : itemData?.itemModel,
        //   category: category instanceof Object ? category.categoryId : itemData?.itemCategory,
        //   condition: condition ? condition : itemData?.itemcondition,
        //   description: description ? description : itemData?.itemDescription,
        //   image: image,
        // });
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
    <View>
          <View
            style={{
            //   paddingTop: 50,
              flex: 1,
            //   marginHorizontal: 30,
            //   height: windowHeight,
              width: windowWidth * 0.7
            }}
          >
            <View style={[{ marginBottom: 10 }]}>
              <ImageUpload onImageSelect={setImage} data={null}/>
            </View>
  
            <CategoryDropdown
                onCategorySelect={setCategory}
                data={category }
                isVisible={isCategoryDropdownVisible}
                onSkip={handleSkipCategoryDropdown}
                isProductDropdownVisible={isProductDropdownVisible}
                setIsProductDropdownVisible={setIsProductDropdownVisible}
            />
  
  
  
  
            <ProductDropdown
                onProductSelect={setProduct}
                categorySelected={!!category} // Pass the state of category selection
                data={product}
                setIsBrandDropdownVisible={setIsBrandDropdownVisible}
                isBrandDropdownVisible={isBrandDropdownVisible}
                onSkip={handleSkipProductDropdown}
                isVisible={isProductDropdownVisible}
            />
  
            <BrandDropdown
                onBrandSelect={setBrand}
                productSelected={!!product}
                data={brand}
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
                data={model}
                isVisible={isModelDropdownVisible}
                setIsVisible={setIsModelDropdownVisible}
                onSkip={handleSkipModelDropdown}
                setIsConditionDropdownVisible={setIsConditionDropdownVisible}
                isConditionDropdownVisible={isConditionDropdownVisible}
            />
  
            {/* <ConditionDropdown
                onConditionSelect={setCondition}
                data={condition}
                onSkip={handleSkipConditionDropdown}
                isVisible={isConditionDropdownVisible}
                setIsVisible={setIsConditionDropdownVisible}
            /> */}
  
            {isLoading && <LoadingScreen isLoaderShow={isLoading} />}
            {/* <View style={{ }}>
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
            </View> */}
            
          </View>
        </View>
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
  
  export default AddUptainerForm;
  