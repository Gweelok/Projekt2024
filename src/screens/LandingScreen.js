import { View, Text , StyleSheet ,Pressable,BackHandler,Alert,TouchableOpacity } from 'react-native';
import { styles,
    Backgroundstyle,
    Primarycolor1,
    Buttons,Primarycolor2,Primarycolor3,main_button,
} from '../styles/Stylesheet';
import { Ionicons ,Octicons } from '@expo/vector-icons'; 
import React, { useState,useEffect }  from 'react';
import { useLanguage, t } from '../Languages/LanguageHandler';
import GlobalStyle from "../styles/GlobalStyle";

import { firebaseAurth } from '../utils/Firebase';

import Welcome from '../componets/LandingScreen/Welcome';
import Problem from '../componets/LandingScreen/Problem';





const LandingScreen = ({ navigation }) => {
  // for multi language
    const { currentLanguage, setLanguage } = useLanguage();
    const [currentSlide,setCurrentSlide] = useState(0);
    const components = [<Welcome />,<Problem/>];
    const backButton = currentSlide === 0 ? null : (    
    <TouchableOpacity onPress={()=>setCurrentSlide(currentSlide-1)} style={styling.backButton}>
    <Octicons name="chevron-left" size={20} style={{color:"white"}}/>
    </TouchableOpacity>);
   

  function nextSlideAndSignUp(){
    if(currentSlide+2>components.length){
        
        navigation.navigate('SignUp');
        
    }else{
        setCurrentSlide(previousState=>previousState+1)
    }
  }


  //Fn to navigate to the Signup Screen
  const SignUp = () => {
    if (firebaseAurth.currentUser !== null) {
        console.log('User is logged in');
        navigation.navigate('Homepage');
    } else {
        navigation.navigate('SignUp')
    }
          
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
        <View style={GlobalStyle.BodyWrapper}>
        <View style={{marginLeft : "auto", width:'25%'}}>
            <Pressable onPress={LanguageSelector} style={[Buttons.secondary_button,{padding:5}]}>
                <Text style={Buttons.secondary_buttonText}>{t('LandingScreen.LanguageSelector', currentLanguage)}</Text>
        </Pressable> 
        </View>
        <Text style={[styles.Header_Primarycolor1,styles.Header, {textAlign:"center"}]}>
          {t("LandingScreen.Header", currentLanguage)}
        </Text>

        <Text style={styling.Intro}>
          {t("LandingScreen.Intro", currentLanguage)}
        </Text>

        <Text style={styling.Intro}>
             <Text>{t("LandingScreen.Littlemsg", currentLanguage)}</Text>
            <Text style={{color:"#07A0A2"}}>
              {t("LandingScreen.Termsandcond", currentLanguage)} 
            </Text> 
         </Text>     
//        <Pressable onPress={SignUp} style={Buttons.main_button}>
       <View style={{flex:1,padding:20}}>{components[currentSlide]}</View>
       <Pressable onPress={nextSlideAndSignUp} style={Buttons.main_button}>
        <Text style={Buttons.main_buttonText}>{t("LandingScreen.continue", currentLanguage)}</Text>
    </Pressable> 

    <View style={styling.tabBarStyle}>
    {components.map((element,index)=><Octicons key={index} name={`dot${index===currentSlide?"-fill":""}`} size={24} color={Primarycolor1} />)}
    </View>
        </View>
        </View>

    );
}


export default LandingScreen;
//     <Image source={require('./my-icon.png')} />
const styling=StyleSheet.create({
    Intro: {
        color: Primarycolor1,
        fontFamily: "space-grotesk",
        marginBottom: 15,
    },
    tabBarStyle: {
        bottom: 0,
        elevation: 0,
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent : "center",
        marginLeft : "auto",
        marginRight :"auto",
        marginTop: 30
      },
      languageSelector:{
        backgroundColor: Primarycolor3,
        borderColor: Primarycolor1,
        borderWidth: 4,
        padding:7,
        width:'25%',
        marginLeft:"auto"
      },
      topBar:{
        paddingLeft:15,
        flexDirection:"row",
        alignItems:"center"
    },
    backButton: {
        backgroundColor: "#1c4b3d",
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
      },

})