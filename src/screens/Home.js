import { View, TextInput, ScrollView, StyleSheet , Dimensions} from "react-native";
import { Backgroundstyle, Primarycolor1 } from "../styles/Stylesheet";
import Navigationbar from "../componets/Navigationbar";
import React, { useState } from "react";
import * as Location from "expo-location";
import SortUptainers from "../componets/sortUptainers";
import {Feather} from "@expo/vector-icons";





const Home = ({ navigation }) => {
  const startBackgroundTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status == "granted") {
      await Location.requestBackgroundPermissionsAsync();
    }
  };

  const [search, onChangeSearch] = useState("");

  

  return (
    <View style={Backgroundstyle.interactive_screens}>

       <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={search}
            />
            <Feather style={styles.searchIcon} name="search" size={24} color={Primarycolor1} />
        </View>
      <ScrollView style={{ marginBottom: 60 }}>
        <SortUptainers />
      </ScrollView>
      <Navigationbar navigation={navigation} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
    searchIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    container: {
        marginTop: 15,
        width:  Dimensions.get('window').width * 0.9,
        marginLeft : "auto",
        marginRight:"auto",
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: Primarycolor1,
        borderWidth: 3,
        paddingHorizontal: 10,
    },
});
