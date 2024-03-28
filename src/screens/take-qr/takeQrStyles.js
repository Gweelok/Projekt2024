import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";
import { styles, Buttons } from "../../styles/Stylesheet";


const takeQrStyles = StyleSheet.create({

    headerContainer: {
        ...styles.header
    },
    headertext: {
        ...styles.headline
    },
    closeButton: {
        ...styles.closeButton
    },
    closeIcon: {
        ...styles.closeButtonIcon,
        fontSize: indexStyles.typography.fontSize.h2,
    },
    subHeading: {
        ...styles.paragraph_text
    },
    qrFrame: {
        ...styles.qrScannerFrame
    },
    barCodeScanner: {
        flex: 1
    },
    noAccessText:{
        margin: indexStyles.metrics.text.noAccess.margin,
    },
    buttonContainer:{
        ...styles.buttonsContainer
    },
    takeButton:{
        ...Buttons.main_button
    },
    takeErrorButton:{
        ...Buttons.main_button,
        backgroundColor: indexStyles.colorPalette.pureRed, 
        borderColor: indexStyles.colorPalette.pureRed,
    },
    takeButtonText:{
        ...Buttons.main_buttonText
    },
    scanAgainButton:{
        ...Buttons.secondary_button
    },
    scanAgainButtonText:{
        ...Buttons.secondary_buttonText
    },
    paragraph: {
        ...styles.paragraph_text
    },
});

export default takeQrStyles;