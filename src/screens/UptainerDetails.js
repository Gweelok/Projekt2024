import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Navigationbar from "../componets/Navigationbar";
import { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getItemsInUptainer, getUptainerById, getProductById, getBrandById} from '../utils/Repo';
import GlobalStyle from "../styles/GlobalStyle";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const UptainerDetails = ({ navigation, route }) => {
  const item = route.params;
  console.log("item:", item);
  const [data, setData] = useState([]);
  const [uptainerImageUrl, setUptainerImageUrl] = useState(''); // New state for Uptainer image URL

  useEffect(() => {  //Fetches items in the uptainer 
    const fetchItemList = async () => {
      const storage = getStorage();
      try {
        const items = await getItemsInUptainer(item.id); // Assuming 'id' is defined somewhere --> id is from Uptainer (ln 42)
        const updatedData = await Promise.all(items.map(async (item) => {
          const pathReference = ref(storage, item.itemImage); // Adjust the path according to your storage structure
          const product = await getProductById(item.itemproduct);
          const brand = await getBrandById(item.itemBrand);
          
          
          try {
            const url = await getDownloadURL(pathReference);
            console.log(url);
            
            return { ...item, imageUrl: url,  productName: product.productName, brandName: brand.brandName,};
          } catch (error) {
            console.log('Error while downloading image => ', error);
            return { ...item, imageUrl: 'https://via.placeholder.com/200x200' };
          }
        }));
        setData(updatedData); // updates data property with the fetched data from db
      } catch (error) {
        console.log('Error while fetching items => ', error);
      }
    };
    fetchItemList();
  }, []);

  useEffect(() => {
    const fetchUptainerImage = async () => {
      const imageUrl = await getUptainerImageUrl();
      setUptainerImageUrl(imageUrl);
    };
    fetchUptainerImage();
  }, []);

async function getUptainerImageUrl() { //get uptainerUrl from database
    const storage = getStorage();
    try {
        const currentUptainer = await getUptainerById(item.id);
        console.log(currentUptainer);
        const uptainerPathReference = ref(storage, currentUptainer.uptainerImage);
        return await getDownloadURL(uptainerPathReference);
        
    } catch (error) {
        console.log('Error while getting Uptainer Image URL => ', error);
        return 'https://via.placeholder.com/200x200';
    }
}
  

  return (
    // <View style={GlobalStyle.BodyWrapper}>
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" color="white" size={20} />
        </TouchableOpacity>
        <View>
          <ImageBackground
            style={styles.detailsImage}
            source={{
              uri: uptainerImageUrl,  // current uptainer main pic 
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Map")}
              style={styles.productLocation}
            >
              <Text style={styles.productAddress}>
                {item.name} /{"\n"}
                {item.location}
              </Text>
              <Ionicons name="chevron-forward" color="white" size={30} />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 50,
            width: windowWidth,
            flexWrap: "wrap",
            padding: 10,
          }}
        >
          {data?.map((cur, i) => (  // loads item images contained in the uptainer to the screen
            <TouchableOpacity
              key={i}
              style={{
                marginLeft: 6,
                marginBottom: 20,
                marginRight: 20,
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("DetailView", {
                itemDescription: cur.itemDescription,
                imageUrl: cur.imageUrl,
                productName: cur.productName,
                brandName: cur.brandName,
                

              }
              )}
            >
              <Image
                style={styles.moreProductsImage}
                source={{
                  uri: cur?.imageUrl,
                }}
              />
              <Text style={{ fontWeight: "600" }}>{cur.productName} </Text> 
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={[
            styles.section,
            { marginTop: 50, minHeight: 200, marginBottom: 100 },
          ]}
        />
      </ScrollView>
      <Navigationbar navigation={navigation} />
    </View>
     // </View>
  );
};

export default UptainerDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    backgroundColor: "#1c4b3d",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  detailsImage: {
    width: windowWidth / 1.1,
    height: windowHeight / 3,
  },
  productLocation: {
    width: windowWidth / 1.7,
    backgroundColor: "#1c4b3d",
    height: 70,
    position: "absolute",
    bottom: -30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productAddress: {
    width: "70%",
    fontSize: 16,
    color: "white",
    fontWeight: "700",
    padding: 10,
    // backgroundColor: "red",
  },
  moreProductsImage: {
    width: windowWidth / 2.7,
    height: windowHeight / 6.4,
  },
});
