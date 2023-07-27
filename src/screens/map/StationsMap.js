import React, {useState} from 'react';
import MapView, {Callout, Marker} from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import SearchBox from "./SearchBox";
import CustomCallout from "./CustomCallout";
import CustomMarkerView from "./CustomMarkerView";
import {Primarycolor1} from "../../styles/Stylesheet";

const CopenhagenLocations = [
    // todo  get stations from server database
    { id: 1, name: 'Tivoli Gardens', latitude: 55.6737, longitude: 12.5685 },
    { id: 2, name: 'The Little Mermaid', latitude: 55.6926, longitude: 12.5993 },
    { id: 4, name: 'Rosenborg Castle', latitude: 55.6867, longitude: 12.5783 },
    { id: 5, name: 'Amalienborg Palace', latitude: 55.6846, longitude: 12.5949 },
    { id: 7, name: 'Round Tower', latitude: 55.6816, longitude: 12.5753 },
    { id: 8, name: 'The National Museum', latitude: 55.6761, longitude: 12.5763 },
    { id: 9, name: 'The Black Diamond', latitude: 55.6783, longitude: 12.6032 },
    { id: 10, name: 'Frederik\'s Church', latitude: 55.6840, longitude: 12.5905 },
];

const StationsMap = ({ navigation }) => {
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
        navigation.navigate('StationDetails');
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
                        image={require('../../../assets/images/marker_bg.jpg')}
                    >
                        <Callout tooltip={false}  onPress={() => openStationPage(location)}>
                            <CustomCallout currentLocation={location} />
                        </Callout>
                     </Marker>
                ))}
            </MapView>

            <SearchBox style={styles.searchBox} onChangeText={setSearchText} value={searchText} />
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
