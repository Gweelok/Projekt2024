import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, FlatList, Image, Text } from 'react-native';

import UptainerInfo from '../Uptainer/UptainerInfo';
import NavgationButton from '../atoms/NavigationButton';
import LoadingScreen from '../../screens/Loading/LoadingScreen';

import { LoaderContext } from '../molecules/LoaderContext';
import { Buttons, styles } from '../../styles/styleSheet';
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import { getImage, getItemByUptainerId, deleteItemById  } from '../../utils/Repo';

const OverViewContent = ({ location }) => {
    const [itemList, setItemList] = useState([]);
    const [imgUrlList, setImgUrlList] = useState([]);
    const {isLoading, setIsLoading} = useContext(LoaderContext);
    const [deleteTrigger, setDeleteTrigger] = useState(false);

    const buttonText = 'Delete';
    const solvedButtonText = 'Task Solved';
    const navigationPath = 'ServiceAdminMain';

    async function fetchItems() {
        const fetchedItems = await getItemByUptainerId(location.uptainerId);
        setItemList(fetchedItems);

        // Get image URLs for each item
        const imgUrlPromises = fetchedItems.map(async item => {
            const imageUrl = await getImage(item.itemImage);
            return { id: item.itemId, url: imageUrl };
        });

        const imgUrlList = await Promise.all(imgUrlPromises);
        setImgUrlList(imgUrlList);
    }

    useEffect(() => {
        setIsLoading(true);
        fetchItems()
            .catch(error => {
                console.error("Error fetching data:", error);
                Alert.alert('Error', 'An error occurred while fetching data.');
            })
            .finally(() => setIsLoading(false));
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
                <Text style={[styles.link, style.linkText]}>{buttonText}</Text>
            </TouchableOpacity >
        </View >
    );

    return (

        <View>

            {isLoading && <LoadingScreen isLoaderShow={isLoading} />}

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

            <NavgationButton
                path={navigationPath}
                text={solvedButtonText}
                location={location}
                buttonStyle={Buttons.main_button}
                textStyle={Buttons.main_buttonText}

            />
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
    },
    linkText: {
        textAlign: 'center'
    }
});

export default OverViewContent;
