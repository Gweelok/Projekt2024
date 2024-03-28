import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";
import { Buttons, styles } from "../../styles/Stylesheet";

const addQrStyles = StyleSheet.create({

    topSpacer:{
        marginTop: indexStyles.metrics.misc.topSpacer.marginTop,
    },
    header:{
        ...styles.header
    },
    headline:{
        ...styles.headline
    },
    closeButton:{
        ...styles.closeButton
    },
    closeButtonIcon:{
        ...styles.closeButtonIcon
    },
    paragraph:{
        ...styles.paragraph_text
    },
    qrScannerFrame:{
        ...styles.qrScannerFrame
    },
    barCode:{
        flex: 1
    },
    noAccess:{
        margin: 10
    },
    buttonsContainer:{
       ... styles.buttonsContainer
    },
    updroppButton:{
        ...Buttons.main_button
    },
    updroppButtonText:{
        ...Buttons.main_buttonText
    },
    errorButton:{
        backgroundColor: "red", 
        borderColor: "red"
    },
    scanAgainButton:{
        ...Buttons.secondary_button
    },
    scanAgainButtonText:{
        ...Buttons.secondary_buttonText
    }

});

export default addQrStyles;