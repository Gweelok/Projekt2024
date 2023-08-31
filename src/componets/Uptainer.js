
import { View, Text, Image , FlatList ,StyleSheet, TouchableOpacity } from 'react-native';
import { styles , Primarycolor1 } from '../styles/Stylesheet';
import { React, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getItemsInUptainer, getProductById, getBrandById } from '../utils/Repo';


const Uptainer = ({id, name, location}) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {  
    const fetchItemList = async () => {
      const storage = getStorage();
      try {
        const items = await getItemsInUptainer(id); // Assuming 'id' is defined somewhere
        const updatedData = await Promise.all(items.map(async (item) => {
          const pathReference = ref(storage, item.itemImage); // Adjust the path according to your storage structure
          const product = await getProductById(item.itemproduct);
          const brand = await getBrandById(item.itemBrand);

          try {
            const url = await getDownloadURL(pathReference);
            return { ...item, imageUrl: url, productName: product.productName, brandName: brand.brandName };
          } catch (error) {
            console.log('Error while downloading image => ', error);
            return { ...item, imageUrl: 'https://via.placeholder.com/200x200' };
          }
        }));
        setData(updatedData);
      } catch (error) {
        console.log('Error while fetching items => ', error);
      }
    };
    fetchItemList();
  }, []);
    
return (
    <View> 
       <TouchableOpacity
        onPress={() =>
          navigation.navigate("UptainerDetails", { // added id so UptainerDetails gets it
            id: id,
            name: name,
            location: location,
          })
        }
      >
        <Text style={styles.menuItem_text}> {name}</Text>
        <Text style={{ fontSize: 18, color: Primarycolor1 }}> {location}</Text>
      </TouchableOpacity>
        <FlatList
      horizontal={true}
      data={data}
      keyExtractor={(item) => item.id}
      style={{marginBottom:5, marginTop:5,}}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('DetailView', { //added brandName, productName, url, description parameters so they are passed to detail view
          data: item.itemId, 
          itemDescription: item.itemDescription, 
          brandName: item.brandName, 
          productName: item.productName, 
          imageUrl: item.imageUrl,
          })}>
        <View style={styling.item}>
            <Image source={{ uri: item.imageUrl }} style={styling.image} />
        </View>
        </TouchableOpacity>
      )}
    />
            <FlatList
      horizontal={true}
      data={data}
      keyExtractor={(item) => item.id}
      style={{marginBottom:10, marginTop:5,}}
      renderItem={({ item }) => (
        <TouchableOpacity  onPress={() => navigation.navigate('DetailView', { //added brandName, productName, url, description parameters so they are passed to detail view
          data: item.itemId, 
          itemDescription: item.itemDescription, 
          brandName: item.brandName,  
          productName: item.productName, 
          imageUrl: item.imageUrl,
          })}>
        <View style={styling.item}>
            <Image source={{ uri: item.imageUrl }} style={styling.image} />
        </View>
        </TouchableOpacity>
      )}
    />
  
    </View>
  );
};
const styling = StyleSheet.create({
  item: {
    width: 100, // Set the width of each item
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
