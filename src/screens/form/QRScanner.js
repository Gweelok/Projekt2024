import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button } from "react-native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { generateQRCode } from '../../utils/QRCodeGenerator';

const QRScanner = () => {
    const navigation = useNavigation();
    const { currentLanguage } = useLanguage();

    const handlePress = () => {
        navigation.goBack();
    }

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned');
    const [scannedQRCode, setScannedQRCode] = useState(null); // State to store the generated QR code

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // What happens when we scan the barcode
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data);
        const scannedQRCode = generateQRCode(data); // Generate QR code for scanned data
        setScannedQRCode(scannedQRCode); // Set the generated QR code for display
        console.log('Type: ' + type + '\nData: ' + data)
    };

    // Function to handle the "Scan again?" button press
    const handleScanAgain = () => {
        setScanned(false); // Reset the scanned state
        setText('Not yet scanned'); // Reset the scanned text
        setScannedQRCode(null); // Clear the scanned QR code
    };

    return (
        <SafeAreaView style={styles.container}>
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
                {hasPermission ? (
                    <View style={styles.qrScannerFrame}>
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={{ height: 320, width: 400 }}
                        />
                    </View>
                ) : (
                    <Text style={{ margin: 10 }}>No access to the camera</Text>
                )}

                {/* Display scanned text */}
                <Text style={styles.maintext}>{text}</Text>

                {/* Display generated QR code */}
                {scannedQRCode && (
                    <View style={styles.qrCodeContainer}>
                        {scannedQRCode}
                    </View>
                )}

                {scanned && (
                    <Button title={'Scan again?'} onPress={handleScanAgain} color='darkgreen' />
                )}

                {/* Instruction for Non-Uptainers */}
                <Text style={styles.instruction}>
                    {t("QrScannerScreen.Bottom", currentLanguage)}
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: "white",
        marginTop: 15,
    },
    closeButton: {
        backgroundColor: "darkgreen",
        padding: 5,
        borderRadius: 5,
    },
    closeButtonIcon: {
        color: "white",
    },
    headline: {
        fontSize: 24,
        fontWeight: "bold",
        color: "darkgreen",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    qrScannerFrame: {
        width: 320,
        height: 320,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        borderRadius: 10,
        position: "relative",
    },
    dashedBorder: {
        width: "100%",
        height: "100%",
        borderColor: "darkgreen",
        borderWidth: 5,
        borderStyle: "dashed",
        borderRadius: 12,
        marginTop: 20,
        borderSpacing: 90,
    },
    instruction: {
        fontSize: 16,
        textAlign: "center",
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
        color: "darkgreen",
    },
    qrCodeContainer: {
        width: 100, // Adjust the width as needed
        height: 200, // Adjust the height as needed
        marginTop: 10,
        
        
        
    },
});

export default QRScanner;
