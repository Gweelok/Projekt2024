import { View, Text , SafeAreaView ,Button } from 'react-native';
import { styles,Backgroundstyle} from '../styles/Stylesheet';
import Navigationbar from '../componets/Navigationbar';
import React from 'react';
import { ChooseCatagories} from "../componets/atoms/chooseCatagories";
import { useLanguage, t } from '../Languages/LanguageHandler';
import GlobalStyle from "../styles/GlobalStyle";






const Add = ({ navigation }) => {
  const { currentLanguage, setLanguage } = useLanguage();


return (
    <View style={Backgroundstyle.interactive_screens}>
        <View style={GlobalStyle.BodyWrapper}>

        <View style={{ flex: 1, width: '100%'}}>
            <ChooseCatagories navigation={navigation} />
      </View>
      <Text>Current Language: {currentLanguage}</Text>
        </View>
        <Navigationbar navigation={navigation}/>
    </View>
);
}


export default Add;
