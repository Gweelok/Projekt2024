import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Pressable,
    SafeAreaView
} from 'react-native';
import { t, useLanguage } from "../../Languages/LanguageHandler";
import Icon from "react-native-vector-icons/AntDesign";
import { Backgroundstyle, Buttons, styles, styles as stylesGlobal, Primarycolor1 } from "../../styles/Stylesheet";
import MenuItems from "../../styles/MenuItems";
import CustomInput from "../../componets/atoms/CustomInput";
import LanguageDropdown from "../../Languages/LanguageDropdown";
// Import your icon components and language dropdown component
import ScrollViewComponent from "../../componets/atoms/ScrollViewComponent";
import GlobalStyle from "../../styles/GlobalStyle";
import BackButton from "../../componets/BackButton";
import Navigationbar from "../../componets/Navigationbar";
import { getCurrentUser, updateUserData } from '../../utils/Repo';
import ErrorBanner from '../ErrorBanner';
import { LoaderContext } from '../../componets/LoaderContext';
import LoadingScreen from '../../componets/LoadingScreen';
import { Divider } from 'react-native-elements';


const AccountSettings = ({ navigation }) => {

    const { currentLanguage } = useLanguage();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bannerErrorMessage, setbannerErrorMessage] = useState("")
    const [canSave, setcanSave] = useState(false)

    const { isLoading, setIsLoading } = useContext(LoaderContext)
    // using local Loading state instead of LoaderContext state to prevent re-execution of validate fields useEffect which relies on isLoading state
    const [isInit, setisInit] = useState(false)

    const [emailErrorMessage, setemailErrorMessage] = useState("")
    const [nameErrorMessage, setnameErrorMessage] = useState("")
    const [phoneErrorMessage, setphoneErrorMessage] = useState("")

    const handleBackPress = () => {
        navigation.navigate("MySettings");
    }


    const checkFields = () => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        const nameRegex = /^[A-Za-z\s]+$/
        const phoneRegex = /^\d+$/

        let isValid = true



        if (email.trim() == "" || !emailPattern.test(email.trim())) {
            setemailErrorMessage(t("AccountSettingsScreen.InvalidEmail", currentLanguage))
            isValid = false
        } else {
            setemailErrorMessage()
        }

        if (name && (name.trim().length < 4 || !nameRegex.test(name.trim()))) {
            setnameErrorMessage(t("AccountSettingsScreen.InvalidName", currentLanguage))
            isValid = false
        } else {
            setnameErrorMessage()
        }

        if (phone && (phone.trim().length < 8 || !phoneRegex.test(phone))) {
            setphoneErrorMessage(t("AccountSettingsScreen.InvalidPhone", currentLanguage))
            isValid = false
        } else {
            setphoneErrorMessage()
        }



        return isValid
    }


    // validate fields on changes
    useEffect(() => {
        if (isInit) {
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
            setisInit(true)
        }).catch(() => {
            navigation.navigate("MySettings")
        })
    }, [])



    const handleSave = async () => {
        // disable save button and clear error message
        setIsLoading(true)
        setcanSave(false)
        setbannerErrorMessage("")

        // update auth + realtime user data
        updateUserData({ name: name, email: email, phone: phone }).then(() => {
            Alert.alert("Success", t('AccountSettingsScreen.Saved', currentLanguage));
        }).catch((error) => {
            if (error.code == "auth/email-already-in-use") {
                setemailErrorMessage(t('AccountSettingsScreen.EmailExist', currentLanguage))
                setbannerErrorMessage(t('AccountSettingsScreen.EmailExist', currentLanguage))
            } else {
                setbannerErrorMessage(t('AccountSettingsScreen.Error', currentLanguage))
            }
        }).finally(() => {
            setIsLoading(false)
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
        <View style={Backgroundstyle.interactive_screens}>
            <LoadingScreen isLoaderShow={isLoading} />

            <SafeAreaView style={GlobalStyle.BodyWrapper}>
                <View style={styles.HeaderFull}>
                    <BackButton onPress={handleBackPress}></BackButton>
                    <Text style={styles.HeaderText}>{t('AccountSettingsScreen.Header', currentLanguage)} </Text>
                </View>
                {bannerErrorMessage && <ErrorBanner message={bannerErrorMessage} />}

                <ScrollViewComponent>
                    {/* Section 1 */}
                    <View>

                        <View>
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
                                    maxLength={30}
                                    style={[styles.inputBox, nameErrorMessage && stylesGlobal.errorInputBox]}
                                />
                            </CustomInput>
                            {nameErrorMessage && (
                                <Text style={styles.errorText}>{nameErrorMessage}</Text>
                            )}
                        </View>


                        <View>
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
                                    maxLength={30}
                                    style={[styles.inputBox, emailErrorMessage && stylesGlobal.errorInputBox]}
                                />
                            </CustomInput>
                            {emailErrorMessage && (
                                <Text style={styles.errorText}>{emailErrorMessage}</Text>
                            )}
                        </View>

                        <View>
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
                                    maxLength={20}
                                    style={[styles.inputBox, phoneErrorMessage && stylesGlobal.errorInputBox]}
                                />
                            </CustomInput>
                            {phoneErrorMessage && (
                                <Text style={styles.errorText}>{phoneErrorMessage}</Text>
                            )}
                        </View>

                        {/* Submit */}
                        <TouchableOpacity disabled={!canSave} onPress={handleSave} style={[Buttons.main_button, { marginTop: 10 }, !canSave && Buttons.disabled_button]}>
                            <Text style={Buttons.main_buttonText}>{t('AccountSettingsScreen.Submit', currentLanguage)}</Text>
                        </TouchableOpacity>
                    </View>



                    {/* Section 2 */}
                    {/* ChangeCode */}
                    <Divider style={styles.divider}></Divider>
                    <View>
                        <MenuItems style={{ marginBottom: 0 }} msg={t('AccountSettingsScreen.ChangeCode', currentLanguage)} onPress={handleChangePasswordPress} />
                    </View>




                    {/* Section 3 */}
                    {/* Language */}
                    <Divider style={styles.divider}></Divider>
                    <View>
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
                </ScrollViewComponent>
            </SafeAreaView >
            <Navigationbar navigation={navigation} />
        </View >
    );
};

const styles1 = StyleSheet.create({
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