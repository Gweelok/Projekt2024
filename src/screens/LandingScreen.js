import { View, Text , StyleSheet ,Pressable,BackHandler,Alert } from 'react-native';
import { styles,
    Backgroundstyle,
    Primarycolor1,
    Buttons,
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
    const components = [<Welcome number={1}/>,<Welcome/>,<Welcome/>,<Welcome number={4}/>,<Problem/>];
  //Fn to navigate to the Signup Screen
//   const SignUp = () => {
          
//   }; 

  function nextSlideAndSignUp(){
    if(currentSlide+2>components.length){
        setCurrentSlide(0)
        navigation.navigate('SignUp');
        
    }else{
        setCurrentSlide(previousState=>previousState+1)
    }
  }
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
       
       {/* <Welcome/> */}
       {components[currentSlide]}
     <Pressable onPress={nextSlideAndSignUp} style={Buttons.main_button}>
        <Text style={Buttons.main_buttonText}>{t('LandingScreen.continue', currentLanguage)}</Text>
    </Pressable> 

    <View style={styling.tabBarStyle}>
    {/* <Octicons name="dot-fill" size={24} color={Primarycolor1} />
    <Octicons name="dot" size={24} color={Primarycolor1} />
    <Octicons name="dot" size={24} color={Primarycolor1} /> */}
    {components.map((element,index)=><Octicons key={index} name={`dot${index===currentSlide?"-fill":""}`} size={24} color={Primarycolor1} />)}
    </View>
        
    </View>
    
    );
}


export default LandingScreen;
//     <Image source={require('./my-icon.png')} />
const styling=StyleSheet.create({
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