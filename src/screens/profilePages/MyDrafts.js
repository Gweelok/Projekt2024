import { React, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { HeaderText, Primarycolor1 } from "../../styles/Stylesheet";
import { useNavigation } from "@react-navigation/native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import { Ionicons } from "@expo/vector-icons";
import { GoBackButton } from "../../styles/GoBackButton";
import DraftCard from "../../componets/DraftCard";
import { ScrollView } from "react-native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getDraftFromUser } from '../utils/Repo';
import { getBrandById, getCategoryById, getModelById, getProductById, getCurrentUser } from "../../utils/Repo";


//A DUMMY DATA helyet: getAllDraftbyUserID
const dummyData = [
  {
    id: 1,
    image: require("../../../assets/images/cph.jpg"),
    category: "Books",
    description: "dhhjddhkhdkdhkdknk",
    brand: "Casio",
    condition: "Very Good",
  },
  {
    id: 2,
    image: require("../../../assets/images/cph.jpg"),
    category: "Books",
    description: "dhhjddhkhdkdhkdknk",
    brand: "Apple",
    model: "iPhone",
    condition: "Good",
  },
  {
    id: 3,
    image: require("../../../assets/images/cph.jpg"),
    category: "Books",
    description: "dhhjddhkhdkdhkdknk",
    brand: "Casio",
    condition: "Very Good",
  },
];
const MyDrafts = () => {
  const navigation = useNavigation();
  const { currentLanguage } = useLanguage();

  const handlePress = () => {
    navigation.goBack();
  };


  
  const [data, setData] = useState([]);
  

useEffect(() => { //Fetches items in the draftcards
  const fetchDraftList = async () => {
    const storage = getStorage();
    const user = getCurrentUser();
    try {
      const drafts = await getDraftFromUser(user.id);// assuming "id" is defined somewhere.
      const updatedData = await Promise.all(drafts.map(async (item) => {
        const pathReference = ref(storage, item.itemImage); //Adjust the path according to your storage structure
        const product = await getProductById(item.itemproduct);
        const brand = await getBrandById(item.itemBrand);
        const category = await getCategoryById(item.itemCategory);
        const model = await getModelById(item.itemModel);
        
        try {
          const url = await getDownloadURL(pathReference);
          return { ...item, imageUrl: url,  productName: product.productName, brandName: brand.brandName, 
            categoryName: category.itemCategory,
            modelName: model.modelName, itemDescription: item.itemDescription , itemcondition: item.itemcondition};
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((cur, i) => ( 
          <DraftCard
            key={i}
            props={cur}
            onPress={() => {
              navigation.navigate("QRScanner");
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
        <View style={[{ marginTop: 50, minHeight: 200, marginBottom: 100 }]} />
      </ScrollView>
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
