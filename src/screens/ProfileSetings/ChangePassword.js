import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Modal,
    SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import { t, useLanguage } from '../../Languages/LanguageHandler';
import { Backgroundstyle, Buttons, HeaderText, Primarycolor1, styles, styles as stylesGlobal } from '../../styles/Stylesheet';
import Navigationbar from "../../componets/Navigationbar";
import { Keyboard } from 'react-native';
import { firebaseAurth } from "../../utils/Firebase";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword, signOut } from "firebase/auth";
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from "../../componets/BackButton";
import GlobalStyle from "../../styles/GlobalStyle";
import { extractMarginValues } from "react-native-ui-lib/src/commons/modifiers";
import LoadingScreen from '../../componets/LoadingScreen';
import { LoaderContext } from '../../componets/LoaderContext';
import { Ionicons } from '@expo/vector-icons';
import ErrorBanner from '../ErrorBanner';
import { SecureStorage } from '../../utils/SecureStorage';
import { updateUserData } from '../../utils/Repo';


const ChangePassword = ({ navigation }) => {
    const { currentLanguage } = useLanguage();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [iscurrentPasswordValid, setiscurrentPasswordValid] = useState(true);
    const [isnewPasswordValid, setisnewPasswordValid] = useState(true);
    const [isconfirmPasswordValid, setisconfirmPasswordValid] = useState(true);

    const [canSave, setcanSave] = useState(false)
    const [isInit, setisInit] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
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
        setErrorMessage("")

        const oldPassword = await SecureStorage.getPassword()

        if (currentPassword != oldPassword) {
            setErrorMessage("Current Password is Incorrect")
            setiscurrentPasswordValid(false)
            setIsLoading(false)
        } else if (currentPassword == newPassword) {
            setErrorMessage("New Password cannot be the same as current Password")
            setisnewPasswordValid(false)
            setisconfirmPasswordValid(false)
            setIsLoading(false)
        } else {
            updateUserData({ password:newPassword }).then(() => {
                console.log("done");
            }).catch((error) => {
                setErrorMessage(error.message)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }

    const reloadPage = () => {

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
        if (currentPassword.trim() == "" || currentPassword.trim().length < 8) {
            setiscurrentPasswordValid(false)
            return false
        } else {
            setiscurrentPasswordValid(true)
        }

        if (newPassword.trim().length < 8) {
            setisnewPasswordValid(false)
            return false
        } else {
            setisnewPasswordValid(true)
        }


        if (confirmPassword.trim() != newPassword.trim()) {
            setisconfirmPasswordValid(false)
            return false
        } else {
            setisconfirmPasswordValid(true)
        }


        return true
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
                {errorMessage && <ErrorBanner message={errorMessage} />}

                {/* Current password */}
                <Text style={[stylesGlobal.formLabel, { marginLeft: 0 }]}>
                    {t('ChangePasswordScreen.CurrentPassword', currentLanguage)}
                </Text>
                <View style={[styles.inputBox, !iscurrentPasswordValid && stylesGlobal.errorInputBox]}>
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.input, customStyles.inputText]}
                            secureTextEntry={!showPassword["currentPassword"]}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            placeholder="Current password"
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
                {/* New password */}
                <Text style={[stylesGlobal.formLabel, { marginLeft: 0 }]}>
                    {t('ChangePasswordScreen.NewPassword', currentLanguage)}
                </Text>
                <View style={[styles.inputBox, !isnewPasswordValid && stylesGlobal.errorInputBox]}>
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.input, customStyles.inputText]}
                            secureTextEntry={!showPassword["newPassword"]}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="New password"
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
                {/* Confirm password */}
                <Text style={[stylesGlobal.formLabel, { marginLeft: 0 }]}>
                    {t('ChangePasswordScreen.ConfirmPassword', currentLanguage)}
                </Text>
                <View style={[styles.inputBox, { flexdirection: 'row' }, !isconfirmPasswordValid && stylesGlobal.errorInputBox]}>
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.input, customStyles.inputText]}
                            secureTextEntry={!showPassword["confirmPassword"]}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Confirm password"
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
