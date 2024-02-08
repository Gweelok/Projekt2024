import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllUptainers } from "../../utils/Repo";
import { dropdownStyles, Primarycolor1, Primarycolor4 } from "../../styles/styleSheet";
import GlobalStyle from "../../styles/GlobalStyle"
import { calculateDistance } from '../../utils/uptainersUtils';
import Uptainer from './Uptainer';
import Spacer from '../atoms/Spacer';

const UptainerList = () => {
    const [uptainers, setUptainers] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [effectHasRun, setEffectHasRun] = useState(false);

    //Temporary string for not found text
    const NO_UPTAINERS_FOUND = 'No uptainers found';
    const navigation = useNavigation();

    const getUptainers = async () => {
        try {
            const uptainerList = await getAllUptainers();
            // Check if userLocation is available
            if (userLocation !== null) {
                // Calculate distance for each uptainer and add it as a new property
                uptainerList.forEach((uptainer) => {
                    const uptainerLatitude = parseFloat(uptainer.uptainerLatitude);
                    const uptainerLongitude = parseFloat(uptainer.uptainerLongitude)

                    uptainer.distance = calculateDistance(
                        { latitude: userLocation.latitude, longitude: userLocation.longitude },
                        { latitude: uptainerLatitude, longitude: uptainerLongitude }
                    );                   
                });
                // Sort the uptainerList based on distance
                uptainerList.sort((a, b) => a.distance - b.distance);
            }
            setUptainers(uptainerList);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching uptainers:", error);
            setLoading(false);
        }
    };

    //Get location coords from user
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
            Alert.alert('Error fetching location. Please try again.');
            setLoading(false);
        }
    };

    const handleUptainerPress = (location) => {
        // Handle the press event, e.g., navigate to a detailed view
        console.log(`Uptainer ${location.uptainerName} pressed`);
        navigation.navigate("Uptainer", { location: location });
    };

    /*useEffect for first retriving location
     before fetching uptainer data */
    useEffect(() => {
        async function fetchLocationCoords() {
            await getUserLocation();
            setEffectHasRun(true);
        }
        fetchLocationCoords();
    }, []);

    useEffect(() => {
        async function fetchUptainersData() {
            if (effectHasRun) {
                await getUptainers()
            }
        }
        fetchUptainersData();
    }, [searchValue, effectHasRun]);

    const renderUptainers = ({ item, index }) => {
        return (
            <View style={styles.itemContainer}>
            <Uptainer
                key={index}
                location={item}
                onPress={() => handleUptainerPress(item)}
                index={index}
                styling={[
                    dropdownStyles.dropdownListItem2,
                    styles.lastItem,
                ]}
                distance={item.distance}
            />
            
            <Spacer height={25}></Spacer>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size='large' color='black' />
            ) : uptainers.length !== 0 ? (
                <FlatList
                    data={uptainers}
                    keyExtractor={(item) => item.uptainerName}
                    style={[styles.uptainerList]}
                    renderItem={renderUptainers}
                />
            ) : (
                <Text style={[styles.notFound]}>
                    {NO_UPTAINERS_FOUND}
                </Text>
            )}
        </View>
    );

};

const styles = StyleSheet.create(
    {
        itemContainer: 20,
        lastItem: { borderBottomWidth: 3 },
        uptainerList: {
            width: '100%',
        },
    });

export default UptainerList;