import * as Location from 'expo-location';
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useState, useEffect, useCallback } from 'react';
import UptainerSearchList from "./UptainerSearchList"
import UptainerList from "./UptainerList"
import Navigationbar from "../organisms/Navigationbar"
import SearchBox from "./SearchBox"
import { windowHeight, windowWidth } from "../../utils/Dimensions"
import GlobalStyle from "../../styles/GlobalStyle"
import { calculateDistance } from '../../utils/uptainersUtils';
import { getAllUptainers } from "../../utils/Repo";

const FIND_UPTAINER = 'Find Uptainer';

const ServiceAdminContent = ({ navigation }) => {

  const [searchText, setSearchText] = useState('');
  const [uptainers, setUptainers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  //Memoize the getUserLocation and fetchUptainers functions to prevent unnecessary re-renders
  const getUserLocation = useCallback(async () => {
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
    }
  }, []);

  const fetchUptainers = useCallback(async () => {
    try {
      const uptainerList = await getAllUptainers();
      if (userLocation) {
        uptainerList.forEach(uptainer => {
          const uptainerLatitude = parseFloat(uptainer.uptainerLatitude);
          const uptainerLongitude = parseFloat(uptainer.uptainerLongitude);

          uptainer.distance = calculateDistance(
            { latitude: userLocation.latitude, longitude: userLocation.longitude },
            { latitude: uptainerLatitude, longitude: uptainerLongitude }
          );
        });
        uptainerList.sort((a, b) => a.distance - b.distance);
      }
      setUptainers(uptainerList);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching uptainers:", error);
      setLoading(false);
    }
  }, [userLocation]);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  useEffect(() => {
    fetchUptainers();
  }, [fetchUptainers]);

  //memoized with useCallback to prevent unnecessary re-renders of child components
  const handleSearchTextChange = useCallback(text => {
    setSearchText(text);
  }, []);

  return (
    <View style={[style.container, GlobalStyle.BodyWrapper]}>
      <View style={style.searchContainer}>

        <TouchableOpacity style={style.searchBox}>
          <SearchBox
            onChangeText={(text) => { setSearchText(text) }}
            value={searchText}
            placeholderText={FIND_UPTAINER}
          />
        </TouchableOpacity>


        <View>
          <UptainerSearchList
            searchText={searchText}
            loading={loading}
            uptainers={uptainers}
          />
        </View>

      </View>

      {searchText.length === 0 ? (
        <TouchableOpacity style={style.list}>
          <UptainerList loading={loading} uptainers={uptainers} />
        </TouchableOpacity>
      ) : null}

      <Navigationbar navigation={navigation} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    //Added height for the status bar to obtain the correct screen height.
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchContainer: {
    position: 'absolute',
    zIndex: 1,
    width: '80%',
  },
  container2: {
    width: '100%',
    height: '100%'
  },
  searchBox: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 50,
    width: '100%',
    flexDirection: 'row',
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginTop: 140
  }
})

export default ServiceAdminContent
