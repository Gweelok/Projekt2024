import { Text, View, StyleSheet, TouchableOpacity} from "react-native";

import {Buttons, HeaderText} from "../../styles/Stylesheet";
import {t, useLanguage} from "../../Languages/LanguageHandler";
import React from "react";
import GlobalStyle from "../../styles/GlobalStyle";
import BackButton from "../../componets/BackButton";
import BackButtonHomemade from "../../componets/BackButton";

// eslint-disable-next-line react/prop-types
const  DeleteAccount=({navigation})=>{
    const {currentLanguage}=useLanguage();
    const deleteacount =()=>{
        // What should happen, when pressing this is defined under 'backend
    };
    const BackToAccountSettings =()=>{
        // eslint-disable-next-line react/prop-types
        navigation.navigate('AccountSettings');
    };

        return(

        <View style={GlobalStyle.BodyWrapper}>
            <Text style={[HeaderText.Header,{marginTop: 40, marginLeft: 0, marginRight: 0}]}>{t('DeleteAccount.Header',currentLanguage)} </Text>
            <View >
                <TouchableOpacity style={[Buttons.main_button,{marginTop: 50}]}
                    onPress={deleteacount}
                >
                    <Text  style={[Buttons.main_buttonText]}> {t('DeleteAccount.MainButton',currentLanguage)}</Text>
                </TouchableOpacity>
            </View>

                <TouchableOpacity style={[Buttons.secondary_button,{marginTop:30}]}
                   onPress={BackToAccountSettings}
                    >

                    <Text   style={[Buttons.secondary_buttonText]}>   {t('DeleteAccount.SecondaryButton',currentLanguage)}</Text>
                </TouchableOpacity>
            </View>

);

}
const styles1 = StyleSheet.create({

});
  export default DeleteAccount;