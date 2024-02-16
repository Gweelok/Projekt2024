import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, FlatList, Image, Text } from 'react-native';

import UptainerInfo from '../Uptainer/UptainerInfo';
import NavgationButton from '../atoms/NavigationButton';
import LoadingScreen from '../../screens/LoadingScreen';

import { LoaderContext } from '../molecules/LoaderContext';
import { TaskContext } from '../../context/TaskContext';

import { Buttons, styles } from '../../styles/styleSheet';
import { getImage, getItemByUptainerId, deleteItemById } from '../../utils/Repo';

const OverViewContent = ({ location }) => {
    const [itemList, setItemList] = useState([]);
    const [imgUrlList, setImgUrlList] = useState([]);
    const { isLoading, setIsLoading } = useContext(LoaderContext);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const { setIsSolved } = useContext(TaskContext);

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

    const handleOverviewSolved = () => {
        setIsSolved(prevState => ({
            ...prevState,
            overview: true
        }));
    };

    // Call handleOverviewSolved wherever you need it
    const onPressMarkSolved = () => {
        handleOverviewSolved();
    };

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


        <View style={style.container}>

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
                disabled={false}
                path={navigationPath}
                text={solvedButtonText}
                param={location}
                buttonStyle={Buttons.main_button}
                textStyle={Buttons.main_buttonText}
                callback={onPressMarkSolved}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    list: {
        height: 300
    },
    linkText: {
        textAlign: 'center'
    }
});

export default OverViewContent;
