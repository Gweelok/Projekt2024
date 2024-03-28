import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  img: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default splashStyles;