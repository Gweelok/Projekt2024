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
import SearchedItems from "../componets/SearchedItems";



const Home = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [itemSelected, setItemSelected] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [hideUptainers, setHideUptainers] = useState(false)

  const endSearch = () => {
    setSearchText("")
    setItemSelected(false)
  }
  const handleSearch = (input) =>{
    setSearchText(input)
    if (itemSelected) { setItemSelected(false) }
    if (hideUptainers) {setHideUptainers(false)}
  }
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
      setUserLocation(loc.coords)
    }
  })();

  useEffect(() => {

    async function getItemsByTextFilter() {
      try {
        setIsLoading(true)
        const result = await getItemsByName(searchText)
        if (result.length === 0) {
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
      <View style={[GlobalStyle.BodyWrapper]}>         
          <View style={{zIndex: 1}}>
            <SearchBox
              onChangeText={handleSearch}
              value={searchText}
              placeholderText={"SearchField.productPlaceholder"}
            />
            {(searchText && !itemSelected) ?
              <SearchFilter 
                data={searchResults} 
                input={searchText}
                isLoading={isLoading}
                setItemSelected={setItemSelected}
                setSearchText={setSearchText}
              />
              : null
            }
          </View>
            {(searchText && itemSelected) &&
            <SearchedItems endSearch={endSearch} navigation={navigation}
              search={searchText} userLocation={userLocation} setHideUptainers={setHideUptainers}/>
            }
        <SortUptainers navigation={navigation} hideUptainers={hideUptainers} />
        <Navigationbar navigation={navigation} /> 
      </View>
    </View>
  );
};

export default Home;
