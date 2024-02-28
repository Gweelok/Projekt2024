import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import StatusBarComponent from "../componets/atoms/StatusBarComponent";
import ScrollViewComponent from "../componets/atoms/ScrollViewComponent";
import HeaderTitle from "../componets/atoms/HeaderTitle";
import { Primarycolor1 } from "../styles/Stylesheet";
import { t, useLanguage } from "../Languages/LanguageHandler";
import { updateItemToTaken } from "../utils/Repo";
import Screens from "../utils/ScreenPaths";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProductIsTakenScreen = ({ navigation, route, fetchUpdatedData }) => {
  const productItem = route?.params;
  const { currentLanguage } = useLanguage();

    const productIsTaken = async () => {
      try {
        const itemId = productItem?.data;
        if (itemId) {
          // This function will be replaced to notifyItemAsTaken since users can only notify.
          await updateItemToTaken(itemId);
          navigation.navigate(Screens.THANK_YOU);
        } else {
          console.error("Item ID is missing.");
        }
      } catch (error) {
        console.error("Error marking product as taken:", error);
      }
    };

  return (
    <StatusBarComponent>
      <ScrollViewComponent>
        <View style={styles.container}>
          <HeaderTitle
            onRightIconPress={() => {
              navigation.goBack();
            }}
            rightIcon="close-outline"
          />
          <Image
            style={styles.takenImage}
            source={{ uri: productItem?.imageUrl }}
          />
          <Text style={styles.apologyText}>
            {t("ProductIsTakenScreen.apology", currentLanguage)}
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.targetButton}
            onPress={() => {
              productIsTaken();
            }}
          >
            <Text style={styles.targetText}>
              {t("ProductIsTakenScreen.takenButton", currentLanguage)}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollViewComponent>
    </StatusBarComponent>
  );
};

export default ProductIsTakenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  takenImage: {
    padding: 50,
    height: windowHeight / 2.5,
    width: windowWidth / 1.2,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  apologyText: {
    color: Primarycolor1,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    width: windowWidth / 1.2,
    fontSize: 14,
    fontWeight: "500",
  },
  targetButton: {
    backgroundColor: Primarycolor1,
    width: windowWidth / 1.2,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  targetText: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
  },
});