import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";

const styles = StyleSheet.create({
    errorBanner: {
        backgroundColor: indexStyles.colorPalette.errorRed,
        padding: indexStyles.metrics.banner.error.padding,
        alignItems: "center",
        width: indexStyles.metrics.banner.error.width,
        marginTop: indexStyles.metrics.banner.error.marginTop,
    },
    errorText: {
        color: indexStyles.colorPalette.Primarycolor3,
    },
});

export default styles;
