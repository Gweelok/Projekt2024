import { StyleSheet } from "react-native";
import indexStyles from "../../../styles/index";

const customCallOutStyles = StyleSheet.create({
    rowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    columnContainer: {
        flexDirection: 'column',
        marginLeft: indexStyles.metrics.container.column.marginLeft,
        marginBottom: indexStyles.metrics.container.column.marginBottom,
        marginTop: indexStyles.metrics.container.column.marginTop,
        marginRight: indexStyles.metrics.container.column.marginRight,
    },
    locationName: {
        fontSize: indexStyles.typography.fontSize.body1,
        fontWeight: indexStyles.typography.fontWeight.bold,
        fontFamily: indexStyles.typography.fontFamily.primaryBold,
        flexWrap: 'wrap',
        maxWidth: indexStyles.metrics.text.locationName.maxWidth,
    },
    locationAddress: {
        flexWrap: 'wrap',
        marginBottom: indexStyles.metrics.text.locationAddress.marginBottom,
        fontSize: indexStyles.typography.fontSize.body4,
        fontFamily: indexStyles.typography.fontFamily.primary,
        maxWidth: indexStyles.metrics.text.locationAddress.maxWidth,
    },
    Icon: {
        justifyContent: 'center',
        fontSize: indexStyles.typography.fontSize.h8,
        color: indexStyles.colorPalette.Primarycolor1
    }
});

export default customCallOutStyles;