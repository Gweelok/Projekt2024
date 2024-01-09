import { useEffect, useState } from "react"
import { Pressable, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import { getItemById, getUptainerById } from "../utils/Repo"
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import { calculateDistance } from "../utils/uptainersUtils"
import { windowWidth } from "../utils/Dimensions"
import { Primarycolor1, Primarycolor2, Primarycolor3 } from "../styles/Stylesheet"
import Distance from "./atoms/Distance"

const ItemsSearched = ({navigation, product, item, index, userLocation, endSearch , uptainer}) =>{
    const [imageUrl, setImageUrl] = useState(null)
    const storage = getStorage()
    useEffect(()=>{
        (async ()=>{        
            const imageRef = ref(storage, item.itemImage)
            const image = await getDownloadURL(imageRef)
            setImageUrl(image)

        })()
    }, [])

    return (
        <TouchableOpacity onPress={() => {
                navigation.navigate("DetailView", {
                data: item?.itemId,
                itemDescription: item?.itemDescription,
                brandName: item?.brandName,
                productName: item?.productName,
                imageUrl: imageUrl,
                uptainer: uptainer,
                })
                endSearch()
            }
          } style={style.mainContainer} key={index}>
            <View>
                <View style={style.container1}>
                    <Text style={style.productName}>{product.productName}</Text>
                    {(!!userLocation && !!uptainer) && <Distance userLocation={userLocation} uptainer={uptainer}/>}
                </View>
                {!!uptainer &&<Text style={style.uptainer}>{uptainer.uptainerName || uptainer} / {uptainer.uptainerStreet}</Text>}
                {!!imageUrl && <Image source={{uri: imageUrl}} style={style.image}></Image>}
            </View>
        </TouchableOpacity>
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
    image: {
        marginTop: 5,
        width: 100,
        height: 100,
    }
})

export default ItemsSearched