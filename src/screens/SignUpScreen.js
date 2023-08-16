import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput , Pressable , Alert } from 'react-native';
import { styles,
   Backgroundstyle,
   Primarycolor2,
   Buttons,
   Primarycolor1,
  }
   from '../styles/Stylesheet';
   import { Ionicons } from '@expo/vector-icons'; // or any other icon library you prefer
   import { useLanguage, t } from '../Languages/LanguageHandler'; // Import 'useLanguage' and 't'
   import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
   import {firebaseAurth} from '../utils/Firebase';


const SignUpScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('true'); // to check on password
  const [showPassword, setShowPassword] = useState(false);
  const { currentLanguage } = useLanguage();
  const auth = firebaseAurth; // reuse from firebase.js

  //To check on password
  const CheckPassword = (text) => {
    onChangePassword(text);
    setPasswordCheck(text.length >= 8); // it must be at least 8 chars
  };
  // To check on email
  const validateEmail = (text) => {
    //  to check if the input contains "@" and "."
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

//Firebase signin function
  const signIn = async () => {
    try {
      const response = await  signInWithEmailAndPassword(auth ,email, password);
      console.log(response);
      navigation.navigate('Homepage')
    } catch (error) {
      console.log(error);
      alert('Sign in failed' + error.message);
    } finally {
      console.log('finally');
    }
  };
  //Firebase signup function
  const signUp = async () => {
    try {
      const response = await  createUserWithEmailAndPassword(auth ,email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('Sign up failed' + error.message);
    } finally {
      console.log('finally');
    }
  };

  //Check on both
  const handleSubmit = () => {
    const isValidEmail = validateEmail(email);
    if (isValidEmail && passwordCheck) {
      signUp();
      navigation.navigate('TermsAndConditions') // Navigates to Terms and Conditions page
    } else {
      Alert.alert('Invalid Email or Password');
    }
  };
  //check if pass should be shown
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };


  return (

    <View style={Backgroundstyle.informationScreens}>
      <Text style={[styles.Header_Primarycolor1,styles.Header]}>{t('SignUpScreen.Signup', currentLanguage)}</Text>

       <TextInput
         placeholder="E-mail"
        value={email}
        onChangeText={onChangeEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        clearButtonMode={"always"}
        style={styles.inputBox}
      />

      <View style={[styles.inputBox , {flexDirection:"row"}]}>
      <TextInput
        value={password}
        onChangeText={CheckPassword}
        placeholder={t('SignUpScreen.password', currentLanguage)}
        keyboardType={'default'}
        secureTextEntry={!showPassword}
        style={{flex:1 , fontSize: 16, fontFamily: 'space-grotesk',}}
      />

      <Ionicons
        name={showPassword ? 'ios-eye-off' : 'ios-eye'}
        size={18}
        color={Primarycolor1}
        style={styles.Icon_container}
        onPress={togglePasswordVisibility}
      />
      </View>

      { //Check on the password

      passwordCheck ? null : <Text style={SignUpStyles.text_Tertiary}> {t('SignUpScreen.passwordmsg', currentLanguage)} </Text>
      }
      <Pressable onPress={handleSubmit} style={Buttons.main_button}>
            <Text style={Buttons.main_buttonText}>{t('SignUpScreen.Signup', currentLanguage)}</Text>

        </Pressable>

         <Pressable onPress={handleSubmit} style={Buttons.buttonfb}>
          <View style={SignUpStyles.container}>
            <Text style={Buttons.SocialMediabuttonText}> Continue with Facebook</Text>
          </View>
        </Pressable>

         <Pressable onPress={handleSubmit}  style={Buttons.buttongoogle}>
          <View style={SignUpStyles.container}>
            <Text style={Buttons.SocialMediabuttonText}> Continue with Google</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => {
                navigation.navigate('Sign in')
        }}>
            <Text style={SignUpStyles.text_Tertiary}> {t('SignUpScreen.LogInLink', currentLanguage)}</Text>
        </Pressable>
    </View>

  );
}
const SignUpStyles = StyleSheet.create({


  text_Tertiary: {
    marginBottom: 10,
    color : "#07A0A2",
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'space-grotesk',

  },

   container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

});

export default SignUpScreen;
