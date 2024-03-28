import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";

const loadingStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexStyles.colorPalette.Primarycolor2,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    indicatorContainer: {
        justifyContent: "center",
        alignContent: "center",
        alignSelf: "center",
        alignItems: "center"
    },
    activityIndicator: {
        color: indexStyles.colorPalette.Primarycolor1
    }
});

export default loadingStyles;