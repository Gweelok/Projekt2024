import { View, StyleSheet, Image } from "react-native"
import { windowHeight, windowWidth } from "../utils/Dimensions"
import UptainerInfo from "../components/Uptainer/UptainerInfo"
import GlobalStyle from "../styles/GlobalStyle"
import { getImage, getItemByUptainerId } from "../utils/Repo";
import { useEffect, useState } from "react";

const OverView = ({ route }) => {
    //const { location } = route.params;
    const [itemList, setItemList] = useState([]);
    const [imgUrlList, setImgUrlList] = useState([]);

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
            const imgUrlPromises = itemList.map(async item => {
                return await getImage(item.itemImage);
            });
            const imgUrlList = await Promise.all(imgUrlPromises);
            setImgUrlList(imgUrlList);
            console.log(imgUrlList)
        }
        fetchData();
    }, [location.uptainerId]);

    return (
        <View style={[style.container, GlobalStyle.BodyWrapper]}>
            <UptainerInfo location={location} />
            {imgUrlList.map(item => (
                <Image source={{ uri: item }}
                    style={{ width: 100, height: 100 }} />
            ))}
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
