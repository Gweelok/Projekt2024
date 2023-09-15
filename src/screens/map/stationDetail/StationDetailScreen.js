import Navigationbar from '../../../componets/Navigationbar';
import React from 'react';
import {StyleSheet, StatusBar, Image, View, Dimensions, Platform, Linking, ScrollView} from "react-native";
import BackButton from '../../../componets/BackButton';
import StationTitle from "./StationTitle";
import {Backgroundstyle} from "../../../styles/Stylesheet";
import PrimaryColorButton from "./PrimaryColorButton";
import WhiteColorButton from "./WhiteColorButton";
import GlobalStyle from "../../../styles/GlobalStyle";


const { width } = Dimensions.get('window');
const imageSize = width * 0.85;

const StationDetailScreen = ({ route, navigation }) => {
    const {stationDetail} = route.params;

    const openMap = async (latitude, longitude, label = 'MyLabel') => {
        const browserUrl = `https://www.google.com/maps/dir/?api=1&origin=&destination=${latitude},${longitude}&travelmode=driving`;

        if (Platform.OS === 'android') {
            // Android open google map first, in driving mode, if google map is not available, then open map in browser.
            return Linking.openURL(browserUrl);
        } else if (Platform.OS === 'ios') {
            const url = `http://maps.apple.com/?daddr=${latitude},${longitude}`;
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    return Linking.openURL(browserUrl);
                }
            });
        }
    };

    const openStationDirectionPage = () => {
        openMap(stationDetail.latitude, stationDetail.longitude, stationDetail.name);
    };

    return (
        <View  style={Backgroundstyle.interactive_screens}>
            <View style={GlobalStyle.BodyWrapper}>

            <View style={styles.backButtonContainer}>
                <BackButton onPress={navigation.goBack}/>
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
                    <PrimaryColorButton onPress={() => { openStationDirectionPage() }} titleText="Vis vej" />
                </View>

                <View style={styles.buttonContainer2}>
                    <WhiteColorButton onPress={() => { /* todo */ }} titleText="Vis produkter" />
                </View>

                <Navigationbar navigation={navigation} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    backButtonContainer: {
        position: 'absolute',
        left: 20,
        top: StatusBar.currentHeight + 20,
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
        // alignItems: 'center',
        marginTop: 20,
    },
});


export default StationDetailScreen;