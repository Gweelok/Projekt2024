import { Text, FlatList, View, ActivityIndicator } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";

import { useLanguage, t } from "../Languages/LanguageHandler";
import { Primarycolor1, dropdownStyles } from "../styles/Stylesheet";

const SearchFilter = ({ data = [], input,  error, isLoading, setItemSelected, setSearchText }) => { 
  const { currentLanguage } = useLanguage();

  const renderItem = ({ item, index }) => {
    const itemName = item.brandName || item.productName || item.categoryName || item.modelName;
    const splittedItemName = itemName.split(input);
    const isLastItem = data.length - 1 === index;

    if (itemName.includes(input)) {
      return (
        <>
          <Text
            key={item.brandName || item.productName || item.categoryName || item.modelName}
            onPress={() => {
              setItemSelected(true)
              setSearchText(itemName)
              console.log('selectedItem', item)
            }}
            style={dropdownStyles.dropdownSearchFieldList}
          > 
            <Text style={[dropdownStyles.dropdownFilterTextHome, { color: Primarycolor1 }]}>{input}</Text>
            <Text style={dropdownStyles.dropdownFilterTextHome}>{splittedItemName}</Text>
          </Text>
          {!isLastItem ? <Divider color={Primarycolor1} width={1} /> : null}
        </>
      );
    }
  };

  const renderLoading = () => <ActivityIndicator size="small" />;
  const renderError = () => (<Text style={dropdownStyles.dropdownErrorText}>{t("SearchField.notMatchingProduct", currentLanguage)}</Text>)

  return (
    <View
      style={dropdownStyles.dropdownSearchFieldListContainer}
    >
      {isLoading 
        ? renderLoading() 
        : error 
          ? renderError()
          : (<FlatList key="flat-list" data={data} renderItem={renderItem} />)  
      }
    </View>
  )
}

export default SearchFilter;
