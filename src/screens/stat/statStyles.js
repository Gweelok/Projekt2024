import { StyleSheet } from "react-native";
import { styles, HeaderText, Buttons } from "../../styles/Stylesheet";
import indexStyles from "../../styles/index";

const statStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  headerText: {
    ...HeaderText.Header,
    fontFamily: indexStyles.typography.fontFamily.primaryMedium,
    marginLeft: indexStyles.metrics.margin.statHeaderText.marginLeft,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: indexStyles.metrics.container.button.marginTop,
  },
  buttonPlacer: {
    width: indexStyles.metrics.width.buttonPlacer.width,
  },
  mainButton: {
    ...Buttons.main_button,
  },
  secondaryButton: {
    ...Buttons.secondary_button,
    marginVertical: "4%", //To match main
  },
  mainButtonText: {
    ...Buttons.main_buttonText,
  },
  secondaryButtonText: {
    ...Buttons.secondary_buttonText,
  },
  mainContentContainer: {
    justifyContent: "space-between",
    marginTop: indexStyles.metrics.container.statsMainContent.marginTop,
  },
  amountReducedContainer: {
    marginTop: indexStyles.metrics.container.amountReduced.marginTop,
    marginBottom: indexStyles.metrics.container.amountReduced.marginBottom,
  },
  amountReducedText: {
    ...styles.article_text,
    fontWeight: indexStyles.typography.fontWeight.bold,
    fontSize: indexStyles.typography.fontSize.body7,
  },
  chart: {
    height: indexStyles.metrics.chart.stats.height,
  },
  amountCO2Container: {
    marginTop: indexStyles.metrics.container.amountCO2.marginTop,
  },
  amountCO2TextContainer: {
    marginTop: indexStyles.metrics.container.amountCO2Text.marginTop,
    marginBottom: indexStyles.metrics.container.amountCO2Text.marginBottom,
  },
  amountCO2Text: {
    ...styles.article_text,
    fontWeight: indexStyles.typography.fontWeight.bold,
    fontSize: indexStyles.typography.fontSize.body7,
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
  statsContainer: {
    alignContent: "center",
    marginTop: indexStyles.metrics.container.stats.marginTop,
  },
  bestAcheieveText: {
    ...styles.menuItem_text,
  },
  mostVisitedText: {
    ...styles.menuItem_text,
    marginBottom: indexStyles.metrics.text.mostVisited.marginBottom,
  },
});

export default statStyles;
