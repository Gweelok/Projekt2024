import { Text, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";

import { Primarycolor1, dropdownStyles } from "../styles/Stylesheet";

const SearchFilter = ({ data, input }) => {
  const renderItem = ({ item }) => {
    const itemName = item.brandName || item.productName || item.categoryName || item.modelName
    const splittedItemName = itemName.split(input)

    return (
      <TouchableOpacity
        key={item.brandName || item.productName || item.categoryName || item.modelName}
        onPress={() => console.log('selectedItem', item)}
        style={[dropdownStyles.dropdownListItem, { display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }]}
      >
        <Text style={[dropdownStyles.dropdownFilterTextHome, { color: Primarycolor1 }]}>{input}</Text>
        <Text style={dropdownStyles.dropdownFilterTextHome}>{splittedItemName}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <SafeAreaView style={dropdownStyles.dropdownList}>
      <FlatList data={data} renderItem={renderItem}/>
    </SafeAreaView>
  )
}

export default SearchFilter;
