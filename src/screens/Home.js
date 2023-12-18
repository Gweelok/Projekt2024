import React, { useState } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";

import { Backgroundstyle } from "../styles/Stylesheet";
import GlobalStyle from "../styles/GlobalStyle";

import Navigationbar from "../componets/Navigationbar";
import SortUptainers from "../componets/sortUptainers";
import SearchBox from '../componets/SearchBox';
import SearchFilter from './SearchFilter';

import { firebaseAurth } from "../utils/Firebase";
import { getItemsByName } from '../utils/Repo';
import { useEffect } from "react";

const Home = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Asks for premission to use location at home screen only, must be sent here for new users or copy paste to other screens
  console.log("start current useeffect " + firebaseAurth.currentUser);
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    } else {
      console.log("status good");
      //				let loc = await Location.getLastKnownPositionAsync({});
      let loc = await Location.getCurrentPositionAsync({});
    }
  })();

  useEffect(() => {
    async function getItemsByTextFilter() {
      try {
        const result = await getItemsByName(searchText)

        if (result.length == 0) {
          // manage error if result is empty
        }

        return setSearchResults(result)         
      } catch (error) {
        console.log('Error');
      }
    }

    if (searchText !== "") {
      getItemsByTextFilter()
    }

  }, [searchText])

  let isFilterOpen = searchText !== "" && searchResults.length >= 1 
  return (
    <View style={[Backgroundstyle.interactive_screens]}>
      <View style={GlobalStyle.BodyWrapper}>
        <SearchBox
          onChangeText={setSearchText}
          value={searchText}
          placeholderText={"SearchField.productPlaceholder"}
        /> 
        {isFilterOpen ?
          <SearchFilter 
            data={searchResults} 
            input={searchText}
          />
        : null}
        <SortUptainers navigation={navigation} />
        <Navigationbar navigation={navigation} /> 
      </View>
    </View>
  );
};

export default Home;
