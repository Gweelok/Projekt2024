import { StyleSheet } from "react-native";
import indexStyles from "../../../styles/index";
import { styles } from "../../../styles/Stylesheet";

const searchedLocationStyles = StyleSheet.create({
    stationInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    stationName: {
        fontWeight: indexStyles.typography.fontWeight.bold,
        fontSize: indexStyles.typography.fontSize.body1,
        marginBottom: indexStyles.metrics.text.stationName.marginBottom,
        color: indexStyles.colorPalette.Primarycolor1,
    },
    addressInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: indexStyles.metrics.margin.addressInfo.marginBottom,
    },
    stationAddress: {
        ...styles.article_text,
        fontSize: indexStyles.typography.fontSize.body5,
        color: indexStyles.colorPalette.Primarycolor1,
        width: indexStyles.metrics.text.stationAddress.width,
    },

    distance: {
        width: indexStyles.metrics.text.distance.width,
        fontSize: indexStyles.typography.fontSize.body5,
        color: indexStyles.colorPalette.Primarycolor1,
        alignItems: "center"
    },

});

export default searchedLocationStyles;