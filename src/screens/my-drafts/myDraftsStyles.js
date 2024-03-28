import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";
import { styles } from "../../styles/Stylesheet";

const myDraftsStyle = StyleSheet.create({
  headerContianer: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    ...styles.HeaderFull,
  },
  headerText: {
    ...styles.HeaderText,
  },
  draftCardsListContainer: {
    marginTop: indexStyles.metrics.container.draftCardList.marginTop,
  },
});

export default myDraftsStyle;
