import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Navigationbar from "../componets/Navigationbar";
import GlobalStyle from "../styles/GlobalStyle";

const dummyImages = [
  {
    id: 1,
    uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
  },
  {
    id: 2,
    uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
  },
  {
    id: 3,
    uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
  },
  {
    id: 4,
    uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
  },
];

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const UptainerDetails = ({ navigation, route }) => {
  const item = route.params;
  console.log("item, item");

  return (
      // <View style={GlobalStyle.BodyWrapper}>

        <View style={styles.container}>
          <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 10 }}
          >
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" color="white" size={20} />
            </TouchableOpacity>
            <View>
              <ImageBackground
                  style={styles.detailsImage}
                  source={{
                    uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
                  }}
              >
                <TouchableOpacity
                    onPress={() => navigation.navigate("Map")}
                    style={styles.productLocation}
                >
                  <Text style={styles.productAddress}>
                    {item.name} /{"\n"}
                    {item.location}
                  </Text>
                  <Ionicons name="chevron-forward" color="white" size={30} />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View
                style={{
                  flexDirection: "row",
                  marginTop: 50,
                  width: windowWidth,
                  flexWrap: "wrap",
                }}
            >
              {dummyImages?.map((cur, i) => (
                  <TouchableOpacity
                      key={i}
                      style={{
                        marginLeft: 6,
                        marginBottom: 20,
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => navigation.navigate("DetailView")}
                  >
                    <Image
                        style={styles.moreProductsImage}
                        source={{
                          uri: cur?.uri,
                        }}
                    />
                    <Text style={{ fontWeight: "600" }}>Dummy Text</Text>
                  </TouchableOpacity>
              ))}
            </View>
            <View
                style={[
                  styles.section,
                  { marginTop: 50, minHeight: 200, marginBottom: 100 },
                ]}
            />
          </ScrollView>
          <Navigationbar navigation={navigation} />
        </View>
      // </View>
  );
};

export default UptainerDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    backgroundColor: "#1c4b3d",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  detailsImage: {
    width: windowWidth / 1.1,
    height: windowHeight / 3,
  },
  productLocation: {
    width: windowWidth / 1.7,
    backgroundColor: "#1c4b3d",
    height: 70,
    position: "absolute",
    bottom: -30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productAddress: {
    width: "70%",
    fontSize: 16,
    color: "white",
    fontWeight: "700",
    padding: 10,
    // backgroundColor: "red",
  },
  moreProductsImage: {
    width: windowWidth / 2.7,
    height: windowHeight / 6.4,
  },
});