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
                const dataByImages = await Promise.all(searchedItems.map(async(item, index) => {
                    const imageUrl = await getImage(item.itemImage)
                    return {...item, 
                        imageUrl: imageUrl}
                }))
                setLoading(false)
                let number = 0;
                const sortedItemsByUptainers = sortedUptainers.map((uptainer) => {
                    const result = dataByImages.filter(function(item) {
                        if(item.itemUptainer === uptainer.uptainerId && item.itemTaken === false)
                        {
                            return {
                                ...item
                            }
                        }
                    })
                    if(result.length){
                        number += result.length;
                        return {
                            uptainer: uptainer,
                            items: result
                            }}
                        else {
                            return null
                        }
                })
                const filteredSortedItemsByUptainers = sortedItemsByUptainers.filter((obj) => {
                    if(obj !== null){
                        return items
                    }
                })
                setSearchedData(filteredSortedItemsByUptainers)
                setNumberSearchedItems(number)
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
                    uptainer={items.uptainer}
                    endSearch={endSearch} navigation={navigation} index={index}
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