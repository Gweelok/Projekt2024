import { StyleSheet } from "react-native";
import { dropdownStyles, styles } from "../../../styles/Stylesheet";
import indexStyles from "../../../styles/index";

const stationMapStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBox: {
    ...indexStyles.metrics.screen.wrapper,
    position: "absolute",
    zIndex: indexStyles.metrics.box.search.zIndex,
    marginTop: indexStyles.metrics.box.search.marginTop,
    width: indexStyles.metrics.box.search.width,
  },
  stationInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stationName: {
    fontWeight: indexStyles.typography.fontWeight.bold,
    fontSize: indexStyles.typography.fontSize.body1,
    marginBottom: indexStyles.metrics.text.stationName.marginBottom,
    color: indexStyles.colorPalette.Primarycolor1,
  },
  addressInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: indexStyles.metrics.margin.addressInfo.marginBottom,
  },
  stationAddress: {
    fontSize: indexStyles.typography.fontSize.body5,
    color: indexStyles.colorPalette.Primarycolor1,
    width: indexStyles.metrics.text.stationAddress.width,
  },

  distance: {
    width: indexStyles.metrics.text.distance.width,
    fontSize: indexStyles.typography.fontSize.body5,
    color: indexStyles.colorPalette.Primarycolor1,
    alignItems: "center",
  },
  lastItem: {
    borderBottomWidth: indexStyles.metrics.item.last.borderBottomWidth,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    ...indexStyles.metrics.screen.wrapper,
    ...dropdownStyles.dropdownContainer2,
  },
  dropdownListItem: {
    ...dropdownStyles.dropdownListItem2,
  },
  noUptainerContainer: {
    borderColor: indexStyles.colorPalette.Primarycolor1,
    width: indexStyles.metrics.container.noUptainer.width,
    borderWidth: indexStyles.metrics.container.noUptainer.borderWidth,
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
  },
  noUptainerText: {
    marginBottom: indexStyles.metrics.text.noUptainer.marginBottom,
    maxHeight: indexStyles.metrics.text.noUptainer.maxHeight,
    marginTop: indexStyles.metrics.text.noUptainer.marginTop,
    textAlign: "center",
    color: indexStyles.colorPalette.Primarycolor4,
  },
  activityIndicator: {
    ...styles.MainContainer,
  },
});

export default stationMapStyles;