/**
 * Stylesheet
 * front end, easy access to be changed here
 * **/

import { Dimensions, StyleSheet } from "react-native";
import { DefaultTheme } from "@react-navigation/native";

//		backgroundColor: '#fff',
//Main colors
export const Primarycolor1 = "#1c4b3d"; // DarkGreen
export const Primarycolor2 = "#dae2e0"; //lightgreen
export const Primarycolor3 = "#fff"; // White
export const Primarycolor4 = "#8EA59E"; //SweetGreen

// Stylesheet like CSS
export const styles = StyleSheet.create({
  
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
  
  Icon_container: {
    justifyContent: "center",
    marginLeft: "auto",
    alignItems: "center",
  },

  
});
