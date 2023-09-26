import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    StyleSheet,
    Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import { t, useLanguage } from '../../Languages/LanguageHandler';
import { Buttons, HeaderText, Primarycolor1, styles } from '../../styles/Stylesheet';
import Icon from 'react-native-vector-icons/AntDesign';
import Navigationbar from "../../componets/Navigationbar";

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

    const handlePress = () => {
        setErrorMessage('');

        if (currentPassword === newPassword) {
            setErrorMessage(t('ChangePasswordScreen.PasswordMatchError', currentLanguage));
        } else if (newPassword !== confirmPassword) {
            setErrorMessage(t('ChangePasswordScreen.PasswordMismatchError', currentLanguage));
        } else if (newPassword.length < 8) {
            setErrorMessage(t('ChangePasswordScreen.PasswordLengthError', currentLanguage));
        } else if (!/[A-Z]/.test(newPassword)) {
            setErrorMessage(t('ChangePasswordScreen.UppercaseError', currentLanguage));
        } else if (!/[a-z]/.test(newPassword)) {
            setErrorMessage(t('ChangePasswordScreen.LowercaseError', currentLanguage));
        } else if (!/\d/.test(newPassword)) {
            setErrorMessage(t('ChangePasswordScreen.NumberError', currentLanguage));
        } else if (!/[!@#$%^&*]/.test(newPassword)) {
            setErrorMessage(t('ChangePasswordScreen.SpecialCharacterError', currentLanguage));
        } else {
            setShowSuccessPopup(true);
            return;
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

    const reloadPage = () => {
        setShowSuccessPopup(false);
        navigation.reset({
            index: 0,
            routes: [{ name: 'ChangePassword' }],
        });
    };

    return (

        <SafeAreaView style={styles.container2}>
            <View style={customStyles.headerContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate("MySettings")}>
                    <Icon size={30} name="left" style={styles.closeButtonIcon} />
                </TouchableOpacity>
                <Text style={customStyles.headline}>
                    {t('ChangePasswordScreen.Header', currentLanguage)}
                </Text>
            </View>

            <View style={styles.form}>
                <Text style={HeaderText.Header}>
                    {t('ChangePasswordScreen.CurrentPassword', currentLanguage)}
                </Text>
                <View style={styles.inputBox}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, customStyles.inputText]}
                            secureTextEntry={!showCurrentPassword}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            paddingRight={40}
                            textAlignVertical="center"
                            fontFamily="Arial"
                        />
                        <TouchableOpacity
                            style={customStyles.eyeIcon}
                            onPress={() => togglePasswordVisibility('currentPassword')}
                        >
                            <Icon size={20} name={showCurrentPassword ? 'eye' : 'eyeo'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={HeaderText.Header}>
                    {t('ChangePasswordScreen.NewPassword', currentLanguage)}
                </Text>
                <View style={styles.inputBox}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, customStyles.inputText]}
                            secureTextEntry={!showNewPassword}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            paddingRight={40}
                            textAlignVertical="center"
                            fontFamily="Arial"
                        />
                        <TouchableOpacity
                            style={customStyles.eyeIcon}
                            onPress={() => togglePasswordVisibility('newPassword')}
                        >
                            <Icon size={20} name={showNewPassword ? 'eye' : 'eyeo'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={HeaderText.Header}>
                    {t('ChangePasswordScreen.ConfirmPassword', currentLanguage)}
                </Text>
                <View style={styles.inputBox}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, customStyles.inputText]}
                            secureTextEntry={!showConfirmPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            paddingRight={40}
                            textAlignVertical="center"
                            fontFamily="Arial"
                        />
                        <TouchableOpacity
                            style={customStyles.eyeIcon}
                            onPress={() => togglePasswordVisibility('confirmPassword')}
                        >
                            <Icon size={20} name={showConfirmPassword ? 'eye' : 'eyeo'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={Buttons.main_button} onPress={handlePress}>
                <Text style={Buttons.main_buttonText}>
                    {t('ChangePasswordScreen.SavePassword', currentLanguage)}
                </Text>
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
                onRequestClose={() => setShowSuccessPopup(false)}
            >
                <View style={customStyles.successContainer}>
                    <Text style={customStyles.successText}>
                        {t('ChangePasswordScreen.PasswordChanged', currentLanguage)}
                    </Text>
                    <TouchableOpacity style={customStyles.okButton} onPress={reloadPage}>
                        <Text style={customStyles.okButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>

    );
};

ChangePassword.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const customStyles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        marginBottom: 20,
    },
    headline: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20,
        fontFamily: 'space-grotesk-bold',
        color: Primarycolor1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -10 }],
    },
    inputText: {
        fontSize: 17,
        color: 'black',
        textAlignVertical: 'center',
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
