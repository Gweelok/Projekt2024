import { Text, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";

import { styles, dropdownStyles } from "../styles/Stylesheet";

const SearchFilter = ({ data }) => {
  const renderItem = ({item}) => {
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';

  return (
    <TouchableOpacity
      key={item.brandName || item.productName || item.categoryName || item.modelName}
      onPress={() => console.log('selectedItem', item)}
      style={dropdownStyles.dropdownListItem}
    >
      <Text style={styles.dropdownText}>{item.brandName || item.productName || item.categoryName || item.modelName}</Text>
    </TouchableOpacity>
    );
  };


  return (
    <SafeAreaView style={dropdownStyles.dropdownList} >
      <FlatList data={data} renderItem={renderItem}/>
    </SafeAreaView>
  )
}

export default SearchFilter;
