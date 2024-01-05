import { useEffect, useState } from "react"
import { Pressable, StyleSheet, View, Text } from "react-native"
import { getItemById, getUptainerById } from "../utils/Repo"

const ItemsSearched = ({navigation, product, item, index}) =>{
    const [searchedProduct, setSearchedProduct] = useState(null)
    const [uptainer, setUptainer] = useState(null)
    useEffect(()=>{
        (async ()=>{
            const getUptainer = await getUptainerById(item.itemUptainer)
            console.log(getUptainer)
            setUptainer(getUptainer)
        })()
    }, [])

    return (
        <Pressable>
            <View>
                <Text>{product.productName}</Text>
                {!!uptainer &&<Text>{uptainer.uptainerName} / {uptainer.uptainerStreet}</Text>}
                <Text>--</Text>
            </View>
        </Pressable>
    )
}

const style = StyleSheet.create({

})

export default ItemsSearched