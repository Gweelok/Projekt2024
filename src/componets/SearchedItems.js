import ScrollViewComponent from "./atoms/ScrollViewComponent"
import { getAllUptainers, getImage, getSearchedItems } from "../utils/Repo"
import { useEffect, useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import { windowHeight, windowWidth } from "../utils/Dimensions"
import { items, products } from "../utils/SeedData"
import { filterProducts } from "../utils/productsUtils"
import { useLanguage, t } from "../Languages/LanguageHandler"
import { Primarycolor1, Primarycolor2, Primarycolor3 } from "../styles/Stylesheet"
import ItemsSearched from "./ItemsSearched"
import { setUptainersByIds } from "../utils/uptainersUtils"

const SearchedProducts = ({navigation, search, userLocation, endSearch, setIsLoading}) =>{
    const [allProducts, setAllProducts] = useState(null)
    const [searchedData, setSearchedData] = useState([])
    const { currentLanguage, setLanguage } = useLanguage()
    const [allUptainers, setAllUptainers] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        (async () =>{
            const uptainers = await getAllUptainers()
            const setupUptainers = await setUptainersByIds(uptainers)
            setAllUptainers(setupUptainers)
            const searchedItems = await getSearchedItems(search)
            
            // fliter valid items 
            const validItems = searchedItems.filter((item) => setupUptainers[item.itemUptainer])

            const dataByImages = await Promise.all(validItems.map(async(item, index) => {
                const imageUrl = await getImage(item.itemImage)
                return {...item, imageUrl}
            }))
            setIsLoading(false)
            setSearchedData(dataByImages)
        })()
        

    }, [])

    return (
        <View style={style.container}>
            <ScrollViewComponent>
                <Text style={style.productsMatch}>{searchedData.length} {t("SearchHome.productsMatch", currentLanguage)}</Text>
                {(!!searchedData.length && allUptainers) && ( searchedData.map((item, index) =>(
                    <ItemsSearched 
                    uptainer={allUptainers[item.itemUptainer]}
                    endSearch={endSearch} navigation={navigation} index={index}
                    item={item} userLocation={userLocation}/>
                )))}
                

            </ScrollViewComponent>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: windowHeight - 121,
        width: windowWidth,
        marginLeft: 5
    },
    productsMatch: {
        color: Primarycolor1,
        fontSize: 15,
        marginTop: 5,
        marginBottom: 10,

    }
})

export default SearchedProducts;