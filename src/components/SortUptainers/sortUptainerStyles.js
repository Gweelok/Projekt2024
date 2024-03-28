import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";
import { windowHeight, windowWidth } from "../../utils/Dimensions";

const sortUptainerStyles = StyleSheet.create({
  container: {
    marginTop: indexStyles.metrics.container.sortUptainer.marginTop,
  },
  loadingContainer: {
    width: windowWidth,
    height: windowHeight - 145,
    alignSelf: "center",
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: indexStyles.metrics.screen.wrapper.paddingHorizontal,
    width: indexStyles.metrics.screen.wrapper.width,
  },
  noProductFoundErr: {
    fontSize: indexStyles.typography.fontSize.body1,
    fontWeight: indexStyles.typography.fontWeight.medium,
    color: indexStyles.colorPalette.Primarycolor1,
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
    paddingTop: indexStyles.metrics.text.noProductFoundError.paddingTop,
    paddingBottom: indexStyles.metrics.text.noProductFoundError.paddingBottom,
    zIndex: indexStyles.metrics.text.noProductFoundError.zIndex,
    paddingLeft: indexStyles.metrics.text.noProductFoundError.paddingLeft,
    width: indexStyles.metrics.text.noProductFoundError.width,
  },
});

export default sortUptainerStyles;
