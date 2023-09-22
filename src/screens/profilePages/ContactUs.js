import React, { useReducer } from "react";
import { View, Text,TextInput, TouchableOpacity } from "react-native";
import { t,useLanguage } from "../../Languages/LanguageHandler";
import * as Linking from "expo-linking"
function reducer(state,action){
  switch (action.type){
    case "change_name":
      return {...state,name:action.payload}
      case "change_email":
      return {...state,email:action.payload}
      case "change_message":
      return {...state,message:action.payload}
  }
}

const ContactUs = () => {
  const { currentLanguage } = useLanguage();
  const [formInfo,dispatch] = useReducer(reducer,{name:"",email:"",message:""})
  function sendToEmail(){
    const url = `mailto:info@updropp.dk?subject=Requesting Contact&body=${formInfo.message}`
    Linking.canOpenURL(url).then(succes=>{
      if(succes){
        Linking.openURL(url)
      }else{
        console.log("Error,can't open email")
      }
    })
  }
  return (
    <View>
      <Text>{t("ContactUs.Name",currentLanguage)}</Text>
      <TextInput placeholder={`${t("ContactUs.Name",currentLanguage)}`} value={formInfo.name} onChangeText={e=>dispatch({type:"change_name",payload:e})}/>
      <Text>{t("ContactUs.Email",currentLanguage)}</Text>
      <TextInput placeholder={`${t("ContactUs.Email",currentLanguage)}`} value={formInfo.email} onChangeText={e=>dispatch({type:"change_email",payload:e})}/>
      <Text>{t("ContactUs.Message",currentLanguage)}</Text>
      <TextInput placeholder={`${t("ContactUs.Message",currentLanguage)}`} value={formInfo.message} onChangeText={e=>dispatch({type:"change_message",payload:e})}/>
      <TouchableOpacity onPress={sendToEmail}>
        <Text>{t("ContactUs.SendMessage",currentLanguage)}</Text>
      </TouchableOpacity>

      
    </View>
  );
};

export default ContactUs;
