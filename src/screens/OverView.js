import { View, StyleSheet, Image, FlatList, Text, TouchableOpacity, Alert } from "react-native"
import { useEffect, useState } from "react";

import UptainerInfo from "../components/Uptainer/UptainerInfo"

import GlobalStyle from "../styles/GlobalStyle"
import { styles } from "../styles/styleSheet"

import { windowHeight, windowWidth } from "../utils/Dimensions"
import { getImage, getItemByUptainerId, deleteItemById } from "../utils/Repo";

const OverView = ({ route }) => {
    //const { location } = route.params;  <----- Use this later 
    const [itemList, setItemList] = useState([]);
    const [imgUrlList, setImgUrlList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false); // State to trigger refetch

    const buttonText = 'Delete';
    //Should be replaced later with route param from Main-page  
    const location = {
        "uptainerId": "-NbzQlf95xoexGIlcIpY",
        "url": "https://reactjs.org/logo-og.png",
        "uptainerName": "KU Lighthouse",
        "uptainerStreet": "Tagensvej 16A",
        "uptainerCity": "Nörrebro"
    }

    async function fetchItems() {
        const fetchedItems = await getItemByUptainerId(location.uptainerId)
        setItemList(fetchedItems);
    }

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            try {
                await fetchItems();

                const imgUrlPromises = itemList.map(async item => {
                    const imageUrl = await getImage(item.itemImage);
                    return { id: item.itemId, url: imageUrl };
                });

                const imgUrlList = await Promise.all(imgUrlPromises);
                setImgUrlList(imgUrlList);

            } catch (error) {
                console.error("Error fetching data:", error);
                Alert.alert('Error', 'An error occurred while fetching data.');
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [location.uptainerId, deleteTrigger]);

    async function handleLinkPress(itemId) {
        try {
            setIsLoading(true);
            if (!await deleteItemById(itemId)) {
                throw new Error("An error occured while trying to remove item");
            } else {
                await fetchItems(); 
                setDeleteTrigger(prev => !prev);
            }
        } catch (error) {
            console.log(error)
            Alert.alert(
                'Error', error.toString(),
                [{ text: 'OK', }],
            );
        } finally {
            setIsLoading(false)
        }
    }
    //For rendering Image & Link
    const renderItem = ({ item }) => (
        <View>
            <Image source={{ uri: item.url }} style={{ width: 100, height: 100, margin: 20, marginBottom: 10 }} />

            <TouchableOpacity disabled={isLoading} onPress={() => handleLinkPress(item.id)}>
                <Text style={styles.link}>{buttonText}</Text>
            </TouchableOpacity >
        </View >
    );

    return (
        <View style={[style.container, GlobalStyle.BodyWrapper]}>
            <UptainerInfo location={location} />

            {!isLoading && (
                <View style={style.list}>
                    <FlatList
                        data={imgUrlList}
                        extraData={itemList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                    />
                </View>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        marginTop: 40,
        alignItems: 'center',
    },
    list: {
        height: 300
    }
});

export default OverView
