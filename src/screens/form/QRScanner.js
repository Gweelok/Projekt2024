import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Linking, Button } from "react-native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library you want to use
import { BarCodeScanner } from 'expo-barcode-scanner';



const QRScanner = () => {
    const navigation = useNavigation();
    const { currentLanguage } = useLanguage();

    const handlePress = () => {
        navigation.goBack();
}


const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
const [text, setText] = useState('Not yet scanned');

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

// What happens when we scan the bar code
const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data)
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
                <Text style={{ margin: 10 }}>No access to camera</Text>
            )}

            {/* Display scanned text */}
            <Text style={styles.maintext}>{text}</Text>

            {scanned && (
                <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />
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
        backgroundColor: "white", // White background
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10, // Added padding to lower the header slightly
        paddingHorizontal: 5,
        backgroundColor: "white", // White background
        marginTop: 15, // Adjust the margin to lower the header
    },
    closeButton: {
        backgroundColor: "darkgreen",
        padding: 5, // Decreased padding to make the button smaller
        borderRadius: 5,
    },
    closeButtonIcon: {
        color: "white", // White text color
    },
    headline: {
        fontSize: 24,
        fontWeight: "bold",
        color: "darkgreen", // Dark green text color
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
        //  backgroundColor: "darkgreen", // Dark green background for border
        borderRadius: 10, // Rounded corners
        position: "relative",
        // overflow: "hidden", // Hide overflow from dashed border
    },
    dashedBorder: {
        width: "100%",
        height: "100%",
        borderColor: "darkgreen", // Dark green border color
        borderWidth: 5, // Increase line thickness as needed
        borderStyle: "dashed", // Dashed line style
        borderRadius: 12, // Increase radius for larger dashes
        marginTop: 20, // Adjust the space between dashes
        borderSpacing: 90, // Adjust the space between dashes
    },
    instruction: {
        fontSize: 16,
        textAlign: "center",
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
        color: "darkgreen", // Dark green text color
    },
});

export default QRScanner;
