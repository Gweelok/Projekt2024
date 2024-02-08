import { View, StyleSheet} from "react-native"
import { useState } from 'react';
import UptainerList from "./UptainerList"
import Navigationbar from "../organisms/Navigationbar"
import SearchBox from "./SearchBox"
import { windowHeight, windowWidth } from "../../utils/Dimensions"
import GlobalStyle from "../../styles/GlobalStyle"

const ServiceAdminContent = ({navigation}) => {
   
    const [searchText, setSearchText] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    
    //Temporary placeholder for searchbox
    const FIND_UPTAINER = 'Find Uptainer';

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

            <View style={style.searchContainer} >

                <View style={[GlobalStyle.BodyWrapper, style.searchBox]} onTouchStart={openSearch}>

                    <SearchBox
                        onChangeText={(text) => setSearchText(text)}
                        value={searchText} placeholderText={FIND_UPTAINER}>                              
                    </SearchBox>

                </View>

                {isSearching && (
                    <View>
                        <UptainerList searchValue={searchText}></UptainerList>
                    </View>
                )}

            </View>

            <View onTouchStart={closeSearch} style={style.container2} />

            <Navigationbar navigation={navigation} ></Navigationbar>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        //Added height for the status bar to obtain the correct screen height.
        height: windowHeight,
        width: windowWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    searchContainer: {
        marginTop: 45,
        width: '80%',
    },
    container2: {
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

export default ServiceAdminContent
