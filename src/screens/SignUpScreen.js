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
import GlobalStyle from "../styles/GlobalStyle";

const SignUpScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('true'); // to check on password
  const [showPassword, setShowPassword] = useState(false);

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


  //Check on both 
  const handleSubmit = () => {
    const isValidEmail = validateEmail(email);
    if (isValidEmail && passwordCheck) {
          navigation.navigate('Homepage')
    } else {
          Alert.alert('Invalid Email or Password');
    }
  };
  //check if pass should be shown
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  let Header='Opret bruger';
  return (
    <View style={Backgroundstyle.informationScreens}>
        <View style={GlobalStyle.BodyWrapper}>
        <Text style={[styles.Header_Primarycolor1,styles.Header]}>{Header}</Text>
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
        placeholder={'Kodeord'}
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
      passwordCheck ? null : <Text style={SignUpStyles.text_Tertiary}> min. otte tegn </Text>
      }
      <Pressable onPress={handleSubmit} style={Buttons.main_button}>
            <Text style={Buttons.main_buttonText}>{Header}</Text>
        </Pressable>
        
         <Pressable onPress={handleSubmit} style={Buttons.buttonfb}>
          <View>
            <Text style={Buttons.SocialMediabuttonText}> Continue with Facebook</Text>
          </View>
        </Pressable>
      
         <Pressable onPress={handleSubmit}  style={Buttons.buttongoogle}>
          <View>
            <Text style={Buttons.SocialMediabuttonText}> Continue with Google</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => {}}>
            <Text style={SignUpStyles.text_Tertiary}> Har du allerede en bruger</Text>
        </Pressable>
    </View>
    </View>

  );
}
const SignUpStyles = StyleSheet.create({
    
 
  text_Tertiary: {
    marginBottom: 10, 
    color : "#07A0A2",
    textAlign: 'center',
    fontSize: 15,
  },
  
  //  container: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  
});

export default SignUpScreen;
