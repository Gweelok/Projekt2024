import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Linking,
  Alert,
  ActivityIndicator,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navigationbar from '../componets/Navigationbar';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getItemsInUptainer, getProductById, getBrandById, getUptainerById, createItem, updateItemById } from '../utils/Repo';
import { Backgroundstyle, Primarycolor4, Primarycolor1 } from '../styles/Stylesheet';
import GlobalStyle from '../styles/GlobalStyle';
import ScrollViewComponent from '../componets/atoms/ScrollViewComponent';
import { LoaderContext } from '../componets/LoaderContext';
import { cacheImage, getCachedImage } from '../utils/Cache';
import ProductAlert from '../componets/ProductAlert';
import { useNavigation } from '@react-navigation/native';

import Screens from "../utils/ScreenPaths";
import { BadgeContext } from './form/BadgeContext';
import { t, useLanguage } from '../Languages/LanguageHandler';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UptainerDetails = ({ route }) => {
  const navigation = useNavigation()
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const { setBadgeCount } = useContext(BadgeContext)
  const { currentLanguage } = useLanguage()
  const [refreshing, setRefreshing] = useState(false);
  const [uptainerData, setuptainerData] = useState()
  const [itemsData, setitemsData] = useState([])

  const [addedItem, setaddedItem] = useState(false)
  const [addingItem, setaddingItem] = useState(false)

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!(newItem && addedItem && !isLoading)) {
      return
    }

    const fadeOut = () => {
      return setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 1000)
    }


    fadeOut()

    return () => {
      clearTimeout(fadeOut)
    }
  }, [addedItem,isLoading]);

  // props
  const [newItem, setnewItem] = useState(route.params.newItem)
  const uptainerId = route.params.uptainer.uptainerId
  const scannedQRCode = route.params.scannedQRCode;


  useEffect(() => {
    fetchData()
  }, []);

  const onRefresh = () => {
    setRefreshing(true)
    // if updropped item exist set undefined to remove from list
    if (newItem) {
      setnewItem()
    }
    fetchData()
  }


  const fetchData = async () => {
    setIsLoading(true)


    try {
      // if updropping item
      if (newItem && !addingItem) {
        // set undefined to prevent updropp again
        setaddingItem(true)

        updroppItem()
      }


      await fetchUptainerData()
      await fetchUptainerItems()
    } catch (error) {
      Alert.alert("Error", error)
      navigation.goBack()
    }

    setIsLoading(false)
    setRefreshing(false)
  }




  const updroppItem = async () => {
    try {
      if (newItem.itemUptainer == "Draft") {
        // item Already in Draft - update
        const updatedData = {
          itemproduct: newItem.product,
          itemBrand: newItem.brand,
          itemModel: newItem.model,
          itemCategory: newItem.category,
          itemDescription: newItem.description,
          itemcondition: newItem.condition,
          itemUptainer: uptainerId
        }
        await updateItemById(newItem.itemId, updatedData, newItem.image)
        setBadgeCount((prevCount) => prevCount - 1)
      } else {
        // New item - create
        await createItem(
          newItem.image,
          newItem.category,
          newItem.product,
          newItem.brand,
          newItem.model,
          newItem.condition,
          newItem.description,
          scannedQRCode
        )
      }

      // done adding item
      setaddedItem(true)
    } catch (error) {
      // set undefined to remove from list
      setnewItem()
      Alert.alert(t("QRScanner.Error", currentLanguage), t("QRScanner.ErrorMsg1", currentLanguage))
    }

  }


  const fetchUptainerData = async () => {
    // uptainer data from passed 'uptainerId'
    const uptainer = await getUptainerById(uptainerId)

    try {
      // uptainer image
      const storage = getStorage()
      const uptainerPathReference = ref(storage, uptainer.uptainerImage)
      const imageUrl = await getDownloadURL(uptainerPathReference)
      uptainer.uptainerImage = imageUrl
    } catch (error) {
      uptainer.uptainerImage = "https://via.placeholder.com/200x200"
    }

    setuptainerData(uptainer)
  }

  const fetchUptainerItems = async () => {
    const items = (await getItemsInUptainer(uptainerId)).filter((item) => !item.itemTaken)
    const storage = getStorage()

    const updatedItems = await Promise.all(
      items.map(async (item) => {
        const pathReference = ref(storage, item.itemImage);
        const product = await getProductById(item.itemproduct);
        const brand = await getBrandById(item.itemBrand);

        try {
          const cachedImage = await getCachedImage(item.itemId)
          if (cachedImage) {
            return {
              ...item,
              itemImage: cachedImage,
              productName: product.productName,
              brandName: brand.brandName,
            };
          } else {
            const url = await getDownloadURL(pathReference);
            await cacheImage(item.itemId, url)
            return {
              ...item,
              itemImage: url,
              productName: product.productName,
              brandName: brand.brandName,
            };
          }
        } catch (error) {
          return {
            ...item,
            itemImage: 'https://via.placeholder.com/200x200',
            productName: product.productName,
            brandName: brand.brandName,
          }
        }
      })
    )


    setitemsData(updatedItems)
  }




  const openAddressOnMap = () => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${uptainerData.uptainerLat},${uptainerData.uptainerLong}`;

    const url = Platform.select({
      ios: `${scheme}${uptainerData.uptainerName}@${latLng}`,
      android: `${scheme}${latLng}(${uptainerData.uptainerName})`,
    });

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Error", "Can't handle url: " + url)
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => Alert.alert("Error", "An error occurred: " + err))
  };



  const renderItem = (item) => (
    <TouchableOpacity
      disabled={newItem && (item.itemId == newItem.itemId && !addedItem)}
      key={item.itemId}
      onPress={() => {
        navigation.navigate(Screens.DETAIL_VIEW, {
          data: item.itemId || "",
          itemDescription: item.itemDescription || "",
          brandName: item.brandName || "",
          productName: item.productName || "",
          imageUrl: item.itemImage || "",
          uptainer: uptainerData,
        });
      }}
      style={style.item}
    >

      <View style={style.imageContainer}>
        <Image
          source={{ uri: item.itemImage }}
          style={style.image}
        />




        {newItem && ((item.itemId == newItem.itemId)) &&
          <Animated.View style={[style.newItemStyle, { opacity: fadeAnim }]}>
            <ActivityIndicator style={style.newItemStyle} color={Primarycolor1} size={"large"}></ActivityIndicator>
          </Animated.View>
        }


      </View>
      <Text style={style.productNameText}>
        {item.productName}
      </Text>
    </TouchableOpacity>
  )




  return (
    <View style={[Backgroundstyle.interactive_screens]}>

      <View style={GlobalStyle.BodyWrapper}>
        {newItem && addedItem && !isLoading && <ProductAlert></ProductAlert>}

        <ScrollViewComponent
          refreshing={refreshing}
          onRefresh={onRefresh}>

          <TouchableOpacity
            style={style.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" color="white" size={20} />
          </TouchableOpacity>


          <View>
            <ImageBackground
              style={style.detailsImage}
              source={{
                uri: uptainerData?.uptainerImage
              }}
            >
              <TouchableOpacity
                onPress={openAddressOnMap}
                style={style.productLocation}
              >
                <Text style={style.productAddress}>
                  {uptainerData?.uptainerName} / {uptainerData?.uptainerStreet}
                </Text>
                <Ionicons name="chevron-forward" color="white" size={30} />
              </TouchableOpacity>
            </ImageBackground>
          </View>




          <View style={style.scrollViewContent}>
            {newItem && !isLoading && renderItem(newItem)}
            {itemsData.map((item) => renderItem(item))}
          </View>




        </ScrollViewComponent>
        <Navigationbar navigation={navigation} />
      </View>
    </View>
  );
};

export default UptainerDetails;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    backgroundColor: '#1c4b3d',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailsImage: {
    width: windowWidth / 1.1,
    height: windowHeight / 3,
  },
  productLocation: {
    width: windowWidth / 1.7,
    backgroundColor: '#1c4b3d',
    height: 75,
    position: 'absolute',
    bottom: -30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productAddress: {
    width: '70%',
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
    padding: 10,
  },
  moreProductsImage: {
    width: windowWidth / 2.7,
    height: windowHeight / 6.4,
  },
  newItemStyle: {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.7,
    backgroundColor: Primarycolor4,
    zIndex: 1,
    elevation: 1
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginTop: 50
  },
  item: {
    width: '47%', // Adjust the width as per your requirement
    aspectRatio: 1,
    margin: 0,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%', // Adjust the height as per your requirement
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  productNameText: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
    fontWeight: "bold",
    fontSize: 15,
  },
});
