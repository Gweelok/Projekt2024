import React from "react";
import { StyleSheet,Text,View } from "react-native";
import { useLanguage, t } from '../../Languages/LanguageHandler';
import ReuseSvg from '../../componets/svg-components/ReuseSvg';
import { styles,
  Backgroundstyle,
  Primarycolor1,
  Buttons,
} from '../../styles/Stylesheet';
import GlobalStyle from "../../styles/GlobalStyle";
const Welcome = () =>{
  const { currentLanguage } = useLanguage();

  return <View style={{flex:1}}>
      <Text style={[styles.Header_Primarycolor1,styles.Header]}>{t('LandingScreen.Header', currentLanguage)}</Text>
      <View style={GlobalStyle.BodyWrapper}>
      <ReuseSvg style={{marginBottom:30}}/>
  
  <Text style={styling.Intro}>{t('LandingScreen.Intro', currentLanguage)}</Text>

  <Text style={styling.Intro}>
       <Text>{t('LandingScreen.Littlemsg', currentLanguage)}</Text>
      <Text style={{color:"#07A0A2"}}> {t('LandingScreen.Termsandcond', currentLanguage)}</Text>
   </Text>
  </View>
</View>
}
const styling=StyleSheet.create({
  Intro: {
      color:Primarycolor1,
       fontFamily: 'space-grotesk' ,
        marginBottom:15,
  },
})
export default Welcome;