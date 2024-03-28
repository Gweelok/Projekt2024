/**
 * Stylesheet
 * front end, easy access to be changed here
 * **/

import { StyleSheet } from "react-native";
import { DefaultTheme } from "@react-navigation/native";
import indexStyles from "../styles/index";

// Stylesheet like CSS
export const styles = StyleSheet.create({
  mapStyle: {
    marginTop: indexStyles.metrics.screen.map.marginTop,
    width: indexStyles.metrics.screen.map.width,
    height: indexStyles.metrics.screen.map.height,
    borderRadius: indexStyles.metrics.screen.map.borderRadius,
    borderWidth: indexStyles.metrics.screen.map.borderWidth,
  },
  seperatorStyle: {
    height: indexStyles.metrics.misc.separator.height,
    width: indexStyles.metrics.misc.separator.width,
    backgroundColor: indexStyles.colorPalette.grayishLimeGreen, //<------------------------- add constant
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  //Headlines
  Header: {
    fontSize: indexStyles.typography.fontSize.h1,
    marginBottom: indexStyles.metrics.header.primary.marginBottom,
    marginTop: indexStyles.metrics.header.primary.marginTop,
    fontFamily: indexStyles.typography.fontFamily.primary,
  },
  Header_Primarycolor1: {
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body1,
    marginTop: indexStyles.metrics.header.secondary.marginTop,
    marginBottom: indexStyles.metrics.header.secondary.marginBottom,
  },

  //Links
  link: {
    color: indexStyles.colorPalette.Primarycolor1,
    textDecorationLine: "underline",
    textAlign: "center",
    fontFamily: indexStyles.typography.fontFamily.primary,
  },
  //paragraph - use for all paragraphs in the app on interactive screens
  paragraph_text: {
    fontFamily: indexStyles.typography.fontFamily.primary,
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body1,
  },
  article_text: {
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body1,
  },
  //Input box
  inputBox: {
    height: indexStyles.metrics.box.input.height,
    width: indexStyles.metrics.box.input.width,
    marginLeft: indexStyles.metrics.box.input.marginLeft,
    marginRight: indexStyles.metrics.box.input.marginRight,
    marginBottom: indexStyles.metrics.box.input.marginBottom,
    borderWidth: indexStyles.metrics.box.input.borderWidth,
    padding: indexStyles.metrics.box.input.padding,
    fontSize: indexStyles.typography.fontSize.body1,
    fontFamily: indexStyles.typography.fontFamily.primary,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
    alignSelf: "stretch",
  },
  errorInputBox: {
    borderColor: indexStyles.colorPalette.errorRed, //Error red  //<------------------------- add constant
    borderWidth: indexStyles.metrics.box.error.borderWidth,
  },
  errorText: {
    color: indexStyles.colorPalette.errorRed, //Error red  //<------------------------- add constant
    marginTop: -indexStyles.metrics.text.error.marginTop,
    fontSize: indexStyles.typography.fontSize.body3,
  },
  //Menu items
  menuItem: {
    width: indexStyles.metrics.item.menu.width,
    marginLeft: indexStyles.metrics.item.menu.marginLeft,
    marginRight: indexStyles.metrics.item.menu.marginRight,
    marginBottom: indexStyles.metrics.item.menu.marginBottom,
    padding: indexStyles.metrics.item.menu.padding,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    borderWidth: indexStyles.metrics.item.menu.borderWidth,
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
    flexDirection: "row",
  },
  // Form labels
  formLabel: {
    fontFamily: indexStyles.typography.fontFamily.primaryBold,
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body2,
    marginLeft: indexStyles.metrics.label.form.marginLeft,
    marginRight: indexStyles.metrics.label.form.marginRight,
    marginBottom: indexStyles.metrics.label.form.marginBottom,
    marginTop: indexStyles.metrics.label.form.marginTop,
    fontWeight: indexStyles.typography.fontWeight.bold,
  },
  // (optional) text style
  optionalText: {
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body4,
    fontWeight: indexStyles.typography.fontWeight.regular,
    fontFamily: indexStyles.typography.fontFamily.primary,
  },
  //Text for both menuitem and boxlink
  menuItem_text: {
    fontFamily: indexStyles.typography.fontFamily.primaryBold,
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.h4,
    marginRight: indexStyles.metrics.text.menuItem.marginRight,
    marginTop: indexStyles.metrics.text.menuItem.marginTop, //disabled
  },
  menuItem_arrow: {
    color: indexStyles.colorPalette.Primarycolor1,
  },
  Icon_container: {
    justifyContent: "center",
    marginLeft: indexStyles.metrics.container.icon.marginLeft,
    alignItems: "center",
  },

  //Box_Link
  boxlink: {
    paddingBottom: indexStyles.metrics.box.link.paddingBottom,
    paddingTop: indexStyles.metrics.box.link.paddingTop,
    marginVertical: indexStyles.metrics.box.link.marginVertical,
    padding: indexStyles.metrics.box.link.padding,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    backgroundColor: indexStyles.colorPalette.Primarycolor2,
    flexDirection: "row",
    minHeight: indexStyles.metrics.box.link.minHeight,
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
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    width: indexStyles.metrics.container.badge.width,
    height: indexStyles.metrics.container.badge.height,
    justifyContent: "center",
    alignItems: "center", // Adjust spacing as needed
    marginLeft: indexStyles.metrics.container.badge.marginLeft,
  },
  badgeText: {
    color: indexStyles.colorPalette.Primarycolor3, // Customize the text color as needed----- added as const
    fontSize: indexStyles.typography.fontSize.h4,
    fontWeight: indexStyles.typography.fontWeight.bold,
  },
  container2: {
    top: "5%",
    flex: 1,
    backgroundColor: indexStyles.colorPalette.Primarycolor3, // White background  //<------------------------- add constant
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: indexStyles.colorPalette.Primarycolor3, // White background  //<------------------------- add constant
    marginTop: indexStyles.metrics.header.primary.marginTop,
    marginBottom: indexStyles.metrics.header.secondary.marginBottom,
  },
  HeaderFull: {
    flexDirection: "row",
    width: indexStyles.metrics.header.full.width,
  },
  HeaderText: {
    fontSize: indexStyles.typography.fontSize.h2,
    marginLeft: indexStyles.metrics.header.text.marginLeft,
    marginRight: indexStyles.metrics.header.text.marginRight,
    fontFamily: indexStyles.typography.fontFamily.primaryMedium,
    color: indexStyles.colorPalette.Primarycolor1,
  },
  divider: {
    borderColor: indexStyles.colorPalette.Primarycolor1,
    borderWidth: indexStyles.metrics.misc.divider.borderWidth,
    marginVertical: indexStyles.metrics.misc.divider.marginVertical,
  },
  closeButton: {
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    padding: indexStyles.metrics.button.close.padding, // Decreased padding to make the button smaller
  },
  closeButtonIcon: {
    color: indexStyles.colorPalette.Primarycolor3, // White text color  //<------------------------- add constant
  },
  headline: {
    fontSize: indexStyles.typography.fontSize.h3,
    fontWeight: indexStyles.typography.fontWeight.bold,
    color: indexStyles.colorPalette.Primarycolor1, // Dark green text color
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  qrScannerFrame: {
    width: indexStyles.metrics.container.qrScanner.width,
    flex: 1,
    height: indexStyles.metrics.container.qrScanner.height,
    marginBottom: indexStyles.metrics.container.qrScanner.marginBottom,
    marginTop: indexStyles.metrics.container.qrScanner.marginTop,
  },

  buttonsContainer: {
    display: "flex",
  },
  //Headlines and body text
  bodyText: {
    textAlign: "left",
  },
  Bodywrapper: { // prbably not used.
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
    flex: 1,
    top: indexStyles.metrics.container.Bodywrapper.top,
  }, //<------------------------- add constant
});

//Profile styles
export const profileStyles = StyleSheet.create({
  profileIcon: {
    marginRight: indexStyles.metrics.icon.profile.marginRight,
    marginLeft: indexStyles.metrics.icon.profile.marginLeft,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: indexStyles.metrics.icon.profile.marginBottom,
    padding: indexStyles.metrics.icon.profile.padding,
    color: indexStyles.colorPalette.Primarycolor1,
  },
});

const regRenderStyle = { height: 65 };
const stationListStyle = { width: 170 * 2, height: 80 };
const cornerStyle = { borderRadius: 5 };
const chooseStyle = { marginBottom: 10, width: 190 * 2 };

/* const bigFont = { fontSize: 35 };
const midFont = { fontSize: 24 }; */

const buttonStyles = {
  backgroundColor: indexStyles.colorPalette.cyan, // mint-green?  //<------------------------- add constant (OLD COLOR)
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

//const yellowColor = { backgroundColor: "#f4940a" };
//const greyColor = { backgroundColor: "#f3f3f3" };

/*export const elementsStyles = {  Keep or del...
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
};*/

export const navStyle = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: indexStyles.colorPalette.Primarycolor3, // WHITE - Should be replaced with const //<------------------------- add constant
  },
};

//Background styles
export const Backgroundstyle = StyleSheet.create({
  informationScreens: {
    paddingTop: indexStyles.metrics.screen.information.paddingTop,
    alignItems: "center",
    flex: 1,
    backgroundColor: indexStyles.colorPalette.Primarycolor2,
  },
  interactive_screens: {
    paddingTop: indexStyles.metrics.screen.interactive.paddingTop,
    alignItems: "center",
    flex: 1,
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
  },
  message_Screens: {
    alignItems: "center",
    flex: 1,
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
  },
});

//Background styles
export const Buttons = StyleSheet.create({
  buttonfb: {
    backgroundColor: indexStyles.colorPalette.facebookBlue,
    fontSize: indexStyles.typography.fontSize.button2,
    padding: indexStyles.metrics.button.facebook.padding,
    marginLeft: indexStyles.metrics.button.facebook.marginLeft,
    marginRight: indexStyles.metrics.button.facebook.marginRight,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: indexStyles.metrics.button.facebook.width,
    marginTop: indexStyles.metrics.button.facebook.marginTop,
  },
  buttongoogle: {
    backgroundColor: indexStyles.colorPalette.googleRed, //<------------------------- add constant
    fontSize: indexStyles.typography.fontSize.button2,
    padding: indexStyles.metrics.button.google.padding,
    marginBottom: indexStyles.metrics.button.google.marginBottom,
    alignItems: "center",
    marginLeft: indexStyles.metrics.button.google.marginLeft,
    marginRight: indexStyles.metrics.button.google.marginRight,
    width: indexStyles.metrics.button.google.width,
    marginTop: indexStyles.metrics.button.google.marginTop,
  },
  main_button: {
    padding: indexStyles.metrics.button.primary.padding,
    marginLeft: indexStyles.metrics.button.primary.marginLeft,
    marginRight: indexStyles.metrics.button.primary.marginRight,
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    borderWidth: indexStyles.metrics.button.primary.borderWidth,
    width: indexStyles.metrics.button.primary.width,
    marginVertical: indexStyles.metrics.button.primary.marginVertical,
  },
  disabled_button: {
    opacity: indexStyles.metrics.button.disabled.opacity,
  },
  main_buttonText: {
    color: indexStyles.colorPalette.Primarycolor3,
    textAlign: "center",
    fontSize: indexStyles.typography.fontSize.button1,
    fontFamily: indexStyles.typography.fontFamily.primaryMedium,
  },
  secondary_button: {
    padding: indexStyles.metrics.button.secondary.padding,
    marginLeft: indexStyles.metrics.button.secondary.marginLeft,
    marginRight: indexStyles.metrics.button.secondary.marginRight,
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    borderWidth: indexStyles.metrics.button.secondary.borderWidth,
    width: indexStyles.metrics.button.secondary.width,
    marginVertical: indexStyles.metrics.button.secondary.marginVertical,
  },
  secondary_buttonText: {
    color: indexStyles.colorPalette.Primarycolor1,
    textAlign: "center",
    fontSize: indexStyles.typography.fontSize.button1,
    fontFamily: indexStyles.typography.fontFamily.primaryMedium,
  },
  iconContainerRight: {
    position: "absolute",
    top: indexStyles.metrics.container.iconRight.top,
    right: indexStyles.metrics.container.iconRight.right,
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
  },
  Icon: {
    color: indexStyles.colorPalette.Primarycolor3,
  },

  //used for continue with facebook and with continue with google
  SocialMediabuttonText: {
    color: indexStyles.colorPalette.Primarycolor3, // <------------------ add constant
    textAlign: "center",
    fontSize: indexStyles.typography.fontSize.body2,
    fontFamily: indexStyles.typography.fontFamily.primaryMedium,
  },
});
export const HeaderText = StyleSheet.create({
  Header: {
    fontSize: indexStyles.typography.fontSize.h2,
    marginBottom: indexStyles.metrics.header.text.marginBottom,
    fontFamily: indexStyles.typography.fontFamily.primaryMedium,
    color: indexStyles.colorPalette.Primarycolor1,
  },
  Header_Primarycolor1: {
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body5,
    marginTop: indexStyles.metrics.header.secondary.marginTop,
    marginBottom: indexStyles.metrics.header.secondary.marginBottom,
  },
});
// Dropdown
export const dropdownStyles = StyleSheet.create({
  dropdownContainer: {
    ...styles.inputBox,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: indexStyles.metrics.container.dropdownPrimary.height,
  },
  dropdownContainer2: {
    position: "absolute",
    zIndex: indexStyles.metrics.container.dropdownSecondary.zIndex,
    marginTop: indexStyles.metrics.container.dropdownSecondary.marginTop,
    width: indexStyles.metrics.container.dropdownSecondary.width,
    maxHeight: indexStyles.metrics.container.dropdownSecondary.maxHeight,
  },
  dropdownText: {
    ...styles.menuItem_text,
    flex: 0,
    marginRight: indexStyles.metrics.text.dropdown.marginRight,
  },
  dropdownList: {
    borderWidth: indexStyles.metrics.list.dropdown.borderWidth,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    marginTop: indexStyles.metrics.list.dropdown.marginTop,
  },

  dropdownListItem: {
    padding: indexStyles.metrics.list.dropdownItemPrimary.padding,
    borderBottomWidth: 1,
    borderBottomColor: indexStyles.colorPalette.Primarycolor1,
  },
  dropdownFilterTextHome: {
    fontFamily: indexStyles.typography.fontFamily.primaryBold,
    color: indexStyles.colorPalette.Primarycolor4,
    flex: 0,
    fontWeight: indexStyles.typography.fontWeight.regular,
  },
  dropdownListItem2: {
    backgroundColor: indexStyles.colorPalette.Primarycolor3, //<------------------------- add constant
    padding: indexStyles.metrics.list.dropdownItemSecondary.padding,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    width: indexStyles.metrics.list.dropdownItemSecondary.width,
    borderWidth: indexStyles.metrics.list.dropdownItemSecondary.borderWidth,
    borderBottomWidth:
      indexStyles.metrics.list.dropdownItemSecondary.borderBottomWidth,
  },
  dropdownSearchFieldListContainer: {
    top: indexStyles.metrics.container.dropdownSearchFieldList.top,
    left: indexStyles.metrics.container.dropdownSearchFieldList.left,
    right: indexStyles.metrics.container.dropdownSearchFieldList.right,
    zIndex: indexStyles.metrics.container.dropdownSearchFieldList.zIndex,
    width: indexStyles.metrics.container.dropdownSearchFieldList.width,
    borderBottomWidth:
      indexStyles.metrics.container.dropdownSearchFieldList.borderBottomWidth,
    borderRightWidth:
      indexStyles.metrics.container.dropdownSearchFieldList.borderRightWidth,
    borderLeftWidth:
      indexStyles.metrics.container.dropdownSearchFieldList.borderLeftWidth,
    borderTopWidth:
      indexStyles.metrics.container.dropdownSearchFieldList.borderTopWidth,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    minHeight: indexStyles.metrics.container.dropdownSearchFieldList.minHeight,
    justifyContent: "center",
    position: "absolute",
    backgroundColor: indexStyles.colorPalette.Primarycolor3, //<------------------------- add constant
  },
  dropdownSearchFieldList: {
    backgroundColor: indexStyles.colorPalette.Primarycolor3, //<------------------------- add constant
    padding: indexStyles.metrics.list.dropdownSearchField.padding,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    width: indexStyles.metrics.list.dropdownSearchField.width,
  },
  dropdownErrorText: {
    textAlign: "center",
    paddingTop: indexStyles.metrics.text.dropdownError.paddingTop,
    paddingBottom: indexStyles.metrics.text.dropdownError.paddingBottom,
    color: indexStyles.colorPalette.Primarycolor4,
  },
});
