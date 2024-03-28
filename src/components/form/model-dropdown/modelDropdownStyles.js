import { StyleSheet } from "react-native";
import { styles } from "../../../styles/Stylesheet";
import indexStyles from "../../../styles/index";

const modelDropdownStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
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
  dropdownLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownLabel: {
    ...styles.formLabel,
    marginLeft: indexStyles.metrics.label.dropdown.marginLeft,
    marginTop: indexStyles.metrics.label.dropdown.marginTop,
  },
  dropdownOptional: {
    ...styles.optionalText,
    marginLeft: indexStyles.metrics.text.dropdownOptional.marginLeft,
    marginTop: indexStyles.metrics.text.dropdownOptional.marginTop,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
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
    borderColor: indexStyles.colorPalette.Primarycolor3,
    borderWidth: indexStyles.metrics.container.search.borderWidth,
    width: indexStyles.metrics.container.search.width,
    paddingLeft: indexStyles.metrics.container.search.paddingLeft,
  },
  input: {
    height: indexStyles.metrics.label.inputField.height,
    width: indexStyles.metrics.label.inputField.width,
    marginLeft: indexStyles.metrics.label.inputField.marginLeft,
    marginLeft: 5, //???
  },
  disabled: {
    backgroundColor: indexStyles.colorPalette.lightGray,
  },
  disabledText: {
    color: indexStyles.colorPalette.Primarycolor4,
  },
  downIcon: {
    ...styles.menuItem_arrow,
    fontSize: indexStyles.typography.fontSize.h4,
  },
  searchIcon: {
    fontSize: indexStyles.typography.fontSize.h4,
    color: indexStyles.colorPalette.Primarycolor4,
  },
  placeholderColor: {
    color: indexStyles.colorPalette.Primarycolor4,
  },
  link: {
    ...styles.badgeText,
  },
  linkText: {
    ...styles.link,
  },
});

export default modelDropdownStyles;
