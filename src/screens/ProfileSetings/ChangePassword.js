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
import { Backgroundstyle, Buttons, HeaderText, Primarycolor1, styles, styles as stylesGlobal } from '../../styles/Stylesheet';
import Navigationbar from "../../componets/Navigationbar";
import BackButton from "../../componets/BackButton";
import GlobalStyle from "../../styles/GlobalStyle";
import LoadingScreen from '../../componets/LoadingScreen';
import { LoaderContext } from '../../componets/LoaderContext';
import { Ionicons } from '@expo/vector-icons';
import ErrorBanner from '../ErrorBanner';
import { updateUserData } from '../../utils/Repo';
import { firebaseAurth } from '../../utils/Firebase';


const ChangePassword = ({ navigation }) => {
    const { currentLanguage } = useLanguage();
    const { isLoading, setIsLoading } = useContext(LoaderContext)

    //Password fields
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    //Error states
    const [bannerErrorMessage, setbannerErrorMessage] = useState("")
    const [errorIn, setErrorIn] = useState('')

    //Password field visibility
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword:false
    })

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    }

    //Update password function
    const handlePress = async () => {
        setIsLoading(true);

        try {
            //Check fields
            const errorMessage = await checkFields();
            if (errorMessage) {
                throw new Error(errorMessage);
            }
            //Get current user
            const user = firebaseAurth.currentUser;

            if (!user) {
                throw new Error('User not authenticated');
            }

            //Updates password
            await updateUserData({ password: newPassword });
            Alert.alert("Success", t('ChangePasswordScreen.PasswordChanged', currentLanguage));
            handleBackPress();
        } catch (error) {
            if (error instanceof FirebaseError) {
                setbannerErrorMessage(t('ChangePasswordScreen.PasswordUpdateError', currentLanguage));
            } else {
                console.error('Error changing password:', error.message);
                Alert.alert('Error', 'Failed to change password. Please try again.');
            }
        } finally {
            //Clear the states and navigate to settings
            handleBackPress();
            setIsLoading(false);
        }
    };

    const handleBackPress = () => {
        // reset values when navigating back (component won't be unmounted)
        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
        navigation.navigate("AccountSettings")
    }

    //Checking input fields
    const checkFields = async () => {
        let error = null;
        let errorMessage = null;

        switch (true) {
            case !formData.currentPassword || formData.currentPassword.trim().length < 8:
                setErrorIn('current');
                errorMessage = t('ChangePasswordScreen.PasswordLengthError', currentLanguage);
                break;
            case !formData.newPassword || formData.newPassword.trim().length < 8:
                setErrorIn('new');
                errorMessage = t('ChangePasswordScreen.PasswordLengthError', currentLanguage);
                break;
            case formData.newPassword === formData.currentPassword:
                setErrorIn('new');
                errorMessage = t('ChangePasswordScreen.PasswordMismatchError', currentLanguage);
                break;
            case formData.confirmPassword !== formData.newPassword:
                setErrorIn('confirm');
                errorMessage = t('ChangePasswordScreen.PasswordMatchError', currentLanguage);
                break;
            default:
                break;
        }

        if (errorMessage) {
            setbannerErrorMessage(errorMessage);
            error = errorMessage;
        }

        return error; // Return null if fields are valid, otherwise return the error message
    };


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

                    <View style={[styles.inputBox, errorIn === 'current' && stylesGlobal.errorInputBox]}>
                        <View style={styles.container}>
                            <TextInput
                                style={[styles.input, customStyles.inputText]}
                                secureTextEntry={!showPassword["currentPassword"]}
                                value={currentPassword}
                                onChangeText={(text) => setFormData({...formData, currentPassword: text})}
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

                    {errorIn === 'current' && (
                        <Text style={styles.errorText}>
                            {bannerErrorMessage}
                        </Text>
                    )}
                </View>

                <View>
                    {/* New password */}
                    <Text style={[stylesGlobal.formLabel, { marginLeft: 0 }]}>
                        {t('ChangePasswordScreen.NewPassword', currentLanguage)}
                    </Text>

                    <View style={[styles.inputBox, errorIn === 'new' && stylesGlobal.errorInputBox]}>
                        <View style={styles.container}>
                            <TextInput
                                style={[styles.input, customStyles.inputText]}
                                secureTextEntry={!showPassword["newPassword"]}
                                value={newPassword}
                                onChangeText={(text) => setFormData({...formData, newPassword: text})}
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

                    {errorIn === 'new' && (
                        <Text style={styles.errorText}>
                            {bannerErrorMessage}
                        </Text>
                    )}

                </View>

                <View>
                    {/* Confirm password */}
                    <Text style={[stylesGlobal.formLabel, { marginLeft: 0 }]}>
                        {t('ChangePasswordScreen.ConfirmPassword', currentLanguage)}
                    </Text>
                    <View style={[styles.inputBox, { flexdirection: 'row' }, errorIn === 'confirm' && stylesGlobal.errorInputBox]}>
                        <View style={styles.container}>
                            <TextInput
                                style={[styles.input, customStyles.inputText]}
                                secureTextEntry={!showPassword["confirmPassword"]}
                                value={confirmPassword}
                                onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
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

                    {errorIn === 'confirm' && (
                        <Text style={styles.errorText}>
                            {bannerErrorMessage}
                        </Text>
                    )}
                </View>

                <TouchableOpacity
                    disabled={false}
                    style={[Buttons.main_button, false && Buttons.disabled_button]} onPress={handlePress}>
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
