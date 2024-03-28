import { StyleSheet, StatusBar } from "react-native";
import indexStyle from "../../../styles/index";

/**
 * This is the styles for the screen templates.
 */

const screenStyle = StyleSheet.create({
    bodyWrapper: {
        flex: 1,
        paddingHorizontal: '5%',
        width: '100%'
    },
    screen: {
        flex: 1,
    },
    wideScreen: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    fullScreen: {
        flex: 1,
        backgroundColor: indexStyle.colorPalette.Primarycolor1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    interactive: {
        marginTop: 50,
        alignItems: "center",
        flex: 1,
        backgroundColor: indexStyle.colorPalette.Primarycolor3
    },
    information: {
        paddingTop: 50,
        alignItems: "center",
        flex: 1,
        backgroundColor: indexStyle.colorPalette.Primarycolor2
    },
    message: {
        alignItems: "center",
        flex: 1,
        backgroundColor: indexStyle.colorPalette.Primarycolor1
    }
});

export default screenStyle;