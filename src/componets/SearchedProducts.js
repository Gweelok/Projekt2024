import ScrollViewComponent from "./atoms/ScrollViewComponent"
import { getAllItems, getAllItemsByProductIds, getAllProducts, getAllUptainers } from "../utils/Repo"
import { useEffect, useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import { windowHeight, windowWidth } from "../utils/Dimensions"
import { items, products } from "../utils/SeedData"
import { filterProducts } from "../utils/productsUtils"
import { useLanguage, t } from "../Languages/LanguageHandler"
import { Primarycolor1, Primarycolor2, Primarycolor3 } from "../styles/Stylesheet"
import ItemsSearched from "./ItemsSearched"
import { setUptainersByIds } from "../utils/uptainersUtils"

const SearchedProducts = ({navigation, search, userLocation, endSearch}) =>{
    const [allProducts, setAllProducts] = useState(null)
    const [filteredProducts, setfilteredProducts] = useState([])
    const { currentLanguage, setLanguage } = useLanguage()
    const [allItems, setAllItems] = useState(null);
    const [allUptainers, setAllUptainers] = useState(null);
    useEffect(()=>{
       
        if(!allProducts){
            (async () =>{
                const retrivedProducts = await getAllProducts()
                setAllProducts(retrivedProducts)
                const filteredPs = await filterProducts(retrivedProducts, search)
                setfilteredProducts(filteredPs)
                const items = await getAllItemsByProductIds()
                setAllItems(items)
                const uptainers = await getAllUptainers()
                const setupUptainers = await setUptainersByIds(uptainers)
                setAllUptainers(setupUptainers)
            })()
        } else {

            (async () =>{
                
                const filteredPs = await filterProducts(allProducts, search)
                setfilteredProducts(filteredPs)
            })()
        }

    }, [search])

    return (
        <View style={style.container}>
            <ScrollViewComponent>
                <Text style={style.productsMatch}>{filteredProducts.length} {t("SearchHome.productsMatch", currentLanguage)}</Text>
                {(!!filteredProducts.length && !!allItems && allUptainers) && ( filteredProducts.map((product, index) =>(
                    <ItemsSearched uptainer={allUptainers[allItems[product.productId]?.itemUptainer] || "Draft"}  endSearch={endSearch} navigation={navigation} product={product} index={index} item={allItems[product.productId]} userLocation={userLocation}/>
                )))}
                

            </ScrollViewComponent>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: windowHeight,
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