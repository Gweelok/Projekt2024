import React, { useState } from "react";
import { View } from "react-native";
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
  const [notMatchingProduct, setNotMatchingProduct] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
    setNotMatchingProduct(false);
    
    async function getItemsByTextFilter() {
      try {
        setIsLoading(true)
        const result = await getItemsByName(searchText)
        if (result.length === 0) {
          setNotMatchingProduct(true)
          setSearchResults([])
        } else {
          setSearchResults(result)
        }
      } catch (error) {
        console.log('Error', error);
      } finally {
        setIsLoading(false)
      }
    }

    if (searchText) {
      getItemsByTextFilter()
    }

  }, [searchText])

  return (
    <View style={[Backgroundstyle.interactive_screens]}>
      <View style={GlobalStyle.BodyWrapper}>
        <SearchBox
          onChangeText={setSearchText}
          value={searchText}
          placeholderText={"SearchField.productPlaceholder"}
        />
        {searchText ?
          <SearchFilter 
            data={searchResults} 
            input={searchText}
            error={notMatchingProduct}     
            isLoading={isLoading}
          />
          : null
        }
        <SortUptainers navigation={navigation} />
        <Navigationbar navigation={navigation} /> 
      </View>
    </View>
  );
};

export default Home;
