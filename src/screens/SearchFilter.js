import { Text, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";

import { useLanguage, t } from "../Languages/LanguageHandler";
import { Primarycolor1, dropdownStyles } from "../styles/Stylesheet";

const SearchFilter = ({ data, input,  error }) => {
  const currentLanguage = useLanguage()

  const renderItem = ({ item }) => {
    const itemName = item.brandName || item.productName || item.categoryName || item.modelName
    const splittedItemName = itemName.split(input)

    return (
      <TouchableOpacity
        key={item.brandName || item.productName || item.categoryName || item.modelName}
        onPress={() => console.log('selectedItem', item)}
        style={[dropdownStyles.dropdownListItemForSearchField]}
      >
        <Text style={[dropdownStyles.dropdownFilterTextHome, { color: Primarycolor1 }]}>{input}</Text>
        <Text style={dropdownStyles.dropdownFilterTextHome}>{splittedItemName}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <SafeAreaView style={dropdownStyles.dropdownSearchFieldList}>
      {!error 
        ? <FlatList data={data} renderItem={renderItem} /> 
        : <Text style={dropdownStyles.dropdownErrorText}>{t("SearchField.notMatchingProduct", currentLanguage)}</Text>
      }
      
    </SafeAreaView>
  )
}

export default SearchFilter;
