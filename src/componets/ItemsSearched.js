import { useEffect, useState } from "react"
import { Pressable, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import { getItemById, getUptainerById } from "../utils/Repo"
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import { calculateDistance } from "../utils/uptainersUtils"
import { windowWidth } from "../utils/Dimensions"
import { Primarycolor1, Primarycolor2, Primarycolor3, styles } from "../styles/Stylesheet"
import Distance from "./atoms/Distance"

const ItemsSearched = ({navigation, items, userLocation, endSearch , uptainer}) =>{
    return (
        <View>
            <View style={style.container1}>
                <Text style={styles.menuItem_text}>{uptainer.uptainerName}</Text>                    
            </View>
            <View style={style.details}>
                <Text style={{fontSize: 18, color: Primarycolor1}}>{uptainer.uptainerStreet}, {uptainer.uptainerZip}
                {uptainer.uptainerCity}</Text>
                {!!userLocation && <Distance userLocation={userLocation} uptainer={uptainer}/>}
            </View>
            <View style={style.container1}>
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
                        })
                        endSearch()
                    }
                  }>

                        <Image source={{uri: item.imageUrl}} style={style.image}></Image>

                </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        width: windowWidth * 0.89,
        marginTop: 8,
    },
    container1: {
        fontFamily: 'space-grotesk',
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'start',
        marginRight: 5
        
    },
    uptainerName: {
        color: Primarycolor1,
        fontSize: 16,
        fontWeight: "400"
    },
    uptainerAddress: {
        color: Primarycolor1,
        fontSize: 13
    },
    image: {
        marginTop: 10,
        marginRight: 10,
        width: 100,
        height: 100,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})

export default ItemsSearched