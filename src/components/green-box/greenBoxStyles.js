import { StyleSheet } from "react-native";
import indexStyles from "../../styles";
import { Backgroundstyle, HeaderText, styles } from "../../styles/Stylesheet";

const greenBoxStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: indexStyles.metrics.container.greenBox.marginTop,
  },
  background: {
    ...Backgroundstyle.informationScreens,
    paddingTop: indexStyles.metrics.misc.greenBoxBG.paddingTop,
    width: indexStyles.metrics.misc.greenBoxBG.width,
    paddingHorizontal: indexStyles.metrics.misc.greenBoxBG.paddingHorizontal,
  },
  messageText: {
    ...styles.paragraph_text,
    marginTop: indexStyles.metrics.text.greenBox.marginTop,
    width: indexStyles.metrics.text.greenBox.width,
    paddingHorizontal: indexStyles.metrics.text.greenBox.paddingHorizontal,
  },
  rowData: {
    flexDirection: "row",
    width: indexStyles.metrics.text.greenBox.width,
    paddingHorizontal: indexStyles.metrics.text.greenBox.paddingHorizontal,
  },
  dataText: {
    ...HeaderText.Header,
    marginLeft: indexStyles.metrics.text.greenBoxData.marginLeft,
    marginTop: indexStyles.metrics.text.greenBoxData.marginTop,
  },
  secondMessageContainer: {
    alignItems: "center",
    marginRight: indexStyles.metrics.container.greenBoxSecondMessage.marginRight,
    width: indexStyles.metrics.text.greenBox.width,
    paddingHorizontal: indexStyles.metrics.text.greenBox.paddingHorizontal,
  },
  secondMessageText: {
    ...styles.article_text,
    marginTop: indexStyles.metrics.text.greenBoxSecondMessage.marginTop,
    textAlign: "center",
    fontSize: indexStyles.typography.fontSize.body4,
    width: indexStyles.metrics.text.greenBox.width,
  },
  secondDataText: {
    ...styles.paragraph_text,
    marginTop: indexStyles.metrics.text.greenBoxSecondData.marginTop,
    textAlign: "center",
  },
});

export default greenBoxStyles;
