import ScrollViewComponent from "../ScrollViewComponent/ScrollViewComponent";
import { getSearchedItems } from "../../utils/Repo/Items";
import { getAllUptainers } from "../../utils/Repo/Uptainers";
import { getImage } from "../../utils/Repo/Images";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLanguage, t } from "../../languages/LanguageHandler";
import ItemsSearched from "../ItemsSearched/ItemsSearched";
import {
  setUptainersByIds,
  sortUptainersByDistance,
} from "../../utils/uptainersUtils";
import searchedItemsStyles from "./searchedItemsStyles";
import { cacheImage, getCachedImage } from "../../utils/Cache";
import { useNavigation } from "@react-navigation/native";

const SearchedProducts = ({
  search,
  userLocation,
  endSearch,
  noProductFound,
  setNoProductFound,
}) => {
  const navigation = useNavigation();

  const [allProducts, setAllProducts] = useState(null);
  const [searchedData, setSearchedData] = useState([]);
  const [numberSearchedItems, setNumberSearchedItems] = useState(0);
  const { currentLanguage, setLanguage } = useLanguage();
  const [allUptainers, setAllUptainers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uptainers = await getAllUptainers();
        const sortedUptainers = sortUptainersByDistance(
          userLocation,
          uptainers
        );
        const setupUptainers = await setUptainersByIds(sortedUptainers);
        setAllUptainers(setupUptainers);
        const searchedItems = await getSearchedItems(search);
        if (!searchedItems.length) {
          setNoProductFound(true);
        }
        setLoading(false);
        const sortedItemsByUptainers = await sortItemsByUptainers(
          searchedItems,
          uptainers,
          userLocation
        );
        setSearchedData(sortedItemsByUptainers);
        setNumberSearchedItems(searchedItems.length);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false); // Set loading to false in case of an error
      }
    };
    fetchData();
  }, []);

  return (
    <View style={noProductFound ? null : searchedItemsStyles.container}>
      {loading ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={searchedItemsStyles.loadingContainer}
        >
          <ActivityIndicator size="size" />
        </KeyboardAvoidingView>
      ) : noProductFound ? null : (
        <ScrollViewComponent style={searchedItemsStyles.scrollView}>
          <Text style={searchedItemsStyles.productsMatch}>
            {numberSearchedItems}{" "}
            {t("SearchHome.productsMatch", currentLanguage)}
          </Text>
          {!!searchedData.length &&
            searchedData.map((items, index) => (
              <ItemsSearched
                key={index}
                uptainer={items.uptainer}
                endSearch={endSearch}
                navigation={navigation}
                items={items.items}
                userLocation={userLocation}
              />
            ))}
        </ScrollViewComponent>
      )}
    </View>
  );
};

export default SearchedProducts;

async function sortItemsByUptainers(items, uptainers, userLocation) {
  const result = [];
  const sortedUptainers = sortUptainersByDistance(userLocation, uptainers);
  for (let i in sortedUptainers) {
    const filteredItemsUptainer = await filterAndGetImage(
      items,
      sortedUptainers[i].uptainerId
    );
    if (filteredItemsUptainer.length > 0) {
      result.push({
        uptainer: sortedUptainers[i],
        items: filteredItemsUptainer,
      });
    }
  }
  return result;
}

async function filterAndGetImage(items, uptainerId) {
  const res = [];
  for (let i in items) {
    const item = items[i];
    if (item.itemUptainer === uptainerId) {
      try {
        const imageUrl = await getCachedImage(item.itemId);
        if (imageUrl) {
          res.push({
            ...item,
            imageUrl: imageUrl,
          });
        } else {
          const imageUrl = await getImage(item.itemImage);
          await cacheImage(item.itemId, imageUrl);
          res.push({
            ...item,
            imageUrl: imageUrl,
          });
        }
      } catch (error) {
        console.error(`Error loading item's image ID ${item.itemId}:`, error);
      }
    }
  }
  return res;
}
