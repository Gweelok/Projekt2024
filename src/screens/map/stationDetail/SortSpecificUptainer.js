import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet, ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
    getItemsInUptainer,
    getProductById,
    getBrandById,
} from "../../../utils/Repo";
import { LoaderContext } from "../../../componets/LoaderContext";
import { Screens } from "../../../utils/ScreenPaths";

const SortSpecificUptainer = ({ uptainerData }) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const { isLoading, setIsLoading } = useContext(LoaderContext);

    useEffect(() => {
        const fetchItemList = async () => {
            const storage = getStorage();
            try {
                setIsLoading(true);
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
                setIsLoading(false);
            } catch (error) {
                console.log("Error while fetching items => ", error);
                setIsLoading(false);
            }
        };

        fetchItemList();
    }, [uptainerData.uptainerId]);

    const renderItem = (item) => (
        <TouchableOpacity
            key={item.itemId}
            onPress={() => {
                navigation.navigate(Screens.DETAIL_VIEW, {
                    data: item.itemId || "",
                    itemDescription: item.itemDescription || "",
                    brandName: item.brandName || "",
                    productName: item.productName || "",
                    imageUrl: item.imageUrl || "",
                    uptainer: uptainerData || {},
                });
            }}
            style={styling.item}
        >
            <View style={styling.imageContainer}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styling.image}
                />
            </View>
            <Text style={styling.productNameText}>
                {item.productName}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styling.container}>
            {isLoading && <ActivityIndicator size="large" color="#000" />}
            <ScrollView contentContainerStyle={styling.scrollViewContent}>
                {data.map((item) => renderItem(item))}
            </ScrollView>
        </View>
    );
};

const styling = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    item: {
        width: '47%', // Adjust the width as per your requirement
        aspectRatio: 1,
        margin: 0,
        overflow: "hidden",
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%', // Adjust the height as per your requirement
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    productNameText: {
        flexDirection: 'row',
        marginTop:5,
        marginBottom:10,
        width:"100%",
        fontWeight: "bold",
        fontSize: 15,
    },
});

export default SortSpecificUptainer;

// import React, { useEffect, useState, useContext } from "react";
// import {
//     View,
//     Text,
//     Image,
//     FlatList,
//     StyleSheet,
//     TouchableOpacity,
//     ScrollView,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";
// import {
//     getItemsInUptainer,
//     getProductById,
//     getBrandById,
// } from "../../../utils/Repo";
// import { LoaderContext } from "../../../componets/LoaderContext";
// import { styles, Primarycolor1 } from "../../../styles/Stylesheet";
// import ScrollViewComponent from "../../../componets/atoms/ScrollViewComponent";
//
// const SortSpecificUptainer = ({ uptainerData }) => {
//     const navigation = useNavigation();
//     const [data, setData] = useState([]);
//     const { isLoading, setIsLoading } = useContext(LoaderContext);
//
//     useEffect(() => {
//         const fetchItemList = async () => {
//             const storage = getStorage();
//             try {
//                 const items = await getItemsInUptainer(uptainerData.uptainerId);
//
//                 const updatedData = await Promise.all(
//                     items.map(async (item) => {
//                         if (!item.itemTaken) {
//                             const pathReference = ref(storage, item.itemImage);
//                             const product = await getProductById(item.itemproduct);
//                             const brand = await getBrandById(item.itemBrand);
//
//                             try {
//                                 const url = await getDownloadURL(pathReference);
//                                 return {
//                                     ...item,
//                                     imageUrl: url,
//                                     productName: product.productName,
//                                     brandName: brand.brandName,
//                                 };
//                             } catch (error) {
//                                 console.log("Error while downloading image => ", error);
//                                 return {
//                                     ...item,
//                                     imageUrl: "https://via.placeholder.com/200x200",
//                                 };
//                             }
//                         } else {
//                             return null;
//                         }
//                     })
//                 );
//
//                 const filteredData = updatedData.filter((item) => item !== null);
//                 setData(filteredData);
//             } catch (error) {
//                 console.log("Error while fetching items => ", error);
//             }
//         };
//
//         fetchItemList();
//     }, [uptainerData.uptainerId]);
//
//     const groupedData = [];
//     for (let i = 0; i < data.length; i += 2) {
//         groupedData.push(data.slice(i, i + 2));
//     }
//
//     return (
//         <View style={{ marginVertical: 10 }}>
//             <TouchableOpacity
//                 onPress={() => {
//                     setIsLoading(true);
//                     navigation.navigate("UptainerDetails", {
//                         uptainerData: uptainerData,
//                     });
//                 }}
//             ></TouchableOpacity>
//             <ScrollView>
//                 <FlatList
//                     data={groupedData}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({ item }) => (
//                         <View style={{ flexDirection: 'row' }}>
//                             {item.map((element, index) => (
//                                 <TouchableOpacity
//                                     key={index}
//                                     onPress={() =>
//                                         navigation.navigate("DetailView", {
//                                             data: element?.itemId,
//                                             itemDescription: element?.itemDescription,
//                                             brandName: element?.brandName,
//                                             productName: element?.productName,
//                                             imageUrl: element?.imageUrl,
//                                             uptainer: uptainerData,
//                                         })
//                                     }
//                                     style={styling.item}
//                                 >
//                                     <View style={styling.imageContainer}>
//                                         <Image
//                                             source={{ uri: element?.imageUrl }}
//                                             style={styling.image}
//                                         />
//                                     </View>
//                                     <Text style={styling.productNameText}>
//                                         {element?.productName}
//                                     </Text>
//                                 </TouchableOpacity>
//                             ))}
//                         </View>
//                     )}
//                 />
//             </ScrollView>
//         </View>
//     );
// };
//
// const styling = StyleSheet.create({
//     item: {
//         width: '50%',
//         aspectRatio: 1,
//         overflow: "hidden",
//         marginRight: 5,
//         marginBottom:10,
//     },
//     imageContainer: {
//         flex: 1,
//         alignItems: 'center',
//     },
//     image: {
//         width: "100%",
//         height: "100%",
//         resizeMode: "cover",
//     },
//     productNameText: {
//         flexDirection: 'row',
//         marginTop:5,
//         marginBottom:10,
//         width:"100%",
//         fontWeight: "bold",
//         fontSize: 15,
//     },
// });
//
// export default SortSpecificUptainer;
