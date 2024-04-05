import React, { useContext, useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, Alert, Text, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SearchBox from "../../SearchBox/SearchBox";
import CustomCallout from "../custom-callout/CustomCallout";
import SearchedLocation from "../searched-location/SearchedLocation";

import stationMapStyles from "./stationsMapStyles";

import * as Location from "expo-location";
import { t, useLanguage } from "../../../languages/LanguageHandler";
import { sortUptainersByDistance } from "../../../utils/uptainersUtils";

import { getAllUptainers } from "../../../utils/Repo/Uptainers";
import Screens from "../../../utils/ScreenPaths";
import { LoaderContext } from "../../../contexts/LoaderContext/LoaderContext";
import { Permissions } from "../../../utils/Permissions";
import { Keyboard } from "react-native";

const StationsMap = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [sortedUptainers, setSortedUptainers] = useState([]);
  const mapRef = useRef();
  const isLoaderShow = false;
  const { currentLanguage } = useLanguage();
  const markersRef = useRef({});

  useEffect(() => {
    const getData = async () => {
      try {
        try {
          const location = await Permissions.getLocation()

          setUserLocation(location);

          const allUptainers = await getAllUptainers();
          setFilteredLocations(allUptainers);
          if (location) {
            const sortedUptainers = await sortUptainersByDistance(location, allUptainers)


            setSortedUptainers(sortedUptainers);
          } else setSortedUptainers(allUptainers)

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          Alert.alert("Error", t("LocationPermission.error", currentLanguage));
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
        Alert.alert("Error fetching data. Please try again.");
      }
    };

    setIsLoading(true)
    getData();
  }, []);



  const region = {
    latitude: 55.6761,
    longitude: 12.5683,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const openStationPage = (location) => {
    navigation.navigate(Screens.STATION_DETAILS, { stationDetail: location });
    console.log("onPress", location);
  };

  const handleSearch = (text) => {
    setSearchText(text);

    if (text === "") {
      setFilteredLocations(sortedUptainers);
      return;
    }

    const filtered = sortedUptainers.filter(
      (location) =>
        location.uptainerName.toLowerCase().includes(text.toLowerCase()) ||
        location.uptainerStreet.toLowerCase().includes(text.toLowerCase()) ||
        location.uptainerCity.toLowerCase().includes(text.toLowerCase()) ||
        location.uptainerDescription.toLowerCase().includes(text.toLowerCase()) ||
        location.uptainerZip.toString().includes(text)
    );

    setFilteredLocations(filtered);

  };

  const selectStation = (location) => {
    mapRef.current.animateToRegion({
      latitude: parseFloat(location.uptainerLatitude),
      longitude: parseFloat(location.uptainerLongitude),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    setSearchText(location.uptainerName);
    setShowSearchResults(false);

    const selectedMarkerRef = markersRef.current[location.uptainerName];
    if (selectedMarkerRef) {
      selectedMarkerRef.showCallout();
    }
  };



  const endSearch = () => {
    if (showSearchResults) {
      setShowSearchResults(false)
      Keyboard.dismiss()
    }
  }

  return (
    <View style={stationMapStyles.container}>
      <MapView
        ref={mapRef}
        style={stationMapStyles.map}
        initialRegion={region}
        showsUserLocation={true}
        onTouchStart={endSearch}
      >
        {filteredLocations.map((location, index) => (
          <Marker
            ref={(marker) =>
              (markersRef.current[location.uptainerName] = marker)
            }
            key={index}
            coordinate={{
              latitude: parseFloat(location.uptainerLatitude),
              longitude: parseFloat(location.uptainerLongitude),
            }}
            image={require("../../../../assets/images/marker_bg.jpg")}
          >
            <Callout tooltip={false} onPress={() => openStationPage(location)}>
              <CustomCallout currentLocation={location} />
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View
        style={stationMapStyles.searchBox}
        onTouchStart={()=>{setShowSearchResults(true)}}
      >
        <SearchBox
          onChangeText={handleSearch}
          value={searchText}
          placeholderText={"SearchField.mapPlaceholder"}
        />
      </View>

      {/* List of searched locations */}
      {showSearchResults && (
        <ScrollView style={stationMapStyles.list}>
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location, index) => (
              <SearchedLocation
                location={location}
                onPress={() => {
                  selectStation(location);
                }}
                key={index}
                styling={[
                  stationMapStyles.dropdownListItem,
                  index === filteredLocations.length - 1 ? stationMapStyles.lastItem : null,
                ]}
                userLatitude={userLocation?.latitude}
                userLongitude={userLocation?.longitude}
              ></SearchedLocation>
            ))

          ) : (
            <View style={stationMapStyles.noUptainerContainer}>
              <Text style={stationMapStyles.noUptainerText}>
                {t("StationsScreen.NoUptainers", currentLanguage)}
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default StationsMap;
