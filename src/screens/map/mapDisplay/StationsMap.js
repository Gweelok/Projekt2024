
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Alert } from 'react-native';
import SearchBox from './SearchBox';
import CustomCallout from './CustomCallout';

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
 
    const mapRef = useRef();
    const region = {
        latitude: 55.6761,
        longitude: 12.5683,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const openStationPage = (location) => {
        navigation.navigate('StationDetails', { stationDetail: location });
        console.log('onPress', location);
    };

    const handleSearch = (text) => {
        setSearchText(text);
        
        if (text === '') {
            // If there is no search text, reset the filtered locations
            setFilteredLocations(stationData);
            return;
        }
       
        // Filter locations based on the search text
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
   
    

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
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

            <SearchBox
                style={styles.searchBox}
                onChangeText={handleSearch}
                value={searchText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
        width: '80%',
    },
});

export default StationsMap;


