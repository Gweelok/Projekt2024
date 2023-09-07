import { View, TextInput, ScrollView, StyleSheet , Dimensions} from "react-native";
import { Backgroundstyle, Primarycolor1 } from "../styles/Stylesheet";
import Navigationbar from "../componets/Navigationbar";
import React, { useState } from "react";
import * as Location from "expo-location";
import SortUptainers from "../componets/sortUptainers";
import {Feather} from "@expo/vector-icons";
import { firebaseAurth } from '../utils/Firebase';
import GlobalStyle from "../styles/GlobalStyle";


const Home = ({ navigation }) => {
  //Asks for premission to use location at home screen only, must be sent here for new users or copy paste to other screens
  console.log("start current useeffect");
  (async () => {
    if (firebaseAurth.currentUser === null) {
        navigation.navigate('Landingscreen')
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");

    } else {
      console.log("status good");
      //				let loc = await Location.getLastKnownPositionAsync({});
      let loc = await Location.getCurrentPositionAsync({});
 
    }
  })();

  const [search, onChangeSearch] = useState("");

  return (
    <View style={Backgroundstyle.interactive_screens}>
    <View style={GlobalStyle.BodyWrapper}>

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
        <SortUptainers navigation={navigation} />    
      </ScrollView>
      <Navigationbar navigation={navigation} />
    </View>
    </View>
  );
};





const styles = StyleSheet.create({
    searchIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    container: {
        marginTop: 15,
        width: '100%',
        // width:  Dimensions.get('window').width * 0.9,
        // marginLeft : "auto",
        // marginRight:"auto",
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
export default Home;

