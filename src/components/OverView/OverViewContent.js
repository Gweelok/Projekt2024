import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import UptainerInfo from '../Uptainer/UptainerInfo';
import NavgationButton from '../atoms/NavigationButton';
import LoadingScreen from '../../screens/LoadingScreen';
import { LoaderContext } from '../molecules/LoaderContext';
import GlobalStyle from '../../styles/GlobalStyle';
import { Buttons } from '../../styles/styleSheet';
import { getItemByUptainerId } from '../../utils/Repo';

const OverViewContent = ({ location }) => {
    const [itemList, setItemList] = useState([]);
    const [imgUrlList, setImgUrlList] = useState([]);
    const { isLoading, setIsLoading } = useContext(LoaderContext);
    const [deleteTrigger, setDeleteTrigger] = useState(false);

    const deleteButtonText = 'Delete';
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
                console.error('Error fetching data:', error);
                Alert.alert('Error', 'An error occurred while fetching data.');
            })
            .finally(() => setIsLoading(false));
    }, [location.uptainerId, deleteTrigger]);

    async function handleLinkPress(itemId) {
        try {
            setIsLoading(true);
            if (!(await deleteItemById(itemId))) {
                throw new Error('An error occurred while trying to remove item');
            } else {
                await fetchItems();
                setDeleteTrigger(prev => !prev);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', error.toString(), [{ text: 'OK' }]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View style={[style.container, GlobalStyle.BodyWrapper]}>

            {isLoading && <LoadingScreen isLoaderShow={isLoading} />}

            <UptainerInfo location={location} />
            {!isLoading && (
                <OverViewContent
                    itemList={itemList}
                    imgUrlList={imgUrlList}
                    isLoading={isLoading}
                    handleLinkPress={handleLinkPress}
                />
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
};

export default OverViewContent;
