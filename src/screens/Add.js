import { View, Text , SafeAreaView } from 'react-native';
import { styles,Backgroundstyle} from '../styles/Stylesheet';
import Navigationbar from '../componets/Navigationbar';
import React from 'react';
import { ChooseCatagories} from "../componets/atoms/chooseCatagories";


const Add = ({ navigation }) => {
return (
    <View style={Backgroundstyle.interactive_screens}> 
        <SafeAreaView style={{ flex: 1 }}>
        <ChooseCatagories navigation={navigation} />
      </SafeAreaView>
        <Navigationbar navigation={navigation}/>
    </View>
);
}

export default Add;