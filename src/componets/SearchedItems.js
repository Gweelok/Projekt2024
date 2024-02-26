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
                setSearchedData(dataByImages)
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
                 
                    <Text style={style.productsMatch}>{searchedData.length} {t("SearchHome.productsMatch", currentLanguage)}</Text>
                    {(!!searchedData.length && allUptainers) && ( searchedData.map((item, index) =>(
                    <ItemsSearched 
                    uptainer={allUptainers[item.itemUptainer]}
                    endSearch={endSearch} navigation={navigation} index={index}
                    item={item} userLocation={userLocation}/>
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