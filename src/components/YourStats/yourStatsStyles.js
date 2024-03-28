import { StyleSheet } from "react-native";
import { styles, Backgroundstyle, HeaderText } from "../../styles/Stylesheet";
import indexStyles from "../../styles/index";

const yourStatsStyles = StyleSheet.create({

  amountReusedContainer: {
    marginTop: indexStyles.metrics.container.amountReused.marginTop,
    marginBottom: indexStyles.metrics.container.amountReused.marginBottom,
  },
  amountReusedText: {
    ...styles.article_text,
    fontWeight: indexStyles.typography.fontWeight.bold,
    fontSize: indexStyles.typography.fontSize.body7,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: indexStyles.metrics.container.itemsYourStats.marginTop,
  },
  itemsDonatedContainer: {
    ...Backgroundstyle.informationScreens,
    paddingTop: indexStyles.metrics.container.itemsDonated.paddingTop,
    marginRight: indexStyles.metrics.container.itemsDonated.marginRight,
  },
  itemsText: {
    ...styles.paragraph_text,
    marginTop: indexStyles.metrics.text.itemsYourStats.marginTop,
    fontSize: indexStyles.typography.fontSize.body3,
  },
  itemsCo2Text: {
    ...HeaderText.Header,
    marginLeft: indexStyles.metrics.text.itemsCO2.marginLeft,
    marginTop: indexStyles.metrics.text.itemsCO2.marginTop,
    fontSize: indexStyles.typography.fontSize.h1,
  },
  itemsCollectedContainer: {
    ...Backgroundstyle.informationScreens,
    paddingTop: indexStyles.metrics.container.itemsCollected.paddingTop,
  },
  overviewLinkContainer: {
    marginTop: indexStyles.metrics.container.overviewLink.marginTop,
  },
  overviewLink: {
    ...styles.link
  },
  amountCo2Container: {
    marginTop: indexStyles.metrics.container.amountCO2YourStats.marginTop,
  },
  amountCo2Text: {
    ...styles.article_text,
    fontWeight: indexStyles.typography.fontWeight.bold,
    fontSize: indexStyles.typography.fontSize.body7,
    marginBottom: indexStyles.metrics.text.amountCO2.marginBottom,
  },
  greenBoxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: indexStyles.metrics.container.greenBox.marginTop,
  },

  greenBoxHeader: {
    marginBottom: indexStyles.metrics.header.greenBox.marginBottom
  },
  equivalentContainerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: indexStyles.metrics.container.equivalentTop.marginTop,
    marginBottom: indexStyles.metrics.container.equivalentTop.marginBottom,
    marginRight: indexStyles.metrics.container.equivalentTop.marginRight,
  },
  equivalentContainerBottom: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: indexStyles.metrics.container.equivalentBottom.marginTop,
    marginBottom: indexStyles.metrics.container.equivalentBottom.marginBottom,
    marginRight: indexStyles.metrics.container.equivalentBottom.marginRight,
  },
  equivalentText: {
    ...styles.paragraph_text,
    marginLeft: indexStyles.metrics.text.equivalent.marginLeft,
  },
  socialsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: indexStyles.metrics.container.socials.marginTop,
  },
  socialField: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: indexStyles.metrics.box.socialField.marginTop,
    marginBottom: indexStyles.metrics.box.socialField.marginBottom,
    marginRight: indexStyles.metrics.box.socialField.marginRight,
  },
  socialIcon: {
    fontSize: indexStyles.typography.fontSize.h2,
    color: indexStyles.colorPalette.Primarycolor3,
  },
  socialButton: {
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    alignItems: "center",
    borderRadius: indexStyles.metrics.button.social.borderRadius,
    padding: indexStyles.metrics.button.social.padding,
    height: indexStyles.metrics.button.social.height,
    width: indexStyles.metrics.button.social.width,
  },
  socialTextField: {
    marginTop: indexStyles.metrics.box.socialTextField.marginTop,
    alignItems: "center"
  },
  socialText: {
    ...styles.paragraph_text,
    fontSize: indexStyles.typography.fontSize.body3,
  },
  divider:{
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    height: indexStyles.metrics.misc.divider.height,
    marginTop: indexStyles.metrics.misc.divider.marginTop,
    marginBottom: indexStyles.metrics.misc.divider.marginBottom,
  },
  uptainer:{
    ...styles.menuItem_text, 
    marginBottom: indexStyles.metrics.margin.uptainerYourStats.marginBottom 
  },
  getInspired:{
    marginTop: indexStyles.metrics.box.getInspired.marginTop, 
    marginBottom: indexStyles.metrics.box.getInspired.marginBottom, 
  },
  getInspiredText:{
    ...styles.article_text, 
    fontWeight: indexStyles.typography.fontWeight.bold, 
    fontSize: indexStyles.typography.fontSize.body7,
  }
});

export default yourStatsStyles;
