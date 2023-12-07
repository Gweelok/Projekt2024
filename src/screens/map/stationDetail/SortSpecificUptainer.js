import React, { useEffect, useState, useContext } from "react";
import {View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
    getItemsInUptainer,
    getProductById,
    getBrandById
} from "../../../utils/Repo";
import { LoaderContext } from "../../../componets/LoaderContext";
import { styles, Primarycolor1 } from "../../../styles/Stylesheet";
import ScrollViewComponent from "../../../componets/atoms/ScrollViewComponent";

const SortSpecificUptainer = ({ uptainerData }) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const { isLoading, setIsLoading } = useContext(LoaderContext);

    useEffect(() => {
        const fetchItemList = async () => {
            const storage = getStorage();
            try {
                const items = await getItemsInUptainer(uptainerData.uptainerId);

                const updatedData = await Promise.all(
                    items.map(async (item) => {
                        if (!item.itemTaken) {
                            const pathReference = ref(storage, item.itemImage);
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
                        } else {
                            return null;
                        }
                    })
                );

                const filteredData = updatedData.filter((item) => item !== null);
                setData(filteredData);
            } catch (error) {
                console.log("Error while fetching items => ", error);
            }
        };

        fetchItemList();
    }, [uptainerData.uptainerId]);

    // Splitting data into two items per row
    const groupedData = [];
    for (let i = 0; i < data.length; i += 2) {
        groupedData.push(data.slice(i, i + 2));
    }

    return (
        <View style={{ marginVertical: 10 }}>
            <TouchableOpacity
                onPress={() => {
                    setIsLoading(true);
                    navigation.navigate("UptainerDetails", {
                        uptainerData: uptainerData,
                    });
                }}
            >
            </TouchableOpacity>
            <ScrollView>

            <FlatList
                data={groupedData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row' }}>
                        {item.map((element, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() =>
                                    navigation.navigate("DetailView", {
                                        data: element?.itemId,
                                        itemDescription: element?.itemDescription,
                                        brandName: element?.brandName,
                                        productName: element?.productName,
                                        imageUrl: element?.imageUrl,
                                        uptainer: uptainerData,
                                    })
                                }
                                style={styling.item}
                            >
                                <Image
                                    source={{ uri: element?.imageUrl }}
                                    style={styling.image}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            />
            </ScrollView>
        </View>
    );
};

const styling = StyleSheet.create({
    item: {
        width: '50%', // Set the width of each item to occupy 50% of the screen
        aspectRatio: 1, // Maintain a square aspect ratio for the items
        margin: 5,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});

export default SortSpecificUptainer;
