
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {StyleSheet, View, Alert, TouchableOpacity, Text, ScrollView} from 'react-native';
import SearchBox from '../../../componets/SearchBox'
import CustomCallout from './CustomCallout';
import GlobalStyle from "../../../styles/GlobalStyle";
import {
    dropdownStyles,
    Primarycolor1,
    Primarycolor2,
    Primarycolor3,
    Primarycolor4,
    styles
} from "../../../styles/Stylesheet";
import * as Location from 'expo-location';



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

const StationsMap = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [filteredLocations, setFilteredLocations] = useState(stationData);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSearchResults, setShowSearchResults] = useState(true);
    const mapRef = useRef();

    useEffect(() => {
        const getUserLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission to access location was denied');
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
        return <View><Text>Loading...</Text></View>;
    }

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance.toFixed(2);
    };

    const userLatitude = userLocation.latitude;
    const userLongitude = userLocation.longitude;

    const region = {
        latitude: 55.6761,
        longitude: 12.5683,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const sortLocationsByDistance = () => {
        const sortedLocations = [...filteredLocations].sort((a, b) => {
            const distanceA = calculateDistance(
                userLatitude,
                userLongitude,
                parseFloat(a.uptainerLat),
                parseFloat(a.uptainerLong)
            );
            const distanceB = calculateDistance(
                userLatitude,
                userLongitude,
                parseFloat(b.uptainerLat),
                parseFloat(b.uptainerLong)
            );
            return parseFloat(distanceA) - parseFloat(distanceB);
        });

        return sortedLocations;
    };

    const openStationPage = (location) => {
        navigation.navigate('StationDetails', { stationDetail: location });
        console.log('onPress', location);
    };

    const handleSearch = (text) => {
        setSearchText(text);

        if (text === '') {
            setFilteredLocations(stationData);
            return;
        }

        const filtered = stationData.filter(
            (location) =>
                location.uptainerName.toLowerCase().includes(text.toLowerCase()) ||
                location.uptainerStreet.toLowerCase().includes(text.toLowerCase()) ||
                location.uptainerCity.toLowerCase().includes(text.toLowerCase()) ||
                location.uptainerZip.includes(text)
        );

        setFilteredLocations(filtered);

        if (filtered.length === 0) {
            Alert.alert('No stores found. Please check the address');
        }
    };

    const sortedLocations = sortLocationsByDistance();

    const selectStation = (location) => {
        mapRef.current.animateToRegion({
            latitude: parseFloat(location.uptainerLat),
            longitude: parseFloat(location.uptainerLong),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });

        setShowSearchResults(false);
    };

    const lastIndex = sortedLocations.length - 1;

    const toggleSearchResults = () => {
        setShowSearchResults(!showSearchResults);
    };
    return (
        <View style={styles1.container}>
            <MapView
                ref={mapRef}
                style={styles1.map}
                initialRegion={region}
                showsUserLocation={true}
            >
                {filteredLocations.map((location) => (
                    <Marker
                        key={location.uptainerName}
                        coordinate={{
                            latitude: parseFloat(location.uptainerLat),
                            longitude: parseFloat(location.uptainerLong),
                        }}
                        image={require('../../../../assets/images/marker_bg.jpg')}
                    >
                        <Callout tooltip={false} onPress={() => openStationPage(location)}>
                            <CustomCallout currentLocation={location} />
                        </Callout>
                    </Marker>
                ))}
            </MapView>

            {/* Search bar */}
            <View style={[GlobalStyle.BodyWrapper, styles1.searchBox]} onTouchStart={toggleSearchResults}>
                <SearchBox
                    onChangeText={handleSearch}
                    value={searchText}
                    placeholderText={'SearchField.mapPlaceholder'}
                />
            </View>

            {/* List of sorted locations */}
            {showSearchResults && (
            <ScrollView style={[GlobalStyle.BodyWrapper, dropdownStyles.dropdownContainer2]}>
                {sortedLocations.map((location, index) => (
                    <TouchableOpacity
                        key={location.uptainerName}
                        onPress={() => {
                            selectStation(location);
                        }}
                        style={[
                            dropdownStyles.dropdownListItem2,
                            index === lastIndex ? styles1.lastItem : null,
                        ]}
                    >
                        <View style={styles1.stationInfo}>
                            <View>
                                <Text style={styles1.stationName}>{location.uptainerName}</Text>
                                <View style={styles1.addressInfo}>
                                    <Text style={[styles.article_text, styles1.stationAddress]}>{`${location.uptainerStreet}, ${location.uptainerCity}`}</Text>
                                    <View style={styles1.spacer} />
                                    <Text style={styles1.distance}>{` ${calculateDistance(
                                        userLatitude,
                                        userLongitude,
                                        parseFloat(location.uptainerLat),
                                        parseFloat(location.uptainerLong)
                                    )} km`}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                ))}
            </ScrollView>
            )}
        </View>
    );

};

const styles1 = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    searchBox: {
        position: 'absolute',
        zIndex: 1,
        marginTop: 50,
        width: '100%',
    },
    stationInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    stationName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        color: Primarycolor1,
    },
    addressInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stationAddress: {
        fontSize: 12,
        marginBottom: 2,
        color:Primarycolor1,
        width:"80%"
    },

    distance: {
        width:"20%",
        fontSize: 12,
        color: Primarycolor1,
        alignItems:"center"
    },
    lastItem: {
        borderBottomWidth: 3,
    },

});

export default StationsMap;


