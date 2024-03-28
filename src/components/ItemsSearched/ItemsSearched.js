import { View, Text, Image, TouchableOpacity } from "react-native";
import Distance from "../Distance/Distance";
import itemsSearchedStyles from "./itemsSearchedStyles";
import { useNavigation } from "@react-navigation/native";

const ItemsSearched = ({
  items,
  userLocation,
  endSearch,
  uptainer,
}) => {

  const navigation = useNavigation();

  return (
    <View>
      <View style={itemsSearchedStyles.container}>
        <Text style={itemsSearchedStyles.uptainerText}>
          {uptainer.uptainerName}
        </Text>
      </View>
      <View style={itemsSearchedStyles.details}>
        <Text style={itemsSearchedStyles.searchedItemText}>
          {uptainer.uptainerStreet}, {uptainer.uptainerZip}
          {uptainer.uptainerCity}
        </Text>
        {!!userLocation && (
          <Distance userLocation={userLocation} uptainer={uptainer} />
        )}
      </View>
      <View style={itemsSearchedStyles.container}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate("DetailView", {
                data: item?.itemId,
                itemDescription: item?.itemDescription,
                brandName: item?.brandName,
                productName: item?.productName,
                imageUrl: item?.imageUrl,
                uptainer: uptainer,
              });
              endSearch();
            }}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={itemsSearchedStyles.image}
            ></Image>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ItemsSearched;
