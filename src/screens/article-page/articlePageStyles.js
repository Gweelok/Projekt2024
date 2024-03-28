import { StyleSheet } from "react-native";
import { HeaderText, Primarycolor1, styles } from "../../styles/Stylesheet";
import indexStyles from "../../styles/index";

const articlePageStyles = StyleSheet.create({
  container: {
    marginHorizontal: indexStyles.metrics.container.article.marginHorizontal, // Adjust the margin as needed
  },
  backButtonContainer: {
    position: "absolute",
    top: indexStyles.metrics.container.backButton.top, // Adjust this value to position the back button vertically
    // left: 10, // Adjust this value to position the back button horizontally
    zIndex: indexStyles.metrics.container.backButton.zIndex, // Ensure the back button appears above other content
  },
  title: {
    fontSize: indexStyles.typography.fontSize.h3,
    fontWeight: indexStyles.typography.fontWeight.bold,
    marginTop: indexStyles.metrics.header.article.marginTop,
    marginBottom: indexStyles.metrics.header.article.marginBottom,
  },
  content: {
    marginTop: indexStyles.metrics.text.article.marginTop,
    fontSize: indexStyles.typography.fontSize.body1,
  },
  writtenPlaceholder1: {
    fontWeight: indexStyles.typography.fontWeight.bold,
    marginTop: indexStyles.metrics.margin.writtenPlaceholder.marginTop,
    marginBottom: indexStyles.metrics.margin.writtenPlaceholder.marginBottom,
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body2,
    fontFamily: indexStyles.typography.fontFamily.primaryMedium,
  },

  writtenPlaceholder: {
    marginTop: indexStyles.metrics.margin.writtenPlaceholder.marginTop,
    marginBottom: indexStyles.metrics.margin.writtenPlaceholder.marginBottom,
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body2,
    fontFamily: indexStyles.typography.fontFamily.primaryMedium,
  },
  img: {
    right: indexStyles.metrics.image.article.right,
    marginLeft: indexStyles.metrics.image.article.marginLeft,
    marginRight: indexStyles.metrics.image.article.marginRight,
  },
  header: {
    ...HeaderText.Header,
  },
  articleText: {
    ...styles.article_text,
  },
  sliderHeader: {
    ...styles.menuItem_text,
  },
});

export default articlePageStyles;