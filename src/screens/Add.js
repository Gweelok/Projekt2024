import { View, Text , SafeAreaView ,Button } from 'react-native';
import { styles,Backgroundstyle} from '../styles/Stylesheet';
import Navigationbar from '../componets/Navigationbar';
import React from 'react';
import { ChooseCatagories} from "../componets/atoms/chooseCatagories";
import { useLanguage, t } from '../Languages/LanguageHandler';






const Add = ({ navigation }) => {
  const { currentLanguage, setLanguage } = useLanguage();


return (
    <View style={Backgroundstyle.interactive_screens}>
        <SafeAreaView style={{ flex: 1 }}>
        <ChooseCatagories navigation={navigation} />
      </SafeAreaView>
      <Text>Current Language: {currentLanguage}</Text>
        <Navigationbar navigation={navigation}/>
     
    </View>
);
}


export default Add;
