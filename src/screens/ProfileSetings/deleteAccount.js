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

    // eslint-disable-next-line react/react-in-jsx-scope




        <View style={GlobalStyle.BodyWrapper}>
            <Text style={[HeaderText.Header,{marginTop: 40}]}>{t('DeleteAccount.Header',currentLanguage)} </Text>
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
    container:
            {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'column',
        marginLeft:30,
        marginTop:70,
        justifyContent: 'center',
        width: '80%',
    },
    backButtonHomemade: {
        backgroundColor: "#1c4b3d",
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        marginLeft: 10,
    }
});
  export default DeleteAccount;