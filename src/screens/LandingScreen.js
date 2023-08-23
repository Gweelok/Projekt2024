import { View, Text , StyleSheet ,Pressable } from 'react-native';
import { styles,
    Backgroundstyle,
    Primarycolor1,
    Buttons,
} from '../styles/Stylesheet';
import { Octicons } from '@expo/vector-icons'; 
import React  from 'react';
import { useLanguage, t } from '../Languages/LanguageHandler';
import ReuseSvg from '../componets/svg-components/ReuseSvg';








const LandingScreen = ({ navigation }) => {
  // for multi language
    const { currentLanguage, setLanguage } = useLanguage();

  //Fn to navigate to the Signup Screen
  const SignUp = () => {
          navigation.navigate('SignUp')
  }; 


//Fn to change to langauge and display correct language 
const LanguageSelector = () => {
    if (currentLanguage=='en')
    {
        setLanguage('da')
    }
    else 
    {
        setLanguage('en')
    }

}; 



return (
    <View style={Backgroundstyle.informationScreens}> 
        <View style={{marginLeft : "auto", width:'25%'}}>
            <Pressable onPress={LanguageSelector} style={[Buttons.secondary_button,{padding:5}]}>
                <Text style={Buttons.secondary_buttonText}>{t('LandingScreen.LanguageSelector', currentLanguage)}</Text>
            </Pressable> 
        </View>
       
        <Text style={[styles.Header_Primarycolor1,styles.Header]}>{t('LandingScreen.Header', currentLanguage)}</Text> 
        <ReuseSvg style={{marginBottom:30,alignItems:"center"}}/>
        
        <Text style={styling.Intro}>{t('LandingScreen.Intro', currentLanguage)}</Text>

        <Text style={styling.Intro}>
             <Text>{t('LandingScreen.Littlemsg', currentLanguage)}</Text>
            <Text style={{color:"#07A0A2"}}> {t('LandingScreen.Termsandcond', currentLanguage)} </Text> 
         </Text>     

     <Pressable onPress={SignUp} style={Buttons.main_button}>
        <Text style={Buttons.main_buttonText}>{t('LandingScreen.continue', currentLanguage)}</Text>
    </Pressable> 

    <View style={styling.tabBarStyle}>
    <Octicons name="dot-fill" size={24} color={Primarycolor1} />
    <Octicons name="dot" size={24} color={Primarycolor1} />
    <Octicons name="dot" size={24} color={Primarycolor1} />
    </View>
        
    </View>
    
    );
}


export default LandingScreen;
//     <Image source={require('./my-icon.png')} />
const styling=StyleSheet.create({
    Intro: {
        color:Primarycolor1,
         fontFamily: 'space-grotesk' ,
          marginLeft:"auto" ,
          marginRight:"auto",
          width:"90%",
          marginBottom:15,
    },
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        elevation: 0,
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : "center",
        marginLeft : "auto",
        marginRight :"auto",
      },
})