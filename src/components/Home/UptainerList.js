import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
import { getAllUptainers } from "../../utils/Repo";
import { dropdownStyles, Primarycolor1, Primarycolor4} from "../../styles/styleSheet";
import GlobalStyle from "../../styles/GlobalStyle"
import { calculateDistance } from '../../utils/uptainersUtils';
import Uptainer from './Uptainer';

const UptainerList = ({ searchValue }) => {
    const [uptainers, setUptainers] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [effectHasRun, setEffectHasRun] = useState(false);
    const NO_UPTAINERS_FOUND = 'No uptainers found';

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

            //Filter uptainers by search string if it's available.
            if (searchValue !== '') {
                const filteredUptainerList = uptainerList.filter(item =>
                    item.uptainerName.toLowerCase().includes(searchValue.toLowerCase()) ||
                    item.uptainerStreet.toLowerCase().includes(searchValue.toLowerCase()) ||
                    item.uptainerCity.toLowerCase().includes(searchValue.toLowerCase())
                );

                //Return filtered search
                setUptainers(filteredUptainerList);
                setLoading(false);
                return;
            }
            //Return unfiltered search
            setUptainers(uptainerList);
            setLoading(false);
        } catch (error) {
            console.log("Error:", error);
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
        }
    };

    const handleUptainerPress = (location) => {
        // Handle the press event, e.g., navigate to a detailed view
        console.log(`Uptainer ${location.uptainerName} pressed`);
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
            <Uptainer
                key={index}
                location={item}
                onPress={() => handleUptainerPress(item)}
                index={index}
                styling={[
                    dropdownStyles.dropdownListItem2,
                    index === uptainers.length - 1 ? styles1.lastItem : null,
                ]}
                distance={item.distance}
            />
        );
    };

    return (
        <View style={styles1.container}>
            {loading ? (
                <ActivityIndicator size='large' color='black' />
            ) : uptainers.length !== 0 ? (
                <FlatList
                    data={uptainers}
                    keyExtractor={(item) => item.uptainerName}
                    style={[GlobalStyle.BodyWrapper, styles1.uptainerList]}
                    renderItem={renderUptainers}
                />
            ) : (
                <Text style={[GlobalStyle.BodyWrapper, styles1.notFound]}>
                    {NO_UPTAINERS_FOUND}
                </Text>
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
        },
        notFound: {
            marginTop: 87,
            borderWidth: 3,
            minHeight: 80,
            width: '90%',
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

export default UptainerList;