import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";

const searchBoxStyles = StyleSheet.create({
  searchIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  inputContainer: {
    backgroundColor: "white",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 3,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    paddingHorizontal: 10,
  },
  input: {
    borderRadius: 0,
    flex: 1,
    backgroundColor: "white",
    color: indexStyles.colorPalette.Primarycolor1,
  },
  placeholderText: {
    color: indexStyles.colorPalette.Primarycolor4,
  },
  feather: {
    size: 22,
    color: indexStyles.colorPalette.Primarycolor1,
    fallbackColor: indexStyles.colorPalette.Primarycolor4,
  },
});

export default searchBoxStyles;
