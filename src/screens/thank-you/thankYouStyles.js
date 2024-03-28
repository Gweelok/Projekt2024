import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";

const thankYouStyles = StyleSheet.create({

    topSpacer:{
        paddingTop: 50
    },
    textContainer:{
        flex: 1, 
        justifyContent: 'center', 
        marginTop: indexStyles.metrics.container.thankYou.marginTop, 
        marginBottom: indexStyles.metrics.container.thankYou.marginBottom
    },
    text:{
        color: indexStyles.colorPalette.Primarycolor3, 
        fontSize: indexStyles.typography.fontSize.h4, 
        margin: indexStyles.metrics.text.thankYou.margin, 
        textAlign: 'center'
    }
});

export default thankYouStyles;