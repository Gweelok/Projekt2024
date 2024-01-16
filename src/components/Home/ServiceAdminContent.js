import { View, StyleSheet } from "react-native"
import UptainerList from "./UptainerList"
import SearchBox from "./SearchBox"
import { windowHeight, windowWidth } from "../../utils/Dimensions"
import GlobalStyle from "../../styles/GlobalStyle"
import { windowHeight, windowWidth } from "../../utils/Dimensions"

const ServiceAdmin = () => {
    return (
        <View style={style.container}>

            <View style={style.container2} >

                <View style={[GlobalStyle.BodyWrapper, style.searchBox]} >
                    <SearchBox value={searchText} placeholderText={"Search"}></SearchBox>
                </View>


                <View>
                    <UptainerList searchValue={searchText}></UptainerList>
                </View>

            </View>
            <View>

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
