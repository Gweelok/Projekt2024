
import React, { useState } from "react";
import {  Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator,} from "react-native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/AntDesign';
import {styles} from "../../styles/Stylesheet";
const QRScanner = () => {
    const navigation = useNavigation();
    const { currentLanguage } = useLanguage();
    const [loading, setLoading] = useState(false);

    const handlePress = () => {
        navigation.goBack();
    };

    // Placeholder function to simulate scanning a QR code.
  const handleQRScan = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("UptainerDetails", { itemData: "Sample Scanned Data" }); 
    }, 3000); // waits for 3 seconds
  };

    return (
        <SafeAreaView style={[styles.container2]}>
            <View style={[styles.header]}>
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
                {loading ? (
                <ActivityIndicator size="large" color="darkgreen" />
                 ) : (
                    <>
                        <TouchableOpacity style={styles.qrScannerFrame} onPress={handleQRScan}>
                        <View style={styles.dashedBorder}></View>
                        </TouchableOpacity>
                        <Text style={styles.instruction}>
                        {t("QrScannerScreen.Bottom", currentLanguage)}
                        </Text>
                    </>
                )}
      </View>
    </SafeAreaView>
  );
};


export default QRScanner;