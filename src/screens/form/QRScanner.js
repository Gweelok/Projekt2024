import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator,} from "react-native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library you want to use

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
