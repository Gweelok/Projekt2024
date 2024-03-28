import { React, useEffect, useState, useContext, useCallback } from "react";
import { View, Text } from "react-native";

import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";
import myDraftsStyle from "./myDraftsStyles";

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { deleteImage } from "../../utils/Repo/Images";
import {
  getDraftFromUser,
  deleteItemById,
  getItemsDetails,
} from "../../utils/Repo/Items";
import BackButton from "../../components/BackButton/BackButton";
import { LoaderContext } from "../../contexts/LoaderContext/LoaderContext";
import DeleteDraftsPopUp from "../../components/PopUps/DeleteDraft/DeleteDraftsPopUp";
import DraftCard from "../../components/DraftCard/DraftCard";
import ScrollViewComponent from "../../components/ScrollViewComponent/ScrollViewComponent";


import { t, useLanguage } from "../../languages/LanguageHandler";
import { BadgeContext } from "../../contexts/BadgeContext/BadgeContext";
import Screens from "../../utils/ScreenPaths";

const MyDrafts = ({ navigation }) => {
  const { badgeCount, setBadgeCount } = useContext(BadgeContext);
  const { currentLanguage } = useLanguage();
  const [data, setData] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const handlePress = () => {
    navigation.navigate(Screens.PROFILE);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const [selectedDraft, setSelectedDraft] = useState(null);

  const deleteCurrentDraft = () => {
    DeleteDraft(selectedDraft.itemId, selectedDraft.itemImage);
    closePopup();
  };

  //Fetches items in the draftcards from the database
  const fetchDraftList = async () => {
    const storage = getStorage();
    setIsLoading(true);
    try {
      const drafts = await getDraftFromUser(); // userId is not working so this get all items from database
      const updatedData = await getItemsDetails(drafts);
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

    setBadgeCount((prevCount) => prevCount - 1);
    setData([...data]);
  }

  return (
    <InteractiveScreen>
      <View style={myDraftsStyle.headerContianer}>
        <BackButton onPress={handlePress} />

        <Text style={myDraftsStyle.headerText}>
          {t("MyDraftsScreen.Header", currentLanguage)}
        </Text>
      </View>
      <View style={myDraftsStyle.draftCardsListContainer}></View>
      <ScrollViewComponent refreshing={refreshing} onRefresh={onRefresh}>
        {data.map((cur) => (
          <DraftCard
            key={cur.itemId}
            props={cur}
            onPress={() => {
              // needs check condition for item properties before updropp
              navigation.navigate(Screens.ADD_QR_SCANNER, {
                ...cur,
                image: cur.imageUrl
              });
            }}
            onDraftPress={() => {
              navigation.push(Screens.ADD, { itemData: cur });
            }}
            onCancelPress={() => {
              setSelectedDraft(cur);
              setPopupOpen(!popupOpen);
            }}
          />
        ))}
      </ScrollViewComponent>

      {popupOpen && (
        <DeleteDraftsPopUp
          onCancel={closePopup}
          onConfirm={deleteCurrentDraft}
        ></DeleteDraftsPopUp>
      )}

    </InteractiveScreen>
  );
};

export default MyDrafts;
