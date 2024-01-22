import { StyleSheet } from "react-native";

export const Primarycolor1 = "#1c4b3d"; // DarkGreen
export const Primarycolor2 = "#dae2e0"; //lightgreen
export const Primarycolor3 = "#fff"; // White
export const Primarycolor4 = "#8EA59E"; //SweetGreen

// Stylesheet like CSS

export const styles = StyleSheet.create({
    landingPageStyle: {
      flex: 1,
      marginTop: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    mapStyle: {
      marginTop: 40,
      width: 170 * 2,
      height: 120 * 3,
      borderRadius: 10,
      borderWidth: 1,
    },
    seperatorStyle: {
      height: 1,
      width: "100%",
      backgroundColor: "#CED0CE",
    },
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    //Headlines
    Header: {
      fontSize: 35,
      marginBottom: 20,
      marginTop: 30,
      fontFamily: "space-grotesk",
    },
    Header_Primarycolor1: {
      color: Primarycolor1,
      fontSize: 16,
      marginTop: 10,
      marginBottom: 10,
    },
  
    //Links
    link: {
      color: Primarycolor1,
      textDecorationLine: "underline",
      textAlign: "center",
      fontFamily: "space-grotesk",
    },
    //paragraph
    paragraph_text: {
      fontFamily: "space-grotesk",
      color: Primarycolor1,
      fontSize: 16,
    },
    article_text: {
      //fontFamily: "arial",
      color: Primarycolor1,
      fontSize: 16,
    },
    //Input box
    inputBox: {
      height: 45,
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: 15,
      borderWidth: 4,
      padding: 10,
      fontSize: 16,
      fontFamily: "space-grotesk",
      borderColor: Primarycolor1,
      backgroundColor: Primarycolor3,
      alignSelf: "stretch",
    },
    //Menu items
    menuItem: {
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: 15,
      padding: 10,
      borderColor: Primarycolor1,
      borderWidth: 4,
      backgroundColor: Primarycolor3,
      flexDirection: "row",
    },
    // Form labels
    formLabel: {
    fontFamily: "space-grotesk-bold",
    color: Primarycolor1,
    fontSize: 15,
    marginLeft: 17,
    marginBottom: 10,
    marginTop: 5,
    fontWeight: "bold",
  },
  // (optional) text style
  optionalText: {
    color: Primarycolor1,
    fontSize: 13,
    fontWeight: "300",
    fontFamily: "space-grotesk"
  },
    //Text for both menuitem and boxlink
    menuItem_text: {
      fontFamily: "space-grotesk-bold",
      color: Primarycolor1,
      fontSize: 20,
      marginRight: "auto",
    },
    menuItem_arrow: {
      color: Primarycolor1,
    },
    Icon_container: {
      justifyContent: "center",
      marginLeft: "auto",
      alignItems: "center",
    },
  
    //Box_Link
    boxlink: {
      paddingBottom: 10,
      paddingTop: 10,
      marginVertical: 10,
      padding: 10,
      borderColor: Primarycolor1,
      backgroundColor: Primarycolor2,
      flexDirection: "row",
      minHeight: 80,
      position: "relative",
      alignContent: "center",
      alignItems: "center",
    },
    boxlinkContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    badgeContainer: {
      position: "absolute",
      backgroundColor: Primarycolor1,
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center", // Adjust spacing as needed
      marginLeft: 10,
    },
    badgeText: {
      color: "white", // Customize the text color as needed
      fontSize: 20,
      fontWeight: "bold",
    },
    container2: {
      top: "5%",
      flex: 1,
      backgroundColor: "white", // White background
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10, // Added padding to lower the header slightly
      paddingHorizontal: 20,
      backgroundColor: "white", // White background
      marginTop: 15, // Adjust the margin to lower the header
    },
    closeButton: {
      backgroundColor: Primarycolor1,
      padding: 3, // Decreased padding to make the button smaller
    },
    closeButtonIcon: {
      color: "white", // White text color
    },
    headline: {
      fontSize: 24,
      fontWeight: "bold",
      color: Primarycolor1, // Dark green text color
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    qrScannerFrame: {
      width: 250,
      height: 400,
      justifyContent: "center",
      // alignItems: "center",
      marginBottom: 20,
      //  backgroundColor: "darkgreen", // Dark green background for border
      borderRadius: 10, // Rounded corners
      position: "relative",
      //  overflow: "hidden", // Hide overflow from dashed border
    },
    dashedBorder: {
      width: "100%",
      height: "100%",
      borderColor: "white", // Dark green border color
      borderWidth: 5, // Increase line thickness as needed
      borderStyle: "dashed", // Dashed line style
      borderRadius: 12, // Increase radius for larger dashes
      marginTop: 20, // Adjust the space between dashes
      borderSpacing: 90, // Adjust the space between dashes
    },
    buttonsContainer: {
      display: "flex",
    },
    instruction: {
      fontSize: 18,
      //textAlign: "center",
      marginHorizontal: 20,
      marginTop: 5,
      marginBottom: 5,
      color: Primarycolor1, // Dark green text color
    },
  
    //Headlines and body text
    bodyText: {
      textAlign: "left",
    },
  });

  // Dropdown
export const dropdownStyles = StyleSheet.create({
  dropdownContainer: {
    ...styles.inputBox,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 55,
  },
  dropdownContainer2: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 87,
    width: '100%',
    maxHeight:250,
  },
  dropdownText: {
    ...styles.menuItem_text,
    flex: 0,
    marginRight: 5,
  },
  dropdownList: {
    borderWidth: 4,
    borderColor: Primarycolor1,
    marginTop: 0,
  },

  dropdownListItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Primarycolor1,
  },
  dropdownListItem2: {
    backgroundColor: 'white',
    padding: 10,
    borderColor: Primarycolor1,
    width: '100%',
    borderWidth:3,
    borderBottomWidth: 0,
  },
});
export const Buttons = StyleSheet.create({
  main_button: {
    padding: 8,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: Primarycolor1,
    borderColor: Primarycolor1,
    borderWidth: 4,
    width: "100%",
    marginTop: "4%"
  },
  main_buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontFamily: "space-grotesk-Medium",
  },
})