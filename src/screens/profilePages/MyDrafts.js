import { React, useEffect, useState, useContext, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderText, Primarycolor1, Backgroundstyle } from "../../styles/Stylesheet";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import DraftCard from "../../componets/DraftCard";
import ScrollViewComponent from "../../componets/atoms/ScrollViewComponent";
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
import { LoaderContext } from "../../componets/LoaderContext";
import DeleteDraftsPopUp from "../../componets/PopUps/DeleteDraftsPopUp";
// fetch the data from server
import GlobalStyle from "../../styles/GlobalStyle";

import Navigationbar from "../../componets/Navigationbar";
import { BadgeContext } from "../form/BadgeContext";


const MyDrafts = ({ navigation }) => {
  const { badgeCount, setBadgeCount } = useContext(BadgeContext);
  const { currentLanguage } = useLanguage();
  const [data, setData] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const handlePress = () => {
    navigation.navigate("Profile");
  };

  const closePopup = () => {
    setPopupOpen(false);
  }

  const [selectedDraft, setSelectedDraft] = useState(null);

  const deleteCurrentDraft = () => {
    DeleteDraft(selectedDraft.itemId, selectedDraft.itemImage)
    closePopup();
  }

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
      setRefreshing(false);
    } catch (error) {
      console.log("Error while fetching drafts => ", error);
    }
  };


  const onRefresh = useCallback(() => {
    setRefreshing(true);

    fetchDraftList();
  }, []);

  useEffect(() => {
    fetchDraftList();
  }, []);


  async function DeleteDraft(itemId, image) {
    await deleteItemById(itemId);

    if (image !== "Items/Default.jpg") {
      await deleteImage(image);

    }
    data.splice(
      data.findIndex((item) => item.itemId === itemId),
      1
    );

    setBadgeCount((prevCount) => prevCount - 1)
    setData([...data]);

  }

  return (
    <View style={[Backgroundstyle.interactive_screens]}>
      <View style={GlobalStyle.BodyWrapper}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <BackButton onPress={handlePress} />
          <Text style={[HeaderText.Header, { marginLeft: 30 }]}>
            {t("MyDraftsScreen.Header", currentLanguage)}
          </Text>
        </View>
        <ScrollViewComponent
          refreshing={refreshing}
          onRefresh={onRefresh}
        >
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
                  setSelectedDraft(cur)
                  setPopupOpen(!popupOpen);
                }}
              />
            )
          )}
        </ScrollViewComponent>
        {popupOpen && <DeleteDraftsPopUp onCancel={closePopup} onConfirm={deleteCurrentDraft}></DeleteDraftsPopUp>}

      </View>
      <Navigationbar navigation={navigation} />
    </View>
  );



  const DraftStyle = StyleSheet.create({
    arrow: {
      marginTop: 15,
      height: 42,
      width: 42,
      color: "white",
      marginLeft: 30,
      backgroundColor: Primarycolor1,
    }
  })
}

export default MyDrafts;
