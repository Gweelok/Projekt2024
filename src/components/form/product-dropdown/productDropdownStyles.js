import { StyleSheet } from "react-native";
import { styles } from "../../../styles/Stylesheet";
import indexStyles from "../../../styles/index";

const productDropdownStyles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: indexStyles.metrics.container.modal.height,
    width: indexStyles.metrics.container.modal.width,
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
  dropDownLabel: {
    //Check this styles later on as the should be the same in product, brand, model and so on.
    ...styles.formLabel,
    marginLeft: indexStyles.metrics.label.dropdown.marginLeft,
    marginTop: indexStyles.metrics.label.dropdown.marginTop,
  },
  disabledColor: {
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

export default productDropdownStyles;
