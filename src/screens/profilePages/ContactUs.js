import React, { useReducer } from "react";
import { View, Text,TextInput, TouchableOpacity } from "react-native";
import { t,useLanguage } from "../../Languages/LanguageHandler";
import { Linking } from 'react-native'
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
function sendToEmail(){
  Linking.canOpenURL('mailto:mailto@deniseleeyohn.com?subject=abcdefg&body=body').then(succes=>{
    console.log(succes)
  })
}
const ContactUs = () => {
  const { currentLanguage } = useLanguage();
  const [formInfo,dispatch] = useReducer(reducer,{name:"",email:"",message:""})
  return (
    <View>
      <Text>{t("ContactUs.Name",currentLanguage)}</Text>
      <TextInput placeholder={`${t("ContactUs.Name",currentLanguage)}`} value={formInfo.name} onChangeText={e=>dispatch({type:"change_name",payload:e})}/>
      <Text>{t("ContactUs.Email",currentLanguage)}</Text>
      <TextInput placeholder={`${t("ContactUs.Email",currentLanguage)}`} value={formInfo.email} onChangeText={e=>dispatch({type:"change_name",payload:e})}/>
      <Text>{t("ContactUs.Message",currentLanguage)}</Text>
      <TextInput placeholder={`${t("ContactUs.Message",currentLanguage)}`} value={formInfo.message} onChangeText={e=>dispatch({type:"change_name",payload:e})}/>
      <TouchableOpacity onPress={sendToEmail}>
        <Text>{t("ContactUs.SendMessage",currentLanguage)}</Text>
      </TouchableOpacity>

      
    </View>
  );
};

export default ContactUs;
