import React from "react";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/AntDesign';
import {styles} from "../../styles/Stylesheet";
const QRScanner = () => {
    const navigation = useNavigation();
    const { currentLanguage } = useLanguage();

    const handlePress = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container2}>
            <View style={styles.header}>
                {/* Header Text */}
                <Text style={styles.headline}>
                    {t("QrScannerScreen.Scan", currentLanguage)}
                </Text>
                {/* Close Button */}
                <TouchableOpacity style={styles.closeButton} onPress={handlePress}>
                    <Icon size={30} name="close" style={styles.closeButtonIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {/* Header Instruction */}
                <Text style={styles.instruction}>
                    {t("QrScannerScreen.Header", currentLanguage)}
                </Text>

                {/* QR Code Scanner Frame */}
                {/* You would integrate the QR code scanner library here */}
                <View style={styles.qrScannerFrame}>
                    <View style={styles.dashedBorder}></View>
                </View>

                {/* Instruction for Non-Uptainers */}
                <Text style={styles.instruction}>
                    {t("QrScannerScreen.Bottom", currentLanguage)}
                </Text>
            </View>
        </SafeAreaView>
    );
};


export default QRScanner;