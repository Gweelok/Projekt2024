import { View, StyleSheet, Image } from "react-native"
import { windowHeight, windowWidth } from "../utils/Dimensions"
import UptainerInfo from "../components/Uptainer/UptainerInfo"
import GlobalStyle from "../styles/GlobalStyle"
import { getItemByUptainerId } from "../utils/Repo";
import { useEffect, useState } from "react";

const OverView = ({ route }) => {
    //const { location } = route.params;
    const [itemList, setItemList] = useState([]);

    const location = {
        "uptainerId": "-NbzQlf95xoexGIlcIpY",
        "url": "https://reactjs.org/logo-og.png",
        "uptainerName": "KU Lighthouse",
        "uptainerStreet": "Tagensvej 16A",
        "uptainerCity": "Nörrebro"
    }

    /*
     <Image source={{ uri: 'https://reactjs.org/logo-og.png' }}
                style={{ width: 100, height: 100 }} />
    */

    async function renderItem() {
        const fetchedItems = await getItemByUptainerId(location.uptainerId)
        setItemList(fetchedItems);
    };

    useEffect(() => {
        async function fetchData() {
            await renderItem();
        }
        fetchData(); 
    }, [location.uptainerId]); // Trigger effect when location.uptainerId changes

    useEffect(() => {
        itemList.forEach(item => {
            console.log(item.itemImage);
        });
    }, [itemList]); // Trigger effect when itemList changes

    return (
        <View style={[style.container, GlobalStyle.BodyWrapper]}>
            <UptainerInfo location={location} ></UptainerInfo>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        marginTop: 40
    }
})

export default OverView
