import { View, Text , StyleSheet ,Pressable,BackHandler,Alert,TouchableOpacity, SafeAreaView } from 'react-native';
import { styles,
    Backgroundstyle,
    Primarycolor1,
    Buttons,Primarycolor2,Primarycolor3,main_button,
} from '../styles/Stylesheet';
import { Ionicons ,Octicons } from '@expo/vector-icons'; 
import React, { useState,useEffect }  from 'react';
import { useLanguage, t } from '../Languages/LanguageHandler';

import { firebaseAurth } from '../utils/Firebase';

import Welcome from '../componets/LandingScreen/Welcome';
import Problem from '../componets/LandingScreen/Problem';
import Solution from '../componets/LandingScreen/Solution';
import Customize from '../componets/LandingScreen/Customize';
import ReuseSvg from '../componets/svg-components/ReuseSvg';
import PlantSvg from '../componets/svg-components/PlantSvg';
import CompletePlantSvg from '../componets/svg-components/CompletePlantSvg';
import HousePhoneTextSvg from '../componets/svg-components/HousePhoneTextSvg';
import CompleteHousePhoneTextSvg from '../componets/svg-components/CompleteHousePhoneTextSvg';




const LandingScreen = ({ navigation }) => {
  // for multi language
    const { currentLanguage, setLanguage } = useLanguage();
    const [currentSlide,setCurrentSlide] = useState(0);
    const components = [<Welcome />,<Problem/>,<Solution/>];
    const backButton = currentSlide === 0 ? null : (    
    <TouchableOpacity onPress={()=>setCurrentSlide(currentSlide-1)} style={styling.backButton}>
    <Octicons name="chevron-left" size={20} style={{color:"white"}}/>
    </TouchableOpacity>);
   
   const data = [{
    top: t('LandingScreen.Header', currentLanguage),
    image: <ReuseSvg/>,
    bottom: t('LandingScreen.Intro', currentLanguage),
    
  },
  {
    top: t('ProblemComponent.Header', currentLanguage),
    image: <CompletePlantSvg/>,
    bottom: t('ProblemComponent.Body', currentLanguage),
    
  },
  {
    top: t('SolutionComponent.Header', currentLanguage),
    image: <CompleteHousePhoneTextSvg/>,
    bottom: t('SolutionComponent.Body', currentLanguage),
    
  }
]

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
    <SafeAreaView style={Backgroundstyle.informationScreens}> 
        <View style={styling.topBar}>
        { backButton }
        <Pressable onPress={LanguageSelector} style={styling.languageSelector}>
                <Text style={Buttons.secondary_buttonText}>{t('LandingScreen.LanguageSelector', currentLanguage)}</Text>
        </Pressable> 
        </View>
 {/* add components in ```components``` in order to show them */}
       {/* <View style={{flex:1,paddingBottom:30}}>{components[currentSlide]}</View> */}
       <View style={{flex:1,paddingHorizontal:20,paddingVertical:30}}>{<Customize {...data[currentSlide]}/>}</View>
       
     <Pressable onPress={nextSlideAndSignUp} style={Buttons.main_button}>
        <Text style={Buttons.main_buttonText}>{t('LandingScreen.continue', currentLanguage)}</Text>
    </Pressable> 

    <View style={styling.tabBarStyle}>
    {components.map((element,index)=><Octicons key={index} name={`dot${index===currentSlide?"-fill":""}`} size={24} color={Primarycolor1} />)}
    </View>
        
    </SafeAreaView>
    
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
        marginTop:30
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