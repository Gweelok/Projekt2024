import { View, StyleSheet, Image, FlatList } from "react-native"
import { windowHeight, windowWidth } from "../utils/Dimensions"
import UptainerInfo from "../components/Uptainer/UptainerInfo"
import GlobalStyle from "../styles/GlobalStyle"
import { getImage, getItemByUptainerId } from "../utils/Repo";
import { useEffect, useState } from "react";

const OverView = ({ route }) => {
    //const { location } = route.params;  <----- Use this later
    const [itemList, setItemList] = useState([]);
    const [imgUrlList, setImgUrlList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //Should be replaced later with route param from Main-page
    const location = {
        "uptainerId": "-NbzQlf95xoexGIlcIpY",
        "url": "https://reactjs.org/logo-og.png",
        "uptainerName": "KU Lighthouse",
        "uptainerStreet": "Tagensvej 16A",
        "uptainerCity": "Nörrebro"
    }

    async function fetchItem() {
        const fetchedItems = await getItemByUptainerId(location.uptainerId)
        setItemList(fetchedItems);
    };

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            await fetchItem();
            const imgUrlPromises = itemList.map(async item => {
                return await getImage(item.itemImage);
            });
            const imgUrlList = await Promise.all(imgUrlPromises);
            setImgUrlList(imgUrlList);
            imgUrlList.map(item => { console.log(item) })
            setIsLoading(false)
        }
        fetchData();
    }, [location.uptainerId]);

    const renderItem = ({ item: url }) => (
        <Image source={{ uri: url }} style={{ width: 100, height: 100, margin: 30 }} />
    );

    return (
        <View style={[style.container, GlobalStyle.BodyWrapper]}>
            <UptainerInfo location={location} />

            {!isLoading && (
                <View style={style.list}>
                    <FlatList
                        data={imgUrlList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                    />
                </View>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        marginTop: 40,
        alignItems: 'center',
    },
    list: {
        height: 300
    }
});

export default OverView
