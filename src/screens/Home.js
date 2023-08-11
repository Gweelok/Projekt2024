import { View, Text} from 'react-native';
import { styles , Backgroundstyle} from '../styles/Stylesheet';
import {BoxLink} from '../styles/BoxLink';
import Navigationbar from '../componets/Navigationbar';
import React from 'react';
import * as Location from "expo-location";

const Home = ({ navigation }) => {

  
    const startBackgroundTracking = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status == "granted") {
          await Location.requestBackgroundPermissionsAsync();
        }
      };

      const navigatetoinfo = () => {
              navigation.navigate('Infopage')
      }


return (
    <View style={Backgroundstyle.interactive_screens}> 
        <Text style={styles.Header_Primarycolor1}> Home page </Text>
        <BoxLink msg="Hvordann fungerer UPDROPP?" onPress={navigatetoinfo}/>
        <Navigationbar navigation={navigation}/>
    </View>
);
}

export default Home;