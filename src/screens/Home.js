import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

import { Backgroundstyle } from "../styles/Stylesheet";
import GlobalStyle from "../styles/GlobalStyle";

import Navigationbar from "../componets/Navigationbar";
import SortUptainers from "../componets/sortUptainers";
import SearchBox from '../componets/SearchBox';

import SearchFilter from '../componets/SearchFilter';

import { getItemsByName } from '../utils/Repo';
import { useEffect } from "react";
import SearchedItems from "../componets/SearchedItems";
import { Permissions } from "../utils/Permissions";
import { t, useLanguage } from "../Languages/LanguageHandler";

const Home = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notMatchingProduct, setNotMatchingProduct] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [itemSelected, setItemSelected] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [noProductFoundErr, setNoProductFoundErr] = useState(false)
  const{currentLanguage}=useLanguage()

  const endSearch = () => {
    setSearchText("")
    setItemSelected(false)
  }
  const handleSearch = (input) => {
    setSearchText(input)
    if (itemSelected) { setItemSelected(false) }
    if (noProductFoundErr) { setNoProductFoundErr(false) }
  }



  useEffect(() => {
    Permissions.getLocation().then((loc) => {
      setUserLocation(loc)
    }).catch(() => {
      Alert.alert("Error", t("LocationPermession.error", currentLanguage))
    }).finally(()=>{
      setIsLoading(false)
    })
  }, [])

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
        console.log('Error', error, error);
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
        <View style={{ zIndex: 1 }}>
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
          <SearchedItems endSearch={endSearch} navigation={navigation} setNoProductFound={setNoProductFoundErr}
            search={searchText} userLocation={userLocation} noProductFound={noProductFoundErr} />
        }
        <SortUptainers navigation={navigation} noProductFound={noProductFoundErr} />
        <Navigationbar navigation={navigation} />
      </View>
    </View>
  );
};

export default Home;
