import React, {useState} from 'react';
import MapView, {Callout, Marker} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';
import SearchBox from "./SearchBox";
import CustomCallout from "./CustomCallout";

const CopenhagenLocations = [
    // todo  get stations from server database
    {
        id: 1,
        name: 'KU Lighthouse',
        address: "Tagensvej 16A, 2200 København",
        latitude: 55.697733214205,
        longitude:  12.559954477291
    },
    {
        id: 2,
        name: 'COOP 365',
        address: "Vigerslev Allé 124, 2500 København",
        latitude: 55.661102,
        longitude: 12.505218
    },
    {
        id: 4,
        name: 'Rosenborg Castle',
        address: "Stockflethsvej 2, 2000 København",
        latitude: 55.6867,
        longitude: 12.5783
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
