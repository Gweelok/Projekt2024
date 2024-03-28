import React, { useState } from "react";
import { View, Alert } from "react-native";

import homeStyles from "./homeStyles";
import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";

import SortUptainers from "../../components/SortUptainers/sortUptainers";
import SearchBox from "../../components/SearchBox/SearchBox";

import SearchFilter from "../../components/SearchFilter/SearchFilter";

import { getItemsByName } from "../../utils/Repo/Items";
import { useEffect } from "react";
import SearchedItems from "../../components/SearchedItems/SearchedItems";
import { Permissions } from "../../utils/Permissions";
import { t, useLanguage } from "../../languages/LanguageHandler";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notMatchingProduct, setNotMatchingProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [itemSelected, setItemSelected] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [noProductFoundErr, setNoProductFoundErr] = useState(false);
  const { currentLanguage } = useLanguage();

  const endSearch = () => {
    setSearchText("");
    setItemSelected(false);
  };
  const handleSearch = (input) => {
    setSearchText(input);
    if (itemSelected) {
      setItemSelected(false);
    }
    if (noProductFoundErr) {
      setNoProductFoundErr(false);
    }
  };

  useEffect(() => {
    Permissions.getLocation()
      .then((loc) => {
        setUserLocation(loc);
      })
      .catch(() => {
        Alert.alert("Error", t("LocationPermission.error", currentLanguage));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setNotMatchingProduct(false);

    async function getItemsByTextFilter() {
      try {
        setIsLoading(true);
        const result = await getItemsByName(searchText);
        if (result.length === 0) {
          setNotMatchingProduct(true);
          setSearchResults([]);
        } else {
          setSearchResults(result);
        }
      } catch (error) {
        console.log("Error", error, error);
      } finally {
        setIsLoading(false);
      }
    }

    if (searchText) {
      getItemsByTextFilter();
    }
  }, [searchText]);

  return (
    <InteractiveScreen>
      <View style={homeStyles.searchField}>
        <SearchBox
          onChangeText={handleSearch}
          value={searchText}
          placeholderText={"SearchField.productPlaceholder"}
        />
        {searchText && !itemSelected ? (
          <SearchFilter
            data={searchResults}
            input={searchText}
            isLoading={isLoading}
            setItemSelected={setItemSelected}
            setSearchText={setSearchText}
          />
        ) : null}
      </View>

      {searchText && itemSelected && (
        <SearchedItems
          endSearch={endSearch}
          navigation={navigation}
          setNoProductFound={setNoProductFoundErr}
          search={searchText}
          userLocation={userLocation}
          noProductFound={noProductFoundErr}
        />
      )}

      <SortUptainers
        navigation={navigation}
        noProductFound={noProductFoundErr}
      />

    
    </InteractiveScreen>
  );
};

export default Home;
