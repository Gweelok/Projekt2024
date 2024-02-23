import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    SafeAreaView,
    Alert,
} from 'react-native';
import { t, useLanguage } from '../../Languages/LanguageHandler';
import { Backgroundstyle, Buttons, Primarycolor1, styles, styles as stylesGlobal } from '../../styles/Stylesheet';
import Navigationbar from "../../componets/Navigationbar";
import BackButton from "../../componets/BackButton";
import GlobalStyle from "../../styles/GlobalStyle";
import LoadingScreen from '../../componets/LoadingScreen';
import { LoaderContext } from '../../componets/LoaderContext';
import { Ionicons } from '@expo/vector-icons';
import ErrorBanner from '../ErrorBanner';
import { updateUserPassword } from '../../utils/Repo';

const ChangePassword = ({ navigation }) => {
    const { currentLanguage } = useLanguage();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [currentPasswordErrorMessage, setcurrentPasswordErrorMessage] = useState("");
    const [newPasswordErrorMessage, setnewPasswordErrorMessage] = useState("");
    const [confirmPasswordErrorMessage, setconfirmPasswordErrorMessage] = useState("");

    const [canSave, setcanSave] = useState(false)
    const [isInit, setisInit] = useState(false)
    const [bannerErrorMessage, setbannerErrorMessage] = useState("")
    const { isLoading, setIsLoading } = useContext(LoaderContext)

    const [showPassword, setShowPassword] = useState({
        "currentPassword": false,
        "newPassword": false,
        "confirmPassword": false
    })





    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    }


    const handlePress = async () => {
        setIsLoading(true)
        setcanSave(false)
        setbannerErrorMessage("")


        if (currentPassword == newPassword) {
            setbannerErrorMessage(t('ChangePasswordScreen.PasswordMatchError', currentLanguage))
            setnewPasswordErrorMessage(t('ChangePasswordScreen.PasswordMatchError', currentLanguage))
            setIsLoading(false)
        } else {
            updateUserPassword({ newPassword: newPassword, currentPassword: currentPassword }).then(() => {
                Alert.alert("Success", t('ChangePasswordScreen.PasswordChanged', currentLanguage))
                handleBackPress()
            }).catch((error) => {
                console.log(error.code)
                if (error.code === 'auth/wrong-password') {
                    setbannerErrorMessage(t('ChangePasswordScreen.CurrentPasswordMatchError', currentLanguage))
                    setcurrentPasswordErrorMessage(t('ChangePasswordScreen.CurrentPasswordMatchError', currentLanguage))
                    setIsLoading(false)
                } else {
                    setbannerErrorMessage(t('ChangePasswordScreen.PasswordUpdateError', currentLanguage))
                }
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }

    const handleBackPress = () => {
        // reset values when navigating back (component won't be unmounted)
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setisInit(false)
        navigation.navigate("AccountSettings")
    }


    const checkFields = () => {
        let isValid = true

        if (currentPassword) {
            if (currentPassword.trim() == "" || currentPassword.trim().length < 8) {
                setcurrentPasswordErrorMessage(t('ChangePasswordScreen.PasswordLengthError', currentLanguage))
                isValid = false
            } else {
                setcurrentPasswordErrorMessage()
            }
        } else {
            isValid = false
        }


        if (newPassword) {
            if (newPassword.trim().length < 8) {
                setnewPasswordErrorMessage(t('ChangePasswordScreen.PasswordLengthError', currentLanguage))
                isValid = false
            } else {
                setnewPasswordErrorMessage()
            }
        } else {
            isValid = false
        }


        if (confirmPassword) {
            if (confirmPassword.trim() != newPassword.trim()) {
                setconfirmPasswordErrorMessage(t('ChangePasswordScreen.PasswordMismatchError', currentLanguage))
                isValid = false
            } else {
                setconfirmPasswordErrorMessage()
            }
        } else {
            isValid = false
        }


        return isValid
    }


    // validate fields once initialized
    useEffect(() => {
        if (isInit) {
            setcanSave(checkFields())
        } else {
            setisInit(true)
        }
    }, [currentPassword, newPassword, confirmPassword])



    return (
        <View style={Backgroundstyle.interactive_screens}>
            <LoadingScreen isLoaderShow={isLoading} />
            <SafeAreaView style={GlobalStyle.BodyWrapper}>
                <View style={styles.HeaderFull}>
                    <BackButton onPress={handleBackPress}></BackButton>
                    <Text style={styles.HeaderText}>{t('AccountSettingsScreen.ChangeCode', currentLanguage)} </Text>
                </View>
                {bannerErrorMessage && <ErrorBanner message={bannerErrorMessage} />}


                <View>
                    {/* Current password */}
                    <Text style={[stylesGlobal.formLabel, { marginLeft: 0 }]}>
                        {t('ChangePasswordScreen.CurrentPassword', currentLanguage)}
                    </Text>
                    <View style={[styles.inputBox, currentPasswordErrorMessage && stylesGlobal.errorInputBox]}>
                        <View style={styles.container}>
                            <TextInput
                                style={[styles.input, customStyles.inputText]}
                                secureTextEntry={!showPassword["currentPassword"]}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                placeholder={t('ChangePasswordScreen.CurrentPassword', currentLanguage)}
                                placeholderTextColor="#8EA59E"
                                keyboardType="default"
                                autoCapitalize="none"
                                maxLength={30}
                            />

                            <Ionicons
                                name={showPassword["currentPassword"] ? 'ios-eye-off' : 'ios-eye'}
                                size={18}
                                color={Primarycolor1}
                                style={styles.Icon_container}
                                onPress={() => { togglePasswordVisibility("currentPassword") }}
                            />
                        </View>
                    </View>
                    {currentPasswordErrorMessage && (
                        <Text style={styles.errorText}>{currentPasswordErrorMessage}</Text>
                    )}
                </View>



                <View>
                    {/* New password */}
                    <Text style={[stylesGlobal.formLabel, { marginLeft: 0 }]}>
                        {t('ChangePasswordScreen.NewPassword', currentLanguage)}
                    </Text>
                    <View style={[styles.inputBox, newPasswordErrorMessage && stylesGlobal.errorInputBox]}>
                        <View style={styles.container}>
                            <TextInput
                                style={[styles.input, customStyles.inputText]}
                                secureTextEntry={!showPassword["newPassword"]}
                                value={newPassword}
                                onChangeText={setNewPassword}
                                placeholder={t('ChangePasswordScreen.NewPassword', currentLanguage)}
                                placeholderTextColor="#8EA59E"
                                keyboardType="default"
                                autoCapitalize="none"
                                maxLength={30}
                            />
                            <Ionicons
                                name={showPassword["newPassword"] ? 'ios-eye-off' : 'ios-eye'}
                                size={18}
                                color={Primarycolor1}
                                style={styles.Icon_container}
                                onPress={() => { togglePasswordVisibility("newPassword") }}
                            />
                        </View>
                    </View>
                    {newPasswordErrorMessage && (
                        <Text style={styles.errorText}>{newPasswordErrorMessage}</Text>
                    )}
                </View>



                <View>
                    {/* Confirm password */}
                    <Text style={[stylesGlobal.formLabel, { marginLeft: 0 }]}>
                        {t('ChangePasswordScreen.ConfirmPassword', currentLanguage)}
                    </Text>
                    <View style={[styles.inputBox, { flexdirection: 'row' }, confirmPasswordErrorMessage && stylesGlobal.errorInputBox]}>
                        <View style={styles.container}>
                            <TextInput
                                style={[styles.input, customStyles.inputText]}
                                secureTextEntry={!showPassword["confirmPassword"]}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder={t('ChangePasswordScreen.ConfirmPassword', currentLanguage)}
                                placeholderTextColor="#8EA59E"
                                keyboardType="default"
                                autoCapitalize="none"
                                maxLength={30}
                            />
                            <Ionicons
                                name={showPassword["confirmPassword"] ? 'ios-eye-off' : 'ios-eye'}
                                size={18}
                                color={Primarycolor1}
                                style={styles.Icon_container}
                                onPress={() => { togglePasswordVisibility("confirmPassword") }}
                            />
                        </View>
                    </View>
                    {confirmPasswordErrorMessage && (
                        <Text style={styles.errorText}>{confirmPasswordErrorMessage}</Text>
                    )}
                </View>



                <TouchableOpacity
                    disabled={!canSave}
                    style={[Buttons.main_button, !canSave && Buttons.disabled_button]} onPress={handlePress}>
                    <View>
                        <Text style={Buttons.main_buttonText}>
                            {t('ChangePasswordScreen.SavePassword', currentLanguage)}
                        </Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
            <Navigationbar navigation={navigation} />
        </View>
    );
};


const customStyles = StyleSheet.create({
    inputText: {
        fontSize: 15,
        color: 'black',
        textAlignVertical: 'center',
        flex: 1,
        fontFamily: 'space-grotesk'

    },
});

export default ChangePassword;
