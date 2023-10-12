import { React, useEffect, useState, useContext} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { HeaderText, Primarycolor1 } from "../../styles/Stylesheet";
import { useNavigation } from "@react-navigation/native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import { Ionicons } from "@expo/vector-icons";
import { GoBackButton } from "../../styles/GoBackButton";
import DraftCard from "../../componets/DraftCard";
import ScrollViewComponent from "../../componets/atoms/ScrollViewComponent";
import { ScrollView } from "react-native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  getBrandById,
  getCategoryById,
  getModelById,
  getProductById,
  getCurrentUser,
  getDraftFromUser,
  deleteItemById,
  deleteImage,
} from "../../utils/Repo";
import BackButton from "../../componets/BackButton";
import StatusBarComponent from "../../componets/atoms/StatusBarComponent";
import { LoaderContext } from "../../componets/LoaderContext"; 
import LoadingScreen from "../../componets/LoadingScreen";
// fetch the data from server

const MyDrafts = () => {
  const navigation = useNavigation();
  const { currentLanguage } = useLanguage();
  const [data, setData] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const handlePress = () => {
    navigation.goBack();
  };
  useEffect(() => {
    //Fetches items in the draftcards from the database
    const fetchDraftList = async () => {
      const storage = getStorage();
      setIsLoading(true);
      const user = await getCurrentUser();//firebaseAurth.currentUser; this is not working right now
      
      try {
        const drafts = await getDraftFromUser(user.id); // userId is not working so this get all items from database
        const updatedData = await Promise.all(
          drafts.map(async (item) => {
            const pathReference = ref(storage, item.itemImage); //Adjust the path according to your storage structure
            const product = await getProductById(item.itemproduct); // querying  details for the draft to be displayed
            const brand = await getBrandById(item.itemBrand);
            const category = await getCategoryById(item.itemCategory);
            const model = await getModelById(item.itemModel);

            try {
              const url = await getDownloadURL(pathReference);
              return {
                ...item,
                imageUrl: url,
                product: product,
                brand: brand, // loading extram params into the objects
                category: category,
                model: model,
              };
            } catch (error) {
              console.log("Error while downloading image => ", error);
              return {
                ...item,
                imageUrl: "https://via.placeholder.com/200x200",
              };
            }
          })
        );
        setData(updatedData); // updates data property with the fetched data from db
        setIsLoading(false);
      } catch (error) {
        console.log("Error while fetching drafts => ", error);
      }
    };
    fetchDraftList();
  }, []);
  async function DeleteDraft(itemId, image) {
      await deleteItemById(itemId);
    if(image != "Items/Default.jpg"){
      await deleteImage(image);
    }
    data.splice(
      data.findIndex((item) => item.itemId === itemId),
      1
    );
    setData([...data]);
  }

  return (
    <StatusBarComponent>
      <View
        style={{ flexDirection: "row", alignItems: "center", paddingLeft: 20 }}
      >
        <BackButton onPress={handlePress} />
        <Text style={[HeaderText.Header]}>
          {t("MyDraftsScreen.Header", currentLanguage)}
        </Text>
      </View>
      {isLoading && <LoadingScreen isLoaderShow={isLoading} />}
      <ScrollViewComponent>
        {data.map(
          (
            cur // instead of dummy data using data
          ) => (
            <DraftCard
              key={cur.itemId}
              props={cur}
              onPress={() => {
                //needs to be update in the furture|does not delete the draft from the database
                navigation.navigate("QRScanner", {
                  product: cur.product.productId,
                  brand: cur.brand.brandId,
                  model: cur.model.modelId,
                  category: cur.category.categoryId,
                  condition: cur.itemcondition,
                  description: cur.itemDescription,
                  image: cur.imageUrl,
                });
              }}
              onDraftPress={() => {
                navigation.push("Add", { itemData: cur });
              }}
              onCancelPress={() => {
                Alert.alert(
                  `${t("MyDraftsScreen.closeButtonTitle", currentLanguage)}`,
                  `${t("MyDraftsScreen.closeButtonAsking", currentLanguage)}`,
                  [
                    {
                      text: `${t(
                        "MyDraftsScreen.closeButtonAnswerNo",
                        currentLanguage
                      )}`,
                      style: "cancel",
                    },
                    {
                      text: `${t(
                        "MyDraftsScreen.closeButtonAnswerYes",
                        currentLanguage
                      )}`,
                      onPress: () => DeleteDraft(cur.itemId, cur.itemImage),
                    },
                  ]
                );
              }}
            />
          )
        )}
      </ScrollViewComponent>
    </StatusBarComponent>
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
