import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import { t, useLanguage } from '../../Languages/LanguageHandler';
import { Buttons, HeaderText, Primarycolor1, styles, styles as stylesGlobal } from '../../styles/Stylesheet';
import Navigationbar from "../../componets/Navigationbar";
import { Keyboard } from 'react-native';
import { firebaseAurth } from "../../utils/Firebase";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword, signOut } from "firebase/auth";
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from "../../componets/BackButton";
import GlobalStyle from "../../styles/GlobalStyle";
import {extractMarginValues} from "react-native-ui-lib/src/commons/modifiers";


const ChangePassword = ({ navigation }) => {
    const { currentLanguage } = useLanguage();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handlePress = async () => {
        setErrorMessage('');
        const user = firebaseAurth.currentUser;
        Keyboard.dismiss();    
        try {
            if (currentPassword === newPassword) {
                setErrorMessage(t('ChangePasswordScreen.PasswordMatchError', currentLanguage));
            } else if (newPassword !== confirmPassword) {
                setErrorMessage(t('ChangePasswordScreen.PasswordMismatchError', currentLanguage));
            } else if (newPassword.length < 8) {
                setErrorMessage(t('ChangePasswordScreen.PasswordLengthError', currentLanguage));
            } else {
                // Reauthenticate the user with their current password
                const authCredential = EmailAuthProvider.credential(user.email, currentPassword);
                await reauthenticateWithCredential(user, authCredential);

                try {
                    // Change the user's password
                    await updatePassword(user, newPassword);
                    setShowSuccessPopup(true);

                    return;
                } catch (passwordUpdateError) {
                    console.error('Password Update Error:', passwordUpdateError.message);
                    setErrorMessage(t('ChangePasswordScreen.PasswordUpdateError', currentLanguage));
                }
            }

        } catch (reauthenticationError) {
            console.error('Reauthentication Error:', reauthenticationError.message);
            setErrorMessage(t('ChangePasswordScreen.CurrentPasswordError', currentLanguage));
        }
    };



    const togglePasswordVisibility = (field) => {
        switch (field) {
            case 'currentPassword':
                setShowCurrentPassword(!showCurrentPassword);
                break;
            case 'newPassword':
                setShowNewPassword(!showNewPassword);
                break;
            case 'confirmPassword':
                setShowConfirmPassword(!showConfirmPassword);
                break;
            default:
                break;
        }
    };

    const reloadPage = async () => {

        await signOut(firebaseAurth);
        setShowSuccessPopup(false);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Sign in' }],
        });
        const amILoggedIn = firebaseAurth.currentUser; //FOR SEEING IF LOG OUT INDEED HAPPENED, DELETE AFTER REVIEW/TESTING
        console.log("Am I Logged In: " + amILoggedIn); // ^ same here
    };
    const navigateToAccountSettings = () => {
        navigation.navigate("AccountSettings");
    };
    return (


        <View style={GlobalStyle.BodyWrapper}>

            <View style={customStyles.headerContainer}>
                <BackButton onPress={navigateToAccountSettings}  />
                <Text style={[HeaderText.Header,{marginLeft:0 ,marginRight: 0,}]}>
                    {t('ChangePasswordScreen.Header', currentLanguage)}
                </Text>
            </View>
            {/* Current password */}


            <Text style={[stylesGlobal.formLabel, {marginLeft:0}]}>
                {t('ChangePasswordScreen.CurrentPassword', currentLanguage)}
            </Text>
                <View style={styles.inputBox}>
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.input, customStyles.inputText]}
                            secureTextEntry={!showCurrentPassword}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            placeholder="Current password"
                            placeholderTextColor="#8EA59E"
                        />
                        <TouchableOpacity
                            style={customStyles.eyeIcon}
                            onPress={() => togglePasswordVisibility('currentPassword')}
                        >
                            <Icon size={18} name={showCurrentPassword ? 'ios-eye-off' : 'ios-eye'} />
                        </TouchableOpacity>
                    </View>
                </View>
               {/* New password */}
                <Text style={[stylesGlobal.formLabel, {marginLeft:0}]}>
                    {t('ChangePasswordScreen.NewPassword', currentLanguage)}
                </Text>
                <View style={styles.inputBox}>
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.input, customStyles.inputText]}
                            secureTextEntry={!showNewPassword}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="New password"
                            placeholderTextColor="#8EA59E"
                        />
                        <TouchableOpacity
                            style={customStyles.eyeIcon}
                            onPress={() => togglePasswordVisibility('newPassword')}
                        >
                            <Icon size={18} name={showNewPassword ? 'ios-eye-off' : 'ios-eye'} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Confirm password */}
                <Text style={[stylesGlobal.formLabel,{marginLeft:0}]}>
                    {t('ChangePasswordScreen.ConfirmPassword', currentLanguage)}
                </Text>
                <View style={[styles.inputBox,{flexdirection:'row'}]}>
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.input, customStyles.inputText]}
                            secureTextEntry={!showConfirmPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            keyboardType={'default'}
                            placeholder="Confirm password"
                            placeholderTextColor="#8EA59E"                        
                            />
                        <TouchableOpacity
                            style={customStyles.eyeIcon}
                            onPress={() => togglePasswordVisibility('confirmPassword')}
                        >
                            <Icon size={18} name={showConfirmPassword ? 'ios-eye-off' : 'ios-eye'} />
                        </TouchableOpacity>
                    </View>
                </View>

            <TouchableOpacity
                style={[Buttons.main_button,{position: 'relativ'} ]}onPress={handlePress}>
                <View>
                <Text style={Buttons.main_buttonText}>
                    {t('ChangePasswordScreen.SavePassword', currentLanguage)}
                </Text>
            </View>
            </TouchableOpacity>

            {errorMessage !== '' && (
                <View style={customStyles.errorContainer}>
                    <Text style={customStyles.errorText}>{errorMessage}</Text>
                </View>
            )}



            <Modal
                transparent
                visible={showSuccessPopup}
                animationType="fade"
                onRequestClose={reloadPage}
            >
                <View style={customStyles.successContainer}>
                    <Text style={[customStyles.successText,{marginLeft:0}]}>
                        {t('ChangePasswordScreen.PasswordChanged', currentLanguage)}
                    </Text>
                    <TouchableOpacity style={customStyles.okButton} onPress={reloadPage}>
                        <Text style={customStyles.okButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>


            </Modal>
            <Navigationbar navigation={navigation} />
        </View>


    );
};

ChangePassword.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const customStyles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 0,
        marginBottom: 20,
        marginTop: 30,
    },
    

    inputText: {
        fontSize: 15,
        color: 'black',
        textAlignVertical: 'center',
        flex:1,
        fontFamily:'space-grotesk'

    },
    errorContainer: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    errorText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    successContainer: {
        backgroundColor: 'green', // Set the background color to green
        paddingVertical: 8,
        paddingHorizontal: 16,
        position: 'absolute', // Set position to absolute
        bottom: 0, // Place it at the bottom of the screen
        width: '100%', // Make it full width
        flexDirection: 'row', // Align text and button in a row
        justifyContent: 'space-between', // Space text and button evenly
        alignItems: 'center', // Center align text and button vertically
        borderRadius: 5,
    },

    successText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    okButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Slightly transparent background
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    okButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ChangePassword;