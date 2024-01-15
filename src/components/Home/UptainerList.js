import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, } from 'react-native';
import { getAllUptainers } from "../../utils/Repo";
import { dropdownStyles } from "../../styles/styleSheet";
import GlobalStyle from "../../styles/GlobalStyle"
import { calculateDistance } from '../../utils/uptainersUtils';
import Uptainer from './Uptainer';

const UptainerList = () => {
    const [uptainers, setUptainers] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUptainers = async () => {
        try {
            const uptainerList = await getAllUptainers();
            setLoading(false);
            setUptainers(uptainerList);
        } catch (error) {
            setLoading(false);
            console.log("Error:", error);
        }
    };

    const getUserLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    const handleUptainerPress = (location) => {
        // Handle the press event, e.g., navigate to a detailed view
        console.log(`Uptainer ${location.uptainerName} pressed`);
    };

    useEffect(() => {
        async function getLocationAndData() {
            await getUserLocation();
            await getUptainers();
        }
        getLocationAndData();
    }, []);

    const renderUptainers = ({ item, index }) => {
        const userLatitude = userLocation?.latitude || 0;
        const userLongitude = userLocation?.longitude || 0;

        const uptainerLatitude = item.uptainerLatitude;
        const uptainerLongitude = item.uptainerLongitude;

        const distance = calculateDistance(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: parseFloat(uptainerLatitude), longitude: parseFloat(uptainerLongitude) }
        );

        return (
            <Uptainer
                key={index}
                location={item}
                onPress={() => handleUptainerPress(item)}
                index={index}
                styling={[
                    dropdownStyles.dropdownListItem2,
                    index === uptainers.length - 1 ? styles1.lastItem : null,
                ]}
                distance={distance}
            />
        );
    };

    return (
        <View style={styles1.container}>
            {loading ? (
                <ActivityIndicator size='large' color='black' />
            ) : (
                <FlatList
                    data={uptainers}
                    keyExtractor={(item) => item.uptainerName}
                    style={[GlobalStyle.BodyWrapper, styles1.uptainerList]}
                    renderItem={renderUptainers}
                />
            )}
        </View>
    );
};

const styles1 = StyleSheet.create(
    {
        lastItem: { borderBottomWidth: 3 },
        uptainerList: {
            position: 'absolute',
            zIndex: 1,
            marginTop: 87,
            width: '100%',
        }
    });

export default UptainerList;