import { StyleSheet } from "react-native";
import { styles } from "../../../styles/Stylesheet";
import colorPalette from "../../../styles/colors";
import indexStyles from "../../../styles/index";

const conditionDropdownContainer = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  validationErrorText: {
    color: indexStyles.colorPalette.errorRed,
  },
  dropdownText: {
    fontFamily: indexStyles.typography.fontFamily.primary,
    fontSize: indexStyles.typography.fontSize.body1,
    marginRight: indexStyles.metrics.text.dropdown.marginRight,
  },
  dropdownButton: {
    borderWidth: indexStyles.metrics.button.dropdown.borderWidth,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    padding: indexStyles.metrics.button.dropdown.padding,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownList: {
    borderTopWidth: 1,
    borderTopColor: indexStyles.colorPalette.Primarycolor1,
  },
  dropdownListItem: {
    padding: indexStyles.metrics.list.dropdownItemPrimary.padding,
    borderBottomWidth:
      indexStyles.metrics.list.dropdownItemPrimary.borderBottomWidth,
    borderBottomColor: indexStyles.colorPalette.Primarycolor1,
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
    margin: 0, // Reset margin to fill entire screen
    justifyContent: "flex-start",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: indexStyles.metrics.container.topBar.paddingHorizontal,
    marginBottom: indexStyles.metrics.container.topBar.marginBottom,
    marginTop: indexStyles.metrics.container.topBar.marginTop,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "white",
    borderColor: indexStyles.colorPalette.Primarycolor3,
    borderWidth: indexStyles.metrics.container.search.borderWidth,
    width: indexStyles.metrics.container.search.width,
    paddingLeft: indexStyles.metrics.container.search.paddingLeft,
  },
  searchText: {
    ...styles.paragraph_text,
    fontWeight: indexStyles.typography.fontWeight.bold, 
  },
  input: {
    height: indexStyles.metrics.label.inputField.height,
    width: indexStyles.metrics.label.inputField.width,
    marginLeft: indexStyles.metrics.label.inputField.marginLeft,
  },
  formLabel: {
    ...styles.formLabel,
    marginLeft: indexStyles.metrics.label.dropdown.marginLeft,
    marginTop: indexStyles.metrics.label.dropdown.marginTop,
  },
  disableText: {
    color: indexStyles.colorPalette.Primarycolor4,
  },
  arrowIcon: {
    ...styles.menuItem_arrow,
    fontSize: indexStyles.typography.fontSize.h4,
  },
  bottomDescription: {
    ...styles.article_text,
    textAlign: "center",
    marginTop: indexStyles.metrics.text.description.marginTop,
  },
});

export default conditionDropdownContainer;
