import { View, Text , StyleSheet ,Pressable,BackHandler,Alert } from 'react-native';
import { styles,
    Backgroundstyle,
    Primarycolor1,
    Buttons,Primarycolor2,Primarycolor3
} from '../styles/Stylesheet';
import { Octicons } from '@expo/vector-icons'; 
import React, { useState,useEffect }  from 'react';
import { useLanguage, t } from '../Languages/LanguageHandler';
import Welcome from '../componets/LandingScreen/Welcome';
import Problem from '../componets/LandingScreen/Problem';








const LandingScreen = ({ navigation }) => {
  // for multi language
    const { currentLanguage, setLanguage } = useLanguage();
    const [currentSlide,setCurrentSlide] = useState(0);
    const components = [<Welcome />,<Problem/>];
    const backButton = currentSlide === 0 ? null : (    
    <Pressable onPress={()=>setCurrentSlide(currentSlide-1)} >
    <Octicons name="arrow-left" size={30} color={"grey"}/>
    </Pressable>);

  function nextSlideAndSignUp(){
    if(currentSlide+2>components.length){
        
        navigation.navigate('SignUp');
        
    }else{
        setCurrentSlide(previousState=>previousState+1)
    }
  }

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
        <View style={styling.topBar}>
        { backButton }
        <Pressable onPress={LanguageSelector} style={styling.languageSelector}>
                <Text style={Buttons.secondary_buttonText}>{t('LandingScreen.LanguageSelector', currentLanguage)}</Text>
        </Pressable> 
        </View>
       <View style={{flex:1}}>{components[currentSlide]}</View>
       
     <Pressable onPress={nextSlideAndSignUp} style={[Buttons.main_button,{borderColor:"red",
        borderWidth:2}]}>
        <Text style={Buttons.main_buttonText}>{t('LandingScreen.continue', currentLanguage)}</Text>
    </Pressable> 

    <View style={styling.tabBarStyle}>
    {components.map((element,index)=><Octicons key={index} name={`dot${index===currentSlide?"-fill":""}`} size={24} color={Primarycolor1} />)}
    </View>
        
    </View>
    
    );
}


export default LandingScreen;
//     <Image source={require('./my-icon.png')} />
const styling=StyleSheet.create({
    tabBarStyle: {
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
      languageSelector:{
        backgroundColor: Primarycolor3,
        borderColor: Primarycolor1,
        borderWidth: 4,
        padding:7,
        width:'25%',
        marginLeft:"auto"
      },
      topBar:{
        
        flexDirection:"row",
        borderColor:"red",
        borderWidth:1,
        alignItems:"center"
    }

})