import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { styles, Backgroundstyle } from "../styles/Stylesheet";
import Navigationbar from "../componets/Navigationbar";
import React from "react";
import { windowWidth } from "../utils/Dimensions";
import { Ionicons } from "@expo/vector-icons";

const Profile = ({ navigation }) => {
  return (
    <View style={Backgroundstyle.interactive_screens}>
      <View style={{ padding: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("PrivacyPolicy")}
          style={{
            borderWidth: 3,
            borderColor: styles.menuItem.borderColor,
            padding: 20,
            width: windowWidth / 1.1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: styles.menuItem.borderColor,
              fontSize: 16,
              fontWeight: "900",
            }}
          >
            Data Policy
          </Text>
          <Ionicons
            name="chevron-forward"
            color={styles.menuItem.borderColor}
            size={20}
          />
        </TouchableOpacity>
      </View>

      <Navigationbar navigation={navigation} />
    </View>
  );
};

export default Profile;
