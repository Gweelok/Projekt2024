//imports
import { StyleSheet, View, Pressable } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import {
  Primarycolor1,
  Primarycolor2,
} from "../styles/Stylesheet";


//  Replicating the static idea in c++ because without it seems like they make their own copies
const createStaticBoolean = () => {
  let staticBoolean = false;

  const setStaticBoolean = (value) => {
    staticBoolean = value;
  };

  const getStaticBoolean = () => {
    return staticBoolean;
  };

  return {
    setStaticBoolean,
    getStaticBoolean,
  };
};

//Static Data members
const Home = createStaticBoolean();
const Map = createStaticBoolean();
const Add = createStaticBoolean();
const Stats = createStaticBoolean();
const Profile = createStaticBoolean();


const Navigationbar = ({ navigation }) => {

  // function to reset the values so i could know which one are selected
  const falseall =()=> {
    Home.setStaticBoolean(false);
    Map.setStaticBoolean(false);
    Add.setStaticBoolean(false);
    Stats.setStaticBoolean(false);
    Profile.setStaticBoolean(false);
  }

  //handles when clicked on icons 
  // will need to be updated later on as rn those pages aren't implemented
  const handlePress = (iconName) => {
    if (iconName=='home')
    {
      falseall();
      Home.setStaticBoolean(true);
      navigation.navigate('Homepage')
    }
    else if (iconName=='map')
    {
      falseall();
      Map.setStaticBoolean(true);
      navigation.navigate('Map')
    }
    else if (iconName=='add')
    {
      falseall();
      Add.setStaticBoolean(true);
      navigation.navigate('Add')
      
    }
    else if (iconName=='stats')
    {
      falseall();
      Stats.setStaticBoolean(true);
      navigation.navigate('Stats')
    }
    else if (iconName=='profile')
    {
      falseall();
      Profile.setStaticBoolean(true);
      navigation.navigate('Profile')
    }
    
  }

  return (
    <View style={styles.tabBarStyle}>

      <Pressable onPress={() => handlePress('home')}>
      { //check which icon will load
      Home.getStaticBoolean() ? <Fontisto name="home" size={26} color={Primarycolor1} />  :  <MaterialCommunityIcons name="home-outline" size={30} color={Primarycolor1}/>
      }
      </Pressable>

      <Pressable onPress={() => handlePress('map')}>
      { //check which icon will load
      Map.getStaticBoolean() ? <Fontisto name="map-marker-alt" size={24} color={Primarycolor1} />   :  <Feather name="map-pin" size={24} color={Primarycolor1}/>
      }
      </Pressable>


      <Pressable onPress={() => handlePress('add')}>
      { //check which icon will load
      Add.getStaticBoolean() ? <AntDesign name="pluscircle" size={24} color={Primarycolor1}/>    : <AntDesign name="pluscircleo" size={24} color={Primarycolor1} />
      }
      </Pressable>


      <Pressable onPress={() => handlePress('stats')}>
      { //check which icon will load
      Stats.getStaticBoolean() ? <Ionicons name="stats-chart-sharp" size={22} color={Primarycolor1} /> : <Ionicons name="stats-chart-outline" size={24} color={Primarycolor1} />
      }
      </Pressable>

      <Pressable onPress={() => handlePress('profile')}>
      { //check which icon will load
      Profile.getStaticBoolean() ? <Ionicons name="person-circle-sharp" size={24} color={Primarycolor1}/> : <Ionicons name="person-circle-outline" size={24} color={Primarycolor1} /> 
      }
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
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor : Primarycolor2,
    borderWidth: 2,
  },
})



