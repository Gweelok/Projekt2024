import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { Primarycolor1, Primarycolor2 } from "../../styles/Stylesheet";
import { useNavigation } from "@react-navigation/native";

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => navigation.navigate("Landingscreen"), 2000);
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={Primarycolor1} />
      </View>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Primarycolor2,
    justifyContent: "center",
    alignContent: "center",
    // alignSelf: "center",
    alignItems: "center",
  },
});
