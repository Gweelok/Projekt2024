import { StyleSheet } from "react-native";
import indexStyles from "../../styles";

const languageDropdownStyles = StyleSheet.create({

    parentContainer: {
        width: "100%",
        position: "relative",
        zIndex: 1,
    },
    container: {
        flexDirection: "column",
        position: "relative",
    },
    dropdownText: {
        fontFamily: "space-grotesk",
        fontSize: 16,
        marginRight: "50%",
    },
    dropdownButton: {
        borderWidth: 3,
        borderColor: indexStyles.colorPalette.Primarycolor1,
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
    },
    dropdownList: {
        borderWidth: 3,
        borderColor: indexStyles.colorPalette.Primarycolor1,
        backgroundColor: "#ffff",
        position: "absolute",
        top: "100%", // Position the dropdown below the button
        left: 0,
        zIndex: 2, // Set a higher z-index to make the dropdown appear above other content
        width: "100%",
        maxHeight: 150,
        overflowY: "auto",
        opacity: 1, // Remove opacity for a fully visible dropdown
    },
    dropdownListItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: indexStyles.colorPalette.Primarycolor1,
        backgroundColor: indexStyles.colorPalette.Primarycolor3,
    },
    globeIcon:{
        fontSize:24,
         color: indexStyles.colorPalette.Primarycolor1
    },
    arrowIcon:{
        fontSize:20
    }
});

export default languageDropdownStyles;