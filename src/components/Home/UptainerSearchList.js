
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { dropdownStyles, Primarycolor1, Primarycolor4 } from "../../styles/styleSheet";
import Uptainer from './Uptainer';

const UptainerSearchList = ({ searchText, loading, uptainers }) => {

    const [sortedListed, setSortedList] = useState([]);

    //Temporary string for not found text
    const NO_UPTAINERS_FOUND = 'No uptainers found';
    const navigation = useNavigation();

    async function sortUptainers(uptainers) {
        // Sort the uptainerList based on distance
        uptainers.sort((a, b) => a.distance - b.distance);
        //Filter uptainers by search-string if it's available.
        const filteredUptainerList = uptainers.filter(item =>
            item.uptainerName.toLowerCase().includes(searchText.toLowerCase()) ||
            item.uptainerStreet.toLowerCase().includes(searchText.toLowerCase()) ||
            item.uptainerCity.toLowerCase().includes(searchText.toLowerCase()) ||
            item.uptainerZip.toString().includes(searchText)
        );
        
        return filteredUptainerList;
    };

    const handleUptainerPress = (location) => {
        navigation.navigate("ServiceAdminMain", { location: location });
    };

    useEffect(() => {
        console.log('render')
        async function sort(){
            const filterdList = await sortUptainers(uptainers);
            console.log(filterdList)
            setSortedList(filterdList)
        }
        sort();
    }, [searchText]);

    const renderUptainers = ({ item, index }) => {
        return (
            <Uptainer
                key={index}
                location={item}
                onPress={() => handleUptainerPress(item)}
                index={index}
                styling={[
                    dropdownStyles.dropdownListItem2,
                    index === sortedListed.length - 1 ? styles.lastItem : null,
                ]}
                distance={item.distance}
            />
        );
    };

    return (
        <View>
            {loading ? (
                <ActivityIndicator size='large' color='black' />
            ) : sortedListed.length !== 0 && searchText.length !== 0 ? (
                <FlatList
                    data={sortedListed}
                    keyExtractor={(item) => item.uptainerName}
                    style={[styles.uptainerList]}
                    renderItem={renderUptainers}
                />
            ) : sortedListed.length === 0 && searchText.length > 0 ? (
                <Text style={[styles.notFound]}>
                    {NO_UPTAINERS_FOUND}
                </Text>
            ) : null} 
        </View>
    );

};

const styles = StyleSheet.create(
    {
        lastItem: { borderBottomWidth: 3 },
        uptainerList: {
            marginTop: 87,
            width: '100%',
        },
        notFound: {
            marginTop: 87,
            borderWidth: 3,
            minHeight: 80,
            width: '100%',
            textAlign: 'center',
            textAlignVertical: 'center',
            backgroundColor: 'white',
            borderColor: Primarycolor1,
            color: Primarycolor4,
            zIndex: 1,
            justifyContent: 'center',
            alignSelf: 'center'
        }
    });

export default UptainerSearchList;