import { useEffect, useState } from "react"
import { Pressable, StyleSheet, View, Text, Image } from "react-native"
import { getItemById, getUptainerById } from "../utils/Repo"
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import { calculateDistance } from "../utils/uptainersUtils"

const ItemsSearched = ({navigation, product, item, index, userLocation}) =>{
    const [imageUrl, setImageUrl] = useState(null)
    const [uptainer, setUptainer] = useState(null)
    const storage = getStorage()
    useEffect(()=>{
        (async ()=>{
            const getUptainer = await getUptainerById(item.itemUptainer)
            const imageRef = ref(storage, item.itemImage)
            console.log(getUptainer)
            const image = await getDownloadURL(imageRef)
            setImageUrl(image)
            setUptainer(getUptainer)

        })()
    }, [])

    return (
        <Pressable>
            <View>
                <View>
                    <Text>{product.productName}</Text>
                    {(!!userLocation && !!uptainer) && <Text>{
                        calculateDistance(
                        {latitude: userLocation.latitude, longitude: userLocation.longitude},
                        {latitude: uptainer.uptainerLat, longitude: uptainer.uptainerLong}
                        )}</Text>}
                </View>
                {!!uptainer &&<Text>{uptainer.uptainerName} / {uptainer.uptainerStreet}</Text>}
                {!!imageUrl && <Image source={{uri: imageUrl}} style={style.image}></Image>}
                <Text>--</Text>
            </View>
        </Pressable>
    )
}

const style = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
    }
})

export default ItemsSearched