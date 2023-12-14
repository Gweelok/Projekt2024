import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView} from "react-native";
import React from "react";

import { styles } from "../styles/Stylesheet";

const SearchFilter = ({ data, input, setInput }) => {
  const Item = ({ item }) => (
    <TouchableOpacity>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item.brandName || item.productName || item.categoryName || item.modelName}
        // onPress={() => setSelectedId(item.id)}
        // backgroundColor={backgroundColor}
        // textColor={``}
      />
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // extraData={selectedId}
      />
    </SafeAreaView>
  )
}

export default SearchFilter;
