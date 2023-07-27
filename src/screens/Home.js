import { View, Text} from 'react-native';
import { styles , Backgroundstyle} from '../styles/Stylesheet';
import Navigationbar from '../componets/Navigationbar';
import React from 'react';


const Home = ({ navigation }) => {
return (
    <View style={Backgroundstyle.interactive_screens}> 
        <Text style={styles.Header_Primarycolor1}> Home page </Text>
        <Navigationbar navigation={navigation}/>
    </View>
);
}

export default Home;