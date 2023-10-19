import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Pressable,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {t, useLanguage} from "../../Languages/LanguageHandler";
import Icon from "react-native-vector-icons/AntDesign";
import {Backgroundstyle, Buttons, HeaderText, styles, styles as stylesGlobal, Primarycolor1} from "../../styles/Stylesheet";
import {GoBackButton} from "../../styles/GoBackButton";
import MenuItems from "../../styles/MenuItems";
import CustomInput from "../../componets/atoms/CustomInput";
import ListLanguages from "./ListOfLanguages";
import LanguageDropdown from "../../Languages/LanguageDropdown";
// Import your icon components and language dropdown component
import ScrollViewComponent from "../../componets/atoms/ScrollViewComponent";
import LanguageDropdownSettings from "../../Languages/LanguageDropdownSettings";

const AccountSettings = () => {
    const navigation = useNavigation();
    const { currentLanguage } = useLanguage();
    const [name, setName] = useState(''); // Fetch the initial value from the database
    const [email, setEmail] = useState(''); // Fetch the initial value from the database
    const [phone, setPhone] = useState(''); // Fetch the initial value from the database

    const handlePress = () => {
        navigation.goBack();
    };
    const handleSave = () => {
        // Handle save action to update the database with the new values
        Alert.alert(t('AccountSettingsScreen.HandleSave',currentLanguage));
    };

    /* complete this task her */
    const handleDeleteAccount =()=>{
        navigation.navigate('DeleteAccount');
    };
   /* complete this task her */
    const handleChangePasswordPress =()=>{
        navigation.navigate('ChangePassword');
    };

    return (
        <ScrollViewComponent>
<SafeAreaView  style={Backgroundstyle.interactive_screens}>
        <View>
            <View style={styles1.header}>

                {/* Back Button */}
                <TouchableOpacity onPress={handlePress}>
                    <GoBackButton  />
                </TouchableOpacity>
                {/* Headline */}
                <Text style={[HeaderText.Header,{marginLeft: 7,marginRight: 20}]}>{t('AccountSettingsScreen.Header',currentLanguage)} </Text>
            </View>


            {/* Section 1 */}
            <View style={styles1.section}>
                {/* Name */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[stylesGlobal.formLabel,{marginRight: 5}]}>
                    {t("AccountSettingsScreen.Name",currentLanguage)} 
                </Text>
                <Text style={stylesGlobal.optionalText}>
                     ({t("AccountSettingsScreen.Optional", currentLanguage)})
                </Text>
                </View>
                <CustomInput>
                    <TextInput
                        placeholder="Jane Doe"
                        placeholderTextColor="#8EA59E"
                        value={name}
                        onChangeText={setName}
                        keyboardType="name"
                        autoCapitalize="none"
                        clearButtonMode={"always"}
                        style={styles.inputBox}
                    />
                </CustomInput>
                {/* email */}
                <Text style={stylesGlobal.formLabel}>{t('AccountSettingsScreen.Email',currentLanguage)}</Text>
                <CustomInput showStar={false}>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="janedoe@example.com"
                        placeholderTextColor="#8EA59E"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        clearButtonMode={"always"}
                        style={styles.inputBox}
                    />
                </CustomInput>

                {/* phone */}
                <View style={{ flexDirection: "row", alignItems: "center"}}>
                <Text style={[stylesGlobal.formLabel,{marginRight: 5}]}>
                    {t("AccountSettingsScreen.Name",currentLanguage)} 
                </Text>
                <Text style={stylesGlobal.optionalText}>
                     ({t("AccountSettingsScreen.Optional", currentLanguage)})
                </Text>
                </View>
                <CustomInput>
                    <TextInput
                        placeholder="00 00 00 00"
                        placeholderTextColor="#8EA59E"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone"
                        autoCapitalize="none"
                        clearButtonMode={"always"}
                        style={styles.inputBox}
                    />
                </CustomInput>


                {/* Submit */}
                <TouchableOpacity onPress={handleSave} style={[Buttons.main_button, {marginTop: 10}]}>
                    <Text style={Buttons.main_buttonText}>{t('AccountSettingsScreen.Submit',currentLanguage)}</Text>
                </TouchableOpacity>
            </View>



            {/* Section 2 */}
            {/* ChangeCode */}
            <View style={[styles1.section]}>
//                 <Text style={stylesGlobal.formLabel}>{t('AccountSettingsScreen.Language',currentLanguage)} </Text>
//                 <ListLanguages />
                <MenuItems  msg={t('AccountSettingsScreen.ChangeCode',currentLanguage)} onPress= {handleChangePasswordPress}/>
            </View>




            {/* Section 3 */}
            {/* Language */}

            <View style={{flex:10}}>
                <View  style={{alignItems:"center",flex:1, zIndex:1}}>
                    <Text style={[styles.menuItem_text,{marginLeft: 35,marginBottom:1,}]}>{t('AccountSettingsScreen.Language',currentLanguage)} </Text>
                    <LanguageDropdown/>
                </View>

              <View>
                <Pressable onPress={handleDeleteAccount}  >
                    <View style={styles1.iconContainer}>
                        <Icon name="delete" size={25} style={[styles1.iconStyle]} />
                        <Text style={styles1.deleteText}>{t('AccountSettingsScreen.Delete', currentLanguage)}</Text>
                    </View>
                </Pressable>
                </View>
                </View>
            </View>
</SafeAreaView>
        </ScrollViewComponent>
    );
};

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        margin:10,
    },
    header:{
        flexDirection:"row",
        justifyContent: "flex-end",
        marginTop:-35,
        marginBottom:15
    },
    section: {
        borderBottomWidth: 1, 
        borderBottomColor: "#000", 
        paddingBottom: 17, 
        marginBottom: 8,
    },

    iconContainer: {
        flexDirection: 'row',
        alignItems: "center",
        marginLeft:'auto',
        marginRight:'auto',

    },
    deleteText:{
        marginTop: 20,
        color : "#ff0000",
        textAlign: 'center',
        fontSize: 20,
        zIndex:-999,
    },
    iconStyle:{
        marginTop: 20,
        color : "#ff0000",
        marginRight:10,
        zIndex:-999,
    },
});

export default AccountSettings;
