import { StyleSheet, Dimensions } from "react-native";
import indexStyles from "../../styles/index";

const windowWidth = Dimensions.get("window").width;

const articleSlidestyles = StyleSheet.create({
  //name?
  container: {
    flex: 1,
  },
  slide: {
    width: indexStyles.metrics.box.slide.width,
    height: indexStyles.metrics.box.slide.height,
    position: "relative",
    marginTop: indexStyles.metrics.box.slide.marginTop,
  },
  image: {
    width: 350,
    height: 200,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: indexStyles.colorPalette.transparentGreen,
  },
  title: {
    color: indexStyles.colorPalette.Primarycolor3,
    fontSize: indexStyles.typography.fontSize.h5,
    fontWeight: indexStyles.typography.fontWeight.bold,
    position: "absolute",
    textAlign: "left",
    justifyContent: "center",
    maxWidth: indexStyles.metrics.text.articleTitle.maxWidth,
    top: indexStyles.metrics.text.articleTitle.top,
    bottom: indexStyles.metrics.text.articleTitle.bottom,
    left: indexStyles.metrics.text.articleTitle.left,
  },
  indicatorContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    bottom: indexStyles.metrics.container.indicator.bottom,
  },
  indicator: {
    width: indexStyles.metrics.misc.indicator.width,
    height: indexStyles.metrics.misc.indicator.height,
    borderRadius: indexStyles.metrics.misc.indicator.borderRadius,
    marginHorizontal: indexStyles.metrics.misc.indicator.marginHorizontal,
    borderWidth: indexStyles.metrics.misc.indicator.borderWidth,
    borderColor: indexStyles.colorPalette.Primarycolor1,
  },
  activeIndicator: {
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
  },
});

export default articleSlidestyles;
