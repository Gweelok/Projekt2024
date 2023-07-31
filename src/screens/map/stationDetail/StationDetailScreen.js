import Navigationbar from '../../../componets/Navigationbar';
import React from 'react';
import {StyleSheet, StatusBar, Image, View, Dimensions} from "react-native";
import BackButton from "./BackButton";
import StationTitle from "./StationTitle";
import {Backgroundstyle} from "../../../styles/Stylesheet";
import PrimaryColorButton from "./PrimaryColorButton";
import WhiteColorButton from "./WhiteColorButton";

const { width } = Dimensions.get('window');
const imageSize = width * 0.85;

const StationDetailScreen = ({ route, navigation }) => {
    const {stationDetail} = route.params;
    return (
        <View style={Backgroundstyle.interactive_screens}>
            <View style={styles.backButtonContainer}>
                <BackButton navigation={navigation} />
            </View>
            <View style={styles.titleContainer}>
                <StationTitle title={stationDetail.name} description={stationDetail.address} //todo get title and description from backend
                />
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../../../assets/images/cph.jpg')} //todo get image from backend
                    style={styles.image}
                />
            </View>

            <View style={styles.buttonContainer}>
                <PrimaryColorButton onPress={() => { /* todo */ }} titleText="Vis vej" />
            </View>

            <View style={styles.buttonContainer2}>
                <WhiteColorButton onPress={() => { /* todo */ }} titleText="Vis produkter" />
            </View>

            <Navigationbar navigation={navigation} />
        </View>
    );
}


const styles = StyleSheet.create({
    backButtonContainer: {
        position: 'absolute',
        left: 30,
        top: StatusBar.currentHeight + 30,
    },
    titleContainer: {
        marginTop: StatusBar.currentHeight + 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    image: {
        width: imageSize,
        height: imageSize,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    buttonContainer2: {
        alignItems: 'center',
        marginTop: 20,
    },
});


export default StationDetailScreen;
