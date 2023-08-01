import React, {useState} from 'react';
import MapView, {Callout, Marker} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';
import SearchBox from "./SearchBox";
import CustomCallout from "./CustomCallout";

const CopenhagenLocations = [
    // todo  get stations from server database
    {
        id: 1,
        name: 'Tivoli Gardens',
        address: "Vesterbrogade 3, 1630 København V",
        latitude: 55.6737,
        longitude: 12.5685
    },
    {
        id: 2,
        name: 'The Little Mermaid',
        address: "Langelinie, 2100 København Ø",
        latitude: 55.6926,
        longitude: 12.5993
    },
    {
        id: 4,
        name: 'Rosenborg Castle',
        address: "Øster Voldgade 4A, 1350 København",
        latitude: 55.6867,
        longitude: 12.5783
    },
    {
        id: 5,
        name: 'Amalienborg Palace',
        address: "Amalienborg Slotsplads 5, 1257 København K, Amalienborg Slotsplads",
        latitude: 55.6846,
        longitude: 12.5949
    }
];

const StationsMap = ({navigation}) => {
    const [searchText, setSearchText] = useState('');

    // todo what is the focus of the map? fetch it from server?
    const region = {
        // center of Copenhagen
        latitude: 55.6761,
        longitude: 12.5683,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const openStationPage = (location) => {
        navigation.navigate('StationDetails', {stationDetail: location});
        console.log('onPress', location);
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
                showsUserLocation={true}
            >
                {CopenhagenLocations.map((location) => (
                    <Marker
                        key={location.id}
                        coordinate={{latitude: location.latitude, longitude: location.longitude}}
                        image={require('../../../../assets/images/marker_bg.jpg')}
                    >
                        <Callout tooltip={false} onPress={() => openStationPage(location)}>
                            <CustomCallout currentLocation={location}/>
                        </Callout>
                    </Marker>
                ))}
            </MapView>

            <SearchBox style={styles.searchBox} onChangeText={setSearchText} value={searchText}/>
            {/*  todo the action when user search something in searchBox hasn't be defined, leave it to be done in the future  */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

    searchBox: {
        position: 'absolute',
        zIndex: 1,
    }
});

export default StationsMap;
