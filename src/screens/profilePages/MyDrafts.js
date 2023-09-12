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


// fetch the data from server
const dummyData = [
  {
    id: 1,
    image: "https://static.cnbetacdn.com/article/2020/0629/68a35b661ef17ca.jpeg",
    category: "Phones",
    description: "The phone, abandoned and weathered, shows evident signs of prolonged use.  seen better days before being discarded.",
    product: "Mi 14",
    brand: "XiaoMi",
    model: "XiaoMi",
    condition: "Very Good",
  },
  {
    id: 2,
    image: "https://images.jingyeqian.com/img/2020/09/14/6373567560115456238144235.jpg",
    category: "Phones",
    description: "The phone, abandoned and weathered, shows evident signs of prolonged use.  seen better days before being discarded.",
    product: "iPhone",
    brand: "Casio",
    model: "iPhone",
    condition: "Very Good",
  },
  {
    id: 3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGtMYyvNU02iAWkULCXf_3A8hiSpBW0arx0J6F5KF2zo2Cl9ZIN_OlryBY5hIh900MRTg&usqp=CAU",
    category: "PC",
    description: "The phone, abandoned and weathered, shows evident signs of prolonged use.  seen better days before being discarded.",
    product: "iPhone",
    brand: "Casio",
    model: "iPhone",
    condition: "Very Good",
  },
];
const MyDrafts = () => {
  const navigation = useNavigation();
  const {currentLanguage} = useLanguage();

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
      <View style={{flexDirection: "row", alignItems: "center"}}>
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
            onDraftPress={() => {
              navigation.push("Add", {itemData: cur});
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
        <View style={[{marginTop: 50, minHeight: 200, marginBottom: 100}]}/>
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
