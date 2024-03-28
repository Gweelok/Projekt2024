import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";
import { styles } from "../../styles/Stylesheet";

const stationDetailsStyles = StyleSheet.create({
  headerContainer: {
    ...styles.HeaderFull,
  },
  backButtonContainer: {
    position: "absolute",
    left: indexStyles.metrics.container.backButton.left,
  },
  titleContainer: {
    marginTop: indexStyles.metrics.margin.stationDetailTitle.marginTop,
    marginLeft: indexStyles.metrics.header.text.marginLeft,
    marginRight: indexStyles.metrics.header.text.marginRight,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: indexStyles.metrics.image.stationDetail.width,
    height: indexStyles.metrics.image.stationDetail.height,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: indexStyles.metrics.container.stationDetailButton1.marginTop,
  },
  buttonContainer2: {
    alignItems: "center",
    marginTop: indexStyles.metrics.container.stationDetailButton2.marginTop,
  },
});

export default stationDetailsStyles;