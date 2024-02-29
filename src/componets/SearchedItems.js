import ScrollViewComponent from "./atoms/ScrollViewComponent"
import { getAllUptainers, getImage, getSearchedItems } from "../utils/Repo"
import { useEffect, useState } from "react"
import { StyleSheet, View, Text, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native"
import { windowHeight, windowWidth } from "../utils/Dimensions"
import { items, products } from "../utils/SeedData"
import { filterProducts } from "../utils/productsUtils"
import { useLanguage, t } from "../Languages/LanguageHandler"
import { Primarycolor1, Primarycolor2, Primarycolor3, dropdownStyles } from "../styles/Stylesheet"
import ItemsSearched from "./ItemsSearched"
import { setUptainersByIds, sortUptainersByDistance } from "../utils/uptainersUtils"

const SearchedProducts = ({navigation, search, userLocation, endSearch, noProductFound, setNoProductFound }) =>{
    const [allProducts, setAllProducts] = useState(null)
    const [searchedData, setSearchedData] = useState([])
    const [numberSearchedItems, setNumberSearchedItems] = useState(0)
    const { currentLanguage, setLanguage } = useLanguage()
    const [allUptainers, setAllUptainers] = useState(null);
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        const fetchData = async () =>{
            try {

                const uptainers = await getAllUptainers()
                const sortedUptainers = sortUptainersByDistance(userLocation, uptainers)
                const setupUptainers = await setUptainersByIds(sortedUptainers)
                setAllUptainers(setupUptainers)
                const searchedItems = await getSearchedItems(search)
                if (!searchedItems.length) { setNoProductFound(true)}
                setLoading(false)
                const sortedItemsByUptainers = await sortItemsByUptainers (searchedItems, uptainers, userLocation)
                setSearchedData(sortedItemsByUptainers)
                setNumberSearchedItems(searchedItems.length)
                } catch(error) {
                    console.error('Error fetching data:', error.message);
                    setLoading(false); // Set loading to false in case of an error
                }
            }
            fetchData()

    }, [])

    return (
        <View style={noProductFound ? null : style.container}>


                {loading ? (
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={style.loadingContainer}>
                    <ActivityIndicator size='size'/>
                </KeyboardAvoidingView>
                ) :
                noProductFound ? 
                null : 
                <ScrollViewComponent style={{width: windowWidth * 0.89}}>
                 
                    <Text style={style.productsMatch}>{numberSearchedItems} {t("SearchHome.productsMatch", currentLanguage)}</Text>
                    {(!!searchedData.length) && ( searchedData.map((items, index) =>(
                    <ItemsSearched
                    key={index} 
                    uptainer={items.uptainer}
                    endSearch={endSearch} navigation={navigation}
                    items={items.items} userLocation={userLocation}/>
                    )))}
             
                </ScrollViewComponent>
                }
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: windowHeight - 121,
        width: windowWidth,
    },
    loadingContainer: {
        
        flex: 1,
        marginRight: 35,
        justifyContent: 'center',
        
        
    },
    productsMatch: {
        color: Primarycolor1,
        fontSize: 15,
        marginTop: 5,
        marginBottom: 10,

    }
})

export default SearchedProducts;


async function sortItemsByUptainers (items, uptainers, userLocation) {
    const result = [];
    const sortedUptainers = sortUptainersByDistance(userLocation, uptainers);
    for (let i in sortedUptainers) {
        const filteredItemsUptainer = await filterAndGetImage (items, sortedUptainers[i].uptainerId);
        if(filteredItemsUptainer.length > 0){
            result.push({
                uptainer: sortedUptainers[i],
                items: filteredItemsUptainer
        })
        }
    }
    return result
}


async function filterAndGetImage (items, uptainerId) {
    const res =[];
    for(let i in items) {
        const item = items[i];
        if(item.itemUptainer === uptainerId){
            const imageUrl = await getImage(item.itemImage);
            res.push({
                ...item,
                imageUrl: imageUrl
            })
        }
    }
    return res
}