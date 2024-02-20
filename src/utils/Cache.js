import AsyncStorage from "@react-native-async-storage/async-storage";


const paths = {
    images: 'images/'
}

export const cacheImage = async (itemId, url) => {
    const key = paths.images + itemId;
    await AsyncStorage.setItem(key, url)
}

export const getCachedImage = async (itemId) => {
    const key = paths.images + itemId;
    return AsyncStorage.getItem(key)
}