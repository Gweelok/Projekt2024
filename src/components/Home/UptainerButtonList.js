import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator,  } from 'react-native';
import {dropdownStyles, styles} from "../../styles/styleSheet";

//import {t, useLanguage} from "../languages/LanguageHandler";
import { calculateDistance } from '../../utils/uptainersUtils';
import UptainerLocation from './UptainerLocationButton';


//!!Remove later!!
const stationData = [
    {
        uptainerName: "Det Bæredygtige Forsamlingshus",
        uptainerQR: "https://www.google.com",
        uptainerStreet: "Stockflethsvej 2",
        uptainerZip: "2000",
        uptainerCity: "Frederiksberg",
        uptainerImage: "UPT1.jpg",
        uptainerDescription: "I nærheden af Det Bæredygtige Forsamlingshus",
        uptainerLat: "55.686256",
        uptainerLong: "12.519641697795900",
    },
    {
        uptainerName: "KU Lighthouse",
        uptainerQR: "https://www.google.com",
        uptainerStreet: "Tagensvej 16A",
        uptainerZip: "2200",
        uptainerCity: "Nørrebro",
        uptainerImage: "UPT2.jpg",
        uptainerDescription: "I nærheden af KU Lighthouse",
        uptainerLat: "55.697947",
        uptainerLong: "12.560119055467000",
    },
    {
        uptainerName: "COOP 365",
        uptainerQR: "https://www.google.com",
        uptainerStreet: "Vigerslev Allé 124",
        uptainerZip: "2500",
        uptainerCity: "Valby",
        uptainerImage: "UPT3.jpg",
        uptainerDescription: "I nærheden af COOP 365",
        uptainerLat: "55.661317",
        uptainerLong: "12.50583269168790",
    },
];

const StationsMap = () => {
    const [filteredLocations, setFilteredLocations] = useState(stationData);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const mapRef = useRef();

    useEffect(() => {
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

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(loadingTimer);
    }, []);

    if (loading) {
        return (
            <View style={styles.MainContainer}>
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
        <View style={{ justifyContent: 'center',alignItems: 'center', margin: 16 , marginTop: 150}}>
            <FlatList
                data={filteredLocations}
                keyExtractor={(item) => item.uptainerName}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles1 = StyleSheet.create({
    lastItem: {
        borderBottomWidth: 3,
    },
});

export default StationsMap;