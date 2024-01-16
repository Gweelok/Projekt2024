import { View, StyleSheet } from "react-native"
import { useState } from 'react';
import UptainerList from "./UptainerList"
import SearchBox from "./SearchBox"
import { windowHeight, windowWidth } from "../../utils/Dimensions"
import GlobalStyle from "../../styles/GlobalStyle"

const ServiceAdmin = () => {
    const [searchText, setSearchText] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    //Function to open the search when the search box is touched.
    const openSearch = () => {
        setIsSearching(true)
    };
    //Function to close the search when the user touches outside the search box.
    const closeSearch = () => {
        setIsSearching(false)
    };

    return (
        <View style={style.container}>

            <View style={style.container2} >

                <View style={[GlobalStyle.BodyWrapper, style.searchBox]} onTouchStart={openSearch}>
                    <SearchBox onChangeText={(text) => setSearchText(text)} value={searchText} placeholderText={"Search"}></SearchBox>
                </View>

                {isSearching && (
                    <View>
                        <UptainerList searchValue={searchText}></UptainerList>
                    </View>
                )}

            </View>
            <View onTouchStart={closeSearch} style={style.container3}>

            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    container2: {
        width: '80%',
    },
    container3: {
        width: '100%',
        height: '100%'
    },
    searchBox: {
        position: 'absolute',
        zIndex: 1,
        marginTop: 50,
        width: '100%',
        flexDirection: 'row',
    }
})

export default ServiceAdmin
