/**
 * Stylesheet
 * front end, easy access to be changed here
 * **/

import { StyleSheet } from "react-native";
import { DefaultTheme } from "@react-navigation/native";

//		backgroundColor: '#fff',
//Main colors
export const Primarycolor1= "#1c4b3d"; // DarkGreen
export const Primarycolor2= "#dae2e0"; //lightgreen
export const Primarycolor3= "#fff"; // White


// Stylesheet like CSS
export const styles = StyleSheet.create({
  landingPageStyle: {
    flex: 1,
    marginTop: 20,
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
  Header : {
    fontSize: 35,
    marginBottom: 20,
    marginTop: 30,
    fontFamily: 'space-grotesk-bold',
  },
  Header_Primarycolor1  : {
    color: Primarycolor1,
    },

  //Links 
  link :{
    color: Primarycolor1,
    textDecorationLine: 'underline',
    textAlign: 'center',   
    fontFamily: 'space-grotesk',
  },
  //paragraph 
  paragraph_text : {
    fontFamily: 'space-grotesk',
    color: Primarycolor1,
    fontSize: 16, 
  },
  //Input box
  inputBox: {
    height: 45,
    width :'90%',
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom :15,
    borderWidth: 4,
    padding: 10,
    fontSize: 16,
    fontFamily: 'space-grotesk',
    borderColor: Primarycolor1,
    backgroundColor: Primarycolor3,
    alignSelf: 'stretch',
  },
  //Menu items
  menuItem :
  {
    width :'90%',
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom :15,
    padding: 10,
    borderColor: Primarycolor1,
    borderWidth : 4, 
    backgroundColor: Primarycolor3,
    flexDirection: 'row',
  },
  //Text for both menuitem and boxlink
  menuItem_text :
  {
    fontFamily: 'space-grotesk-bold',
    color: Primarycolor1, 
    fontSize: 20, 
  },
  menuItem_arrow:
  {
    color : Primarycolor1,
  },
  Icon_container:
  {
   // justifyContent : "center",
    // marginLeft : "auto",
    // alignItems : "center",
  },

  //Box_Link
  boxlink :
  {
    marginBottom :15,
    padding: 10,
    borderColor: Primarycolor1,
    backgroundColor: Primarycolor2,
    flexDirection: 'row',
    alignItems: "center",
  }

});

const regRenderStyle = { height: 65 };
const stationListStyle = { width: 170 * 2, height: 80 };
const cornerStyle = { borderRadius: 5 };
const chooseStyle = { marginBottom: 10, width: 190 * 2 };

const bigFont = { fontSize: 35 };
const midFont = { fontSize: 24 };

const buttonStyles = {
  backgroundColor: "#4cac6a",
  borderRadius: 10,
};
const productButtonStyles = {
  ...buttonStyles,
  minHeight: 61,
};
const buttonsWrapper = {
  flexDirection: "row",
  justifyContent: "space-evenly",
  marginBottom: 30,
};
const yellowColor = { backgroundColor: "#f4940a" };
const greyColor = { backgroundColor: "#f3f3f3" };

export const elementsStyles = {
  regRenderStyle,
  stationListStyle,
  cornerStyle,
  chooseStyle,
  bigFont,
  midFont,
  buttonStyles,
  buttonsWrapper,
  yellowColor,
  greyColor,
  productButtonStyles,
};

export const navStyle = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(255,255,255)",
  },
};



//Background styles 
export const Backgroundstyle = StyleSheet.create({

  informationScreens:{
    aliginItems : 'center',
    flex: 1,
    backgroundColor: Primarycolor2,
  },
  interactive_screens:{
    aliginItems : 'center',
    flex: 1,
    backgroundColor: Primarycolor3,
  },
  message_Screens :{
    aliginItems : 'center',
    flex: 1,
    backgroundColor: Primarycolor1,
  },
});

//Background styles 
export const Buttons = StyleSheet.create({
  buttonfb: {
    backgroundColor: '#4765A9',
    fontSize: 22,
    padding: 10,
    width :'70%',
    margin: 30,
    marginLeft: "auto",
    marginRight:"auto",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection : "row",
  },
  buttongoogle: {
    backgroundColor: '#F41616',
    fontSize: 22,
    padding: 10,
    width :'50%',
    marginLeft: "auto",
    marginRight:"auto",
    marginBottom : 20,

  },
  main_button: {
    padding: 10,
    width :'90%',
    marginLeft: "auto",
    marginRight:"auto",
    backgroundColor: Primarycolor1,
    borderColor: Primarycolor1,
    borderWidth: 2,
  },
  main_buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  secondary_button:
  {
    padding: 7,
    width :'90%',
    marginLeft: "auto",
    marginRight:"auto",
    backgroundColor: Primarycolor3,
    borderColor: Primarycolor1,
    borderWidth: 4,
  },
  secondary_buttonText: {
    color: Primarycolor1,
    textAlign: 'center',
    fontSize: 15,
  },
  iconContainerRight: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: Primarycolor1,
  },
  Icon:
  {
    color : Primarycolor3,
  },

 //used for continue with facebook and with continue with google
  SocialMediabuttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
});
