import { React, useEffect, useState } from "react";
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
import { getBrandById, getCategoryById, getModelById, getProductById, getCurrentUser, getDraftFromUser} from "../../utils/Repo";

const MyDrafts = () => {
  const navigation = useNavigation();
  const { currentLanguage } = useLanguage();
  const [data, setData] = useState([]);

  const handlePress = () => {
    navigation.goBack();
  };

  useEffect(() => { //Fetches items in the draftcards from the database 
    const fetchDraftList = async () => {
      const storage = getStorage();
      const user = await getCurrentUser();//firebaseAurth.currentUser; this is not working right now
      
      try {
        const drafts = await getDraftFromUser(user.id);// userId is not working so this get all items from database
        const updatedData = await Promise.all(drafts.map(async (item) => {
          const pathReference = ref(storage, item.itemImage); //Adjust the path according to your storage structure
          const product = await getProductById(item.itemproduct);// querying  details for the draft to be displayed 
          const brand = await getBrandById(item.itemBrand);
          const category = await getCategoryById(item.itemCategory);
          const model = await getModelById(item.itemModel);
          
          try {
            const url = await getDownloadURL(pathReference);
            return { ...item, imageUrl: url,  productName: product, brandName: brand,  // loading extram params into the objects
              categoryName: category.itemCategory,
              modelName: model, itemDescription: item.itemDescription , itemcondition: item.itemcondition};
          } catch (error) {
            console.log('Error while downloading image => ', error);
            return { ...item, imageUrl: 'https://via.placeholder.com/200x200' };
          }
        }));
        setData(updatedData); // updates data property with the fetched data from db
      } catch (error) {
        console.log('Error while fetching drafts => ', error);
      }
    };
    fetchDraftList();
  }, []);


  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={36}
            style={DraftStyle.arrow}
          />
        </TouchableOpacity>
        <Text style={[HeaderText.Header]}>
          {t("MyDraftsScreen.Header", currentLanguage)}
        </Text>
      </View>
      <ScrollViewComponent>
        {data.map((cur, i) => (  // instead of dummy data using data
          <DraftCard
            key={i}
            props={cur}
            onPress={() => {
              navigation.navigate("QRScanner");
            }}
            onDraftPress={() => {
              navigation.push("Add", { itemData: cur });
            }}
            onCancelPress={() => {
              console.log("pressed");
              Alert.alert(
                `${t("MyDraftsScreen.closeButtonTitle", currentLanguage)}`,
                `${t("MyDraftsScreen.closeButtonAsking", currentLanguage)}`,
                [
                  {
                    text: `${t(
                      "MyDraftsScreen.closeButtonAnswerNo",
                      currentLanguage
                    )}`,
                    //onPress: () => console.log('Cancel Pressed'),
                    style: "cancel",
                  },
                  {
                    text: `${t(
                      "MyDraftsScreen.closeButtonAnswerYes",
                      currentLanguage
                    )}`,
                  },
                ]
              );
            }}
          />
        ))}
      </ScrollViewComponent>
    </View>
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
