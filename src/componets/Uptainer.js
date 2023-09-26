import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { styles, Primarycolor1 } from "../styles/Stylesheet";
import { React, useEffect, useState, useContext} from "react";
import { useNavigation } from "@react-navigation/native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  getItemsInUptainer,
  getProductById,
  getBrandById,
} from "../utils/Repo";

import { LoaderContext } from "../componets/LoaderContext";


const Uptainer = ({ uptainerData }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  useEffect(() => {
    const fetchItemList = async () => {
      const storage = getStorage();
      try {
        const items = await getItemsInUptainer(uptainerData.uptainerId); // Assuming 'id' is defined somewhere
        const updatedData = await Promise.all(
          items.map(async (item) => {
            const pathReference = ref(storage, item.itemImage); // Adjust the path according to your storage structure
            const product = await getProductById(item.itemproduct);
            const brand = await getBrandById(item.itemBrand);

            try {
              const url = await getDownloadURL(pathReference);
              return {
                ...item,
                imageUrl: url,
                productName: product.productName,
                brandName: brand.brandName,
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
        // DUPLICATED IMAGES TO SEE SCROLLING
        const doubleData = [...updatedData, ...updatedData];
        setData(doubleData);
      } catch (error) {
        console.log("Error while fetching items => ", error);
      }
    };
    fetchItemList();
  }, []);

  const pairedData = [];
  for (let i = 0; i < data.length; i += 2) {
    pairedData.push([data[i], data[i + 1]]);
  }
  
  return (
    <View style={{ marginBottom: 20 }}>
      <TouchableOpacity
        onPress={() =>{
          setIsLoading(true);
          navigation.navigate("UptainerDetails", {
            uptainerData: uptainerData,
          })
        }}
      >
        <Text style={styles.menuItem_text}>{uptainerData.uptainerName}</Text>
        <Text style={{ fontSize: 18, color: Primarycolor1 }}>{uptainerData.uptainerStreet}</Text>
      </TouchableOpacity>

      <FlatList
        horizontal={true}
        data={pairedData}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginBottom: 5, marginTop: 5 }}
        renderItem={({ item }) => (
          <View>
            {/* First Row */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetailView", {
                  data: item[0]?.itemId,
                  itemDescription: item[0]?.itemDescription,
                  brandName: item[0]?.brandName,
                  productName: item[0]?.productName,
                  imageUrl: item[0]?.imageUrl,
                  uptainer: uptainerData,
                })
              }
            >
              <View style={styling.item}>
                <Image
                  source={{ uri: item[0]?.imageUrl }}
                  style={styling.image}
                />
              </View>
            </TouchableOpacity>
            {/* Second Row */}
            {item[1] && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DetailView", {
                    data: item[1]?.itemId,
                    itemDescription: item[1]?.itemDescription,
                    brandName: item[1]?.brandName,
                    productName: item[1]?.productName,
                    imageUrl: item[1]?.imageUrl,
                    uptainer: uptainerData,
                  })
                }
              >
                <View style={styling.item}>
                  <Image
                    source={{ uri: item[1]?.imageUrl }}
                    style={styling.image}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styling = StyleSheet.create({
  item: {
    width: 150, // Set the width of each item
    height: 100,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default Uptainer;
