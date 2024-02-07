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
import { setUptainersByIds } from "../utils/uptainersUtils"

const SearchedProducts = ({navigation, search, userLocation, endSearch, setHideUptainers }) =>{
    const [allProducts, setAllProducts] = useState(null)
    const [searchedData, setSearchedData] = useState([])
    const { currentLanguage, setLanguage } = useLanguage()
    const [allUptainers, setAllUptainers] = useState(null);
    const [loading, setLoading] = useState(true)
    const [noProductFound, setNoProductFound] = useState(false)
    useEffect(()=>{
        const fetchData = async () =>{
            try {

                const uptainers = await getAllUptainers()
                const setupUptainers = await setUptainersByIds(uptainers)
                setAllUptainers(setupUptainers)
                const searchedItems = await getSearchedItems(search)
                if (!searchedItems.length) { setNoProductFound(true); setHideUptainers(true) }
                const dataByImages = await Promise.all(searchedItems.map(async(item, index) => {
                    const imageUrl = await getImage(item.itemImage)
                    return {...item, imageUrl}
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
    const renderError = () => <Text style={style.noProductFoundErr}>{t("SearchField.notProductFound", currentLanguage)}</Text>

    return (
        <View style={noProductFound ? null : style.container}>
                {loading ? (
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={style.loadingContainer}>
                    <ActivityIndicator size='size'/>
                </KeyboardAvoidingView>
                ) :
                noProductFound ? 
                renderError() : 
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

    },
    noProductFoundErr: {
        fontSize: 16,
        fontWeight: '500',
        color: Primarycolor1,
        backgroundColor: 'white',
        paddingTop: 20,
        paddingBottom: 20,
        zIndex: 1,
        paddingLeft: 5,
        width: '100%',

    }
})

export default SearchedProducts;