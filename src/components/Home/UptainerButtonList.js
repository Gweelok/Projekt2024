import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, } from 'react-native';
import { getAllUptainers, signInUser } from "../../utils/Repo";
import { dropdownStyles } from "../../styles/styleSheet";
import { calculateDistance } from '../../utils/uptainersUtils';
import UptainerLocation from './UptainerLocationButton';

/****************************************
Only for purpose of reaching db in test!!
Needs to be removed later on   
****************************************/
signInUser('prova@gmail.com', '123456', 'UptainerButtonList');
/***************************************
***************************************/


const UptainerButtonList = () => {
    const [filteredLocations, setFilteredLocations] = useState(filteredLocations);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const uptainerList = await getAllUptainers();
            setFilteredLocations(uptainerList);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        fetchData();

        const getUserLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    // Handle denied permission
                    setLoading(false);
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                setUserLocation(location.coords);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching location:', error);
                setLoading(false);
            }
        };

        getUserLocation();
    }, []);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color='black' />
            </View>
        );
    }

    const userLatitude = userLocation?.latitude || 0;
    const userLongitude = userLocation?.longitude || 0;

    const renderItem = ({ item, index }) => {
        const distance = calculateDistance(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: parseFloat(item.uptainerLat), longitude: parseFloat(item.uptainerLong) }
        );

        return (
            <UptainerLocation
                location={item}
                onPress={() => handleUptainerPress(item)}
                index={index}
                styling={[
                    dropdownStyles.dropdownListItem2,
                    index === filteredLocations.length - 1 ? styles1.lastItem : null,
                ]}
                userLatitude={userLatitude}
                userLongitude={userLongitude}
                distance={distance}
            />
        );
    };

    const handleUptainerPress = (location) => {
        // Handle the press event, e.g., navigate to a detailed view
        console.log(`Uptainer ${location.uptainerName} pressed`);
    };

    //Remove Margin later if needed
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 16, marginTop: 150 }}>
            <FlatList
                data={filteredLocations}
                keyExtractor={(item) => item.uptainerName}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles1 = StyleSheet.create({ lastItem: { borderBottomWidth: 3 } });

export default UptainerButtonList;