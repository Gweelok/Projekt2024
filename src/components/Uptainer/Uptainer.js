import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "../../styles/Stylesheet";
import { React, useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  getItemsDetails,
  getItemsInUptainer,
  getProductById,
  getBrandById,
} from "../../utils/Repo/Items";
import { LoaderContext } from "../../contexts/LoaderContext/LoaderContext";
import { calculateDistance } from "../../utils/uptainersUtils";
import { cacheImage, getCachedImage } from "../../utils/Cache";
import Screens from "../../utils/ScreenPaths";
import uptainerStyles from "./uptainerStyles";

const Uptainer = ({ uptainerData, userLocation, items }) => {
  const navigation = useNavigation();
  const [pairedData, setpairedData] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    const pairedData = [];
    for (let i = 0; i < items.length; i += 2) {
      pairedData.push([items[i], items[i + 1]]);
    }

    setpairedData(pairedData)
  }, [items]);



  return (
    <View style={uptainerStyles.container}>
      <TouchableOpacity
        onPress={() => {
          setIsLoading(true);
          console.log(uptainerData);
          navigation.navigate(Screens.UPTAINER_DETAILS, {
            uptainer: uptainerData,
          });
        }}
      >
        <Text style={styles.menuItem_text}>{uptainerData.uptainerName}</Text>
        <View style={uptainerStyles.details}>
          <Text style={uptainerStyles.streetText}>
            {uptainerData.uptainerStreet}
          </Text>
          {userLocation && (
            <Text style={uptainerStyles.distance}>
              {calculateDistance(
                {
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                },
                {
                  latitude: parseFloat(uptainerData.uptainerLatitude),
                  longitude: parseFloat(uptainerData.uptainerLongitude),
                }
              )}{" "}
              km
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={pairedData}
        keyExtractor={(item, index) => index.toString()}
        style={uptainerStyles.flatList}
        renderItem={({ item }) => (
          <View>
            {/* First Row */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(Screens.DETAIL_VIEW, {
                  ...item[0],
                  uptainer: uptainerData,
                })
              }
            >
              <View style={uptainerStyles.item}>
                {item[0]?.imageUrl ? (
                  <Image
                    source={{ uri: item[0]?.imageUrl }}
                    style={uptainerStyles.image}
                  />
                ) : (
                  <ActivityIndicator
                    size="large"
                    color={uptainerStyles.activityIndicator.color}
                  />
                )}
              </View>
            </TouchableOpacity>
            {/* Second Row */}
            {item[1] && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(Screens.DETAIL_VIEW, {
                    ...item[1],
                    uptainer: uptainerData,
                  })
                }
              >
                <View style={uptainerStyles.item}>
                  <Image
                    source={{ uri: item[1]?.imageUrl }}
                    style={uptainerStyles.image}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default Uptainer;
