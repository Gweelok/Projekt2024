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
        // todo all the below data should get from server
        navigation.navigate('Infopage', {
            title: "Five Uptainers are set to open in Kobenhavn area this year",
            content: [
                "Have you alwavs wanted to blog but are without a clue when it comes to doing so? Thispiece will provide basic" +
                " blogging information that can really help distinguish your blog frorthe competition, There is no reason to be scared!" +
                " Thanks to today's expanding technologyblogging is getting   easier all the time, You can pick up some great advice " +
                "from this articlewhich will prepare you to start blogging with confidence and effectivenest.",
                "Start your mailing list right away. The sooner you begin, the more time you wrill have to growyour list." +
                "This list will help you increase your revenue as time goes on. It is a serious mistak.to delay starting" +
                " your mailing list.",
                "Stay on top of what your competition is up to and then ensure you're always the " +
                "leader of thepack They are your rivals so you must follow their blogs, as well Remember, yourcompetitors are probabhy looking",
                "Stay on top of what your competition is up to and then ensure you're always the " +
                "leader of thepack They are your rivals so you must follow their blogs, as well Remember, yourcompetitors are probabhy looking",
                "Stay on top of what your competition is up to and then ensure you're always the " +
                "leader of thepack They are your rivals so you must follow their blogs, as well Remember, yourcompetitors are probabhy looking"
            ]
        });
    };


    return (
    <View style={Backgroundstyle.interactive_screens}>
        <Text style={styles.Header_Primarycolor1}> Home page </Text>
        <BoxLink msg="Hvordann fungerer Updropp" onPress={navigatetoinfo}/>
        <Navigationbar navigation={navigation}/>
    </View>
);
}

export default Home;
