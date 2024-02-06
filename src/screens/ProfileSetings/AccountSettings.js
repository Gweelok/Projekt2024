import React, { useEffect, useState } from 'react';
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
import { t, useLanguage } from "../../Languages/LanguageHandler";
import Icon from "react-native-vector-icons/AntDesign";
import { Backgroundstyle, Buttons, HeaderText, styles, styles as stylesGlobal, Primarycolor1 } from "../../styles/Stylesheet";
import { GoBackButton } from "../../styles/GoBackButton";
import MenuItems from "../../styles/MenuItems";
import CustomInput from "../../componets/atoms/CustomInput";
import ListLanguages from "./ListOfLanguages";
import LanguageDropdown from "../../Languages/LanguageDropdown";
// Import your icon components and language dropdown component
import ScrollViewComponent from "../../componets/atoms/ScrollViewComponent";
import LanguageDropdownSettings from "../../Languages/LanguageDropdownSettings";
import GlobalStyle from "../../styles/GlobalStyle";
import BackButton from "../../componets/BackButton";
import Navigationbar from "../../componets/Navigationbar";
import { getCurrentUser, updateUserData } from '../../utils/Repo';
import ErrorBanner from '../ErrorBanner';
import { firebaseAurth } from '../../utils/Firebase';


const AccountSettings = ({ navigation }) => {

    const { currentLanguage } = useLanguage();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [canSave, setcanSave] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [isEmailValid, setisEmailValid] = useState(true)
    const [isNameValid, setisNameValid] = useState(true)
    const [isPhoneValid, setisPhoneValid] = useState(true)


    const handleBackPress = () => {
        navigation.navigate("MySettings");
    }


    const checkFields = () => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/


        if (!emailPattern.test(email)) {
            setisEmailValid(false)
            return false
        } else {
            setisEmailValid(true)
        }

        if (name && name.length < 4) {
            setisNameValid(false)
            return false
        } else {
            setisNameValid(true)
        }

        if (phone && phone.length < 8) {
            setisPhoneValid(false)
            return false
        } else {
            setisPhoneValid(true)
        }

        return true
    }


    // validate fields on changes
    useEffect(() => {
        if (!isLoading) {
            setcanSave(checkFields())
        }
    }, [name, email, phone])

    // get realtime user data once component is mounted
    useEffect(() => {
        getCurrentUser().then((user) => {
            setName(user.name)
            setEmail(user.email)
            setPhone(user.phone)
            setIsLoading(false)
        }).catch(() => {
            navigation.navigate("MySettings")
        })
    }, [])




    const handleSave = async () => {
        // disable save button and clear error message
        setcanSave(false)
        setErrorMessage("")

        // update auth + realtime user data
        updateUserData(name, email, phone).then(() => {
            Alert.alert("Success", t('AccountSettingsScreen.HandleSave.Saved', currentLanguage));
        }).catch((error) => {
            if (error.code=="auth/email-already-in-use") {
                setisEmailValid(false)
                setErrorMessage(t('AccountSettingsScreen.HandleSave.EmailExist', currentLanguage))
            }else{
                setErrorMessage(error.message)
            }
        })

    };

    /* complete this task her */
    const handleDeleteAccount = () => {
        navigation.navigate('DeleteAccount');
    };
    /* complete this task her */
    const handleChangePasswordPress = () => {
        navigation.navigate('ChangePassword');
    };



    return (
        <View>
            <ScrollViewComponent >
                <View style={Backgroundstyle.interactive_screens}>
                    {errorMessage && <ErrorBanner message={errorMessage} />}

                    <SafeAreaView style={GlobalStyle.BodyWrapper}>
                        <View style={[styles1.header]}>
                            {/* Back Button */}
                            <BackButton onPress={handleBackPress}></BackButton>

                            {/* Headline */}
                            <Text style={[HeaderText.Header, { marginTop: 1, marginLeft: "auto", marginRight: "auto", }]}>{t('AccountSettingsScreen.Header', currentLanguage)} </Text>
                        </View>


                        {/* Section 1 */}
                        <View style={styles1.section}>
                            {/* Name */}
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                                <Text style={[stylesGlobal.formLabel, { marginLeft: 0, marginRight: 5 }]}>
                                    {t("AccountSettingsScreen.Name", currentLanguage)}
                                </Text>
                                <Text style={[stylesGlobal.optionalText, { marginBottom: 5 }]}>
                                    ({t("AccountSettingsScreen.Optional", currentLanguage)})
                                </Text>
                            </View>
                            <CustomInput>
                                <TextInput
                                    placeholder="Jane Doe"
                                    placeholderTextColor="#8EA59E"
                                    value={name}
                                    onChangeText={setName}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    clearButtonMode={"always"}
                                    style={[styles.inputBox, !isNameValid && stylesGlobal.errorInputBox]}
                                />
                            </CustomInput>
                            {/* email */}
                            <Text style={[stylesGlobal.formLabel, { marginLeft: 0 }]}>{t('AccountSettingsScreen.Email', currentLanguage)}</Text>
                            <CustomInput showStar={false}>
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="janedoe@example.com"
                                    placeholderTextColor="#8EA59E"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    clearButtonMode={"always"}
                                    style={[styles.inputBox, !isEmailValid && stylesGlobal.errorInputBox]}
                                />
                            </CustomInput>

                            {/* phone */}
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={[stylesGlobal.formLabel, { marginLeft: 0, marginRight: 5 }]}>
                                    {t("AccountSettingsScreen.Tlf", currentLanguage)}
                                </Text>
                                <Text style={[stylesGlobal.optionalText, { marginLeft: 0, marginBottom: 5 }]}>
                                    ({t("AccountSettingsScreen.Optional", currentLanguage)})
                                </Text>
                            </View>
                            <CustomInput>
                                <TextInput
                                    placeholder="00 00 00 00"
                                    placeholderTextColor="#8EA59E"
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                    autoCapitalize="none"
                                    clearButtonMode={"always"}
                                    style={[styles.inputBox, !isPhoneValid && stylesGlobal.errorInputBox]}
                                />
                            </CustomInput>


                            {/* Submit */}
                            <TouchableOpacity disabled={!canSave} onPress={handleSave} style={[Buttons.main_button, { marginTop: 10 }, !canSave && Buttons.disabled_button]}>
                                <Text style={Buttons.main_buttonText}>{t('AccountSettingsScreen.Submit', currentLanguage)}</Text>
                            </TouchableOpacity>
                        </View>



                        {/* Section 2 */}
                        {/* ChangeCode */}
                        <View style={[styles1.section, { marginTop: 18 }]}>
                            <MenuItems msg={t('AccountSettingsScreen.ChangeCode', currentLanguage)} onPress={handleChangePasswordPress} />
                        </View>




                        {/* Section 3 */}
                        {/* Language */}

                        <View style={{ flex: 10, marginTop: 10 }}>
                            <View style={{ alignItems: "center", flex: 1, zIndex: 1 }}>
                                <Text style={[styles.menuItem_text, { marginLeft: 0, marginBottom: 10, }]}>{t('AccountSettingsScreen.Language', currentLanguage)} </Text>
                                <LanguageDropdown />
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Pressable onPress={handleDeleteAccount}  >
                                    <View style={[styles1.iconContainer]}>
                                        <Icon name="delete" size={16} style={[styles1.iconStyle]} />
                                        <Text style={styles1.deleteText}>{t('AccountSettingsScreen.Delete', currentLanguage)}</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
            </ScrollViewComponent>
            <Navigationbar navigation={navigation} />
        </View>
    );
};

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        margin: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
        margin: -5,
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
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 35,
        zIndex: -999,
        borderBottomWidth: 1,
        borderBottomColor: "#ff0000",
    },
    deleteText: {
        color: "#ff0000",
        textAlign: "center",
        fontFamily: "space-grotesk",
        marginLeft: 3,

    },
    iconStyle: {
        color: "#ff0000",
        marginBottom: 1,

    },
});

export default AccountSettings;
