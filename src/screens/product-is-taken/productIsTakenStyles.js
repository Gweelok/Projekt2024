import { StyleSheet, Dimensions } from "react-native";
import indexStyles from "../../styles/index";
import { Buttons } from "../../styles/Stylesheet";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const productIsTakenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  takenImage: {
    height: indexStyles.metrics.image.detailView.height,
    width: indexStyles.metrics.image.detailView.width,
    marginTop: indexStyles.metrics.image.detailView.marginTop,
  },
  apologyText: {
    color: indexStyles.colorPalette.Primarycolor1,
    marginTop: indexStyles.metrics.text.apology.marginTop,
    marginBottom: indexStyles.metrics.text.apology.marginBottom,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    width: windowWidth / 1.2,
    fontSize: indexStyles.typography.fontSize.body3,
    fontWeight: indexStyles.typography.fontWeight.medium,
  },
  targetButton: {
    ...Buttons.main_button,
    justifyContent: "center",
    marginTop: indexStyles.metrics.button.take.marginTop,
    marginBottom: indexStyles.metrics.button.target.marginBottom,
    height: indexStyles.metrics.button.target.height,
  },
  targetText: {
    ...Buttons.main_buttonText,
  },
});

export default productIsTakenStyles;
