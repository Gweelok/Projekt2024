import React, { useEffect, useRef, useState } from "react";
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

const StationsMap = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [sortedUptainers, setSortedUptainers] = useState([]);
  const mapRef = useRef();
  const isLoaderShow = false;
  const { currentLanguage } = useLanguage();
  const markersRef = useRef({});

  useEffect(() => {
    const getData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);

        const allUptainers = await getAllUptainers();
        setFilteredLocations(allUptainers);
        if (location.coords) {
          const sortedUptainers = location.coords
            ? await sortUptainersByDistance(location.coords, allUptainers)
            : allUptainers;

          setSortedUptainers(sortedUptainers);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error fetching data. Please try again.");
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  if (loading) {
    return (
      <View style={stationMapStyles.activityIndicator}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  const userLatitude = userLocation?.latitude || 0;
  const userLongitude = userLocation?.longitude || 0;

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
        location.uptainerZip.toString().includes(text)
    );

    setFilteredLocations(filtered);

    if (filtered.length === 0) {
      setFilteredLocations([]);
    }
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

  const lastIndex = sortedUptainers.length - 1;

  const toggleSearchResults = () => {
    setShowSearchResults(true);
  };
  return (
    <View style={stationMapStyles.container}>
      <MapView
        ref={mapRef}
        style={stationMapStyles.map}
        initialRegion={region}
        showsUserLocation={true}
      >
        {filteredLocations.map((location) => (
          <Marker
            ref={(marker) =>
              (markersRef.current[location.uptainerName] = marker)
            }
            key={location.uptainerName}
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
        onTouchStart={toggleSearchResults}
      >
        <SearchBox
          onChangeText={handleSearch}
          value={searchText}
          placeholderText={"SearchField.mapPlaceholder"}
        />
      </View>

      {/* List of sorted locations */}
      {showSearchResults && (
        <ScrollView style={stationMapStyles.list}>
          {filteredLocations.length > 0 ? (
            userLatitude === 0 && userLongitude === 0 ? (
              filteredLocations.map((location, index) => (
                <SearchedLocation
                  location={location}
                  onPress={() => {
                    selectStation(location);
                  }}
                  index={index}
                  styling={[
                    stationMapStyles.dropdownListItem,
                    index === lastIndex ? stationMapStyles.lastItem : null,
                  ]}
                  userLatitude={null}
                  userLongitude={null}
                ></SearchedLocation>
              ))
            ) : (
              sortedUptainers.map((location, index) => (
                <SearchedLocation
                  location={location}
                  onPress={() => {
                    selectStation(location);
                  }}
                  index={index}
                  styling={[
                    stationMapStyles.dropdownListItem,
                    index === lastIndex ? stationMapStyles.lastItem : null,
                  ]}
                  userLatitude={userLatitude}
                  userLongitude={userLongitude}
                ></SearchedLocation>
              ))
            )
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
