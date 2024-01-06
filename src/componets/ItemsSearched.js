import { useEffect, useState } from "react"
import { Pressable, StyleSheet, View, Text, Image } from "react-native"
import { getItemById, getUptainerById } from "../utils/Repo"
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import { calculateDistance } from "../utils/uptainersUtils"
import { windowWidth } from "../utils/Dimensions"
import { Primarycolor1, Primarycolor2, Primarycolor3 } from "../styles/Stylesheet"

const ItemsSearched = ({navigation, product, item, index, userLocation}) =>{
    const [imageUrl, setImageUrl] = useState(null)
    const [uptainer, setUptainer] = useState(null)
    const storage = getStorage()
    useEffect(()=>{
        (async ()=>{
            const getUptainer = await getUptainerById(item.itemUptainer)
            const imageRef = ref(storage, item.itemImage)
            const image = await getDownloadURL(imageRef)
            setImageUrl(image)
            setUptainer(getUptainer)

        })()
    }, [])

    return (
        <Pressable style={style.mainContainer} key={index}>
            <View>
                <View style={style.container1}>
                    <Text style={style.productName}>{product.productName}</Text>
                    {(!!userLocation && !!uptainer) && <Text style={style.distance}>{
                        calculateDistance(
                        {latitude: userLocation.latitude, longitude: userLocation.longitude},
                        {latitude: uptainer.uptainerLat, longitude: uptainer.uptainerLong}
                        )}</Text>}
                </View>
                {!!uptainer &&<Text style={style.uptainer}>{uptainer.uptainerName || uptainer} / {uptainer.uptainerStreet}</Text>}
                {!!imageUrl && <Image source={{uri: imageUrl}} style={style.image}></Image>}
            </View>
        </Pressable>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        width: windowWidth * 0.9,
        marginTop: 8
    },
    container1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 5
        
    },
    productName: {
        color: Primarycolor1,
        fontSize: 16
    },
    uptainer: {
        color: Primarycolor1,
        fontSize: 13
    },
    distance: {
        color: Primarycolor1,
        fontSize: 11
    },
    image: {
        marginTop: 5,
        width: 100,
        height: 100,
    }
})

export default ItemsSearched