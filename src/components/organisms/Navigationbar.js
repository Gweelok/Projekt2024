//imports
import { StyleSheet, View, Pressable} from "react-native";
import React,{useState} from "react";
import { Ionicons } from "@expo/vector-icons";
import { Primarycolor1, Primarycolor2 } from "../../styles/styleSheet";

//Page_names
const PAGE_NAMES = {
  HOME: "Home",
  STATS: "Stats",
  PROFILE: "Profile",
  QRSCANNER: "QRScanner", // For testing of QRCodeScreen, should be deleted later
};

const Navigationbar = ({ navigation }) => {

  const [page, setPage] = useState('');

  //handles when clicked on icons
  const handlePress = (iconName) => {

    switch (iconName) {
      case PAGE_NAMES.HOME: setPage(PAGE_NAMES.HOME);
        navigation.navigate(PAGE_NAMES.HOME);
        break;
      case PAGE_NAMES.STATS: setPage(PAGE_NAMES.STATS);
        //navigation.navigate(PAGE_NAMES.STATS);
        break;
      case PAGE_NAMES.PROFILE: setPage(PAGE_NAMES.PROFILE);
        //navigation.navigate(PAGE_NAMES.PROFILE);
        break;
      case PAGE_NAMES.QRSCANNER: setPage(PAGE_NAMES.QRSCANNER); // For testing QRCodeScreen, should be deleted later
        navigation.navigate(PAGE_NAMES.QRSCANNER);
        break;
    }
  };

  return (
    <View style={styles.tabBarStyle}>
      <Pressable onPress={() => handlePress(PAGE_NAMES.HOME)}>
        {page == PAGE_NAMES.HOME ? (
          <Ionicons name="ios-home-sharp" size={24} color={Primarycolor1} />
        ) : (
          <Ionicons name="ios-home-outline" size={24} color={Primarycolor1} />
        )}
      </Pressable>

      <Pressable onPress={() => handlePress(PAGE_NAMES.STATS)}>
        {page === PAGE_NAMES.STATS ? (
          <Ionicons name="stats-chart-sharp" size={22} color={Primarycolor1} />
        ) : (
          <Ionicons
            name="stats-chart-outline"
            size={24}
            color={Primarycolor1}
          />
        )}
      </Pressable>

      <Pressable onPress={() => handlePress(PAGE_NAMES.PROFILE)}>
        <View>
          {page === PAGE_NAMES.PROFILE ? (
            <Ionicons
              name="person-circle-sharp"
              size={24}
              color={Primarycolor1}
            />
          ) : (
            <Ionicons
              name="person-circle-outline"
              size={24}
              color={Primarycolor1}
            />
          )}
        </View>
      </Pressable>
      {/* For testing QR Scanner, should be deleted later */}
      <Pressable onPress={() => handlePress(PAGE_NAMES.QRSCANNER)}>
        <View>
          {page === PAGE_NAMES.QRSCANNER ? (
            <Ionicons
              name="qr-code-sharp"
              size={24}
              color={Primarycolor1}
            />
          ) : (
            <Ionicons
              name="qr-code-outline"
              size={24}
              color={Primarycolor1}
            />
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default Navigationbar;
// styles for the tool bar
const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: -5,
    left: -5,
    elevation: 0,
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: Primarycolor2,
    borderWidth: 2,
  }
});
