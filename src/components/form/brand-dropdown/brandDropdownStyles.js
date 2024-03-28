import { StyleSheet } from "react-native";
import {styles,styles as stylesGlobal} from "../../../styles/Stylesheet";
import indexStyles from "../../../styles/index";

const brandDropdownContainer = StyleSheet.create({
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
    borderTopWidth: indexStyles.metrics.list.dropdown.borderTopWidth,
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
  },
  disabled: {
    backgroundColor: indexStyles.colorPalette.lightGray,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  formLabel: {
    ...stylesGlobal.formLabel,
    marginLeft: indexStyles.metrics.label.dropdown.marginLeft,
    marginTop: indexStyles.metrics.label.dropdown.marginTop,
  },
  optionalText: {
    ...stylesGlobal.optionalText,
    marginLeft: indexStyles.metrics.text.dropdownOptional.marginLeft,
    marginTop: indexStyles.metrics.text.dropdownOptional.marginTop,
  },
  arrowIcon: {
    ...styles.menuItem_arrow,
    fontSize: indexStyles.typography.fontSize.h4,
  },
  searchIcon: {
    fontSize: indexStyles.typography.fontSize.h4,
    color: indexStyles.colorPalette.Primarycolor4,
  },
  link: {
    ...styles.badgeText,
  },
  linkText: {
    ...styles.link,
  },
  placeholderColor: {
    color: indexStyles.colorPalette.Primarycolor4,
  },
});

export default brandDropdownContainer;