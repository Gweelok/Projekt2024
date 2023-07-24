/**
 * Stylesheet
 * front end, easy access to be changed here
 * **/

import { StyleSheet } from "react-native";
import { DefaultTheme } from "@react-navigation/native";

//		backgroundColor: '#fff',
//Main colors
const Primarycolor1= "#1c4b3d"; // DarkGreen
const Primarycolor2= "#dae2e0"; //lightgreen
const Primarycolor3= "#fff"; // White

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
  Header : {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    marginLeft:40, 
    fontFamily: 'space-grotesk',
  },
  Header_Primarycolor1  : {
    fontSize: 35,
    marginBottom: 50,
    marginTop: 40,
    marginLeft:40, 
    color: Primarycolor1,
    fontFamily: 'space-grotesk-bold',

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
    height: 40,
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
    alignSelf: 'stretch'
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
    postion :"relative",

  },
  //Text for both menuitem and boxlink
  menuItem_text :
  {
    //fontFamily : 'SpaceGrotesk',
    color: Primarycolor1, 
    fontWeight : "bold",
    fontSize: 20, 
  },
  menuItem_arrow:
  {
    color : Primarycolor1,
  },
  Icon_container:
  {
   justifyContent : "center",
    marginLeft : "auto",
    alignItems : "center",
  },

  //Box_Link
  boxlink :
  {
    width :'95%',
    marginBottom :15,
    padding: 10,
    borderColor: Primarycolor1,
    backgroundColor: Primarycolor2,
    flexDirection: 'row',
    postion :"relative",
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
    justifyContent: 'center',
  },
  main_button: {
    padding: 10,
    width :'90%',
    marginLeft: "auto",
    marginRight:"auto",
    backgroundColor: '#0F5202',
    borderColor: '#0F5202',
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
    backgroundColor: '#fff',
    borderColor: Primarycolor1,
    borderWidth: 4,
  },
  secondary_buttonText: {
    color: Primarycolor1,
    textAlign: 'center',
    fontSize: 15,
  },
  Icon_buttons: {
    backgroundColor: Primarycolor1,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  
});

