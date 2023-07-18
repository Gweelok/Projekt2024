import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput , Pressable , Alert} from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [emailCheck,setEmailCheck]=useState(true); //to check if email is correct
  const [isValid, setIsValid] = useState(false); // to check on both email and password
  const [passwordCheck, setPasswordCheck] = useState('true'); // to check on password

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
          navigation.navigate('Home')
    } else {
          Alert.alert('Invalid Email or Password');
    }
  };
  let Header='Opret bruger';
  return (
    
    <View style={SignUpStyles.signupstyle}>
      <Text style={SignUpStyles.headerText}>{Header}</Text>
       <TextInput
         placeholder="E-mail"
        value={email}
        onChangeText={onChangeEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        clearButtonMode={"always"}  
        style={SignUpStyles.inputBox}
      />
      <TextInput
        style={SignUpStyles.inputBox}
        value={password}
        onChangeText={CheckPassword}
        placeholder={'Kodeord'}
        keyboardType={'default'}
        secureTextEntry={true}
      />
      { //Check on the password
      passwordCheck ? null : <Text style={SignUpStyles.text_Tertiary}> Min 8 Tegn </Text>
      }
      <Pressable onPress={handleSubmit} style={SignUpStyles.container_Primary}>
            <Text style={SignUpStyles.buttonText}>{Header}</Text>
        </Pressable>
        
         <Pressable onPress={handleSubmit} style={SignUpStyles.buttonfb}>
          <View style={SignUpStyles.container}>
            <Text style={SignUpStyles.buttonText}> Continue with FaceBook</Text>
          </View>
        </Pressable>

         <Pressable onPress={handleSubmit}  style={SignUpStyles.buttongoogle}>
          <View style={SignUpStyles.container}>
            <Text style={SignUpStyles.buttonText}> Continue with Google</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => {}}>
            <Text style={SignUpStyles.text_Tertiary}> Har du allerede en burger?</Text>
        </Pressable>
    </View>
  );
}
const SignUpStyles = StyleSheet.create({
    signupstyle:{
        aliginItems : 'center',
        flex: 1,
        backgroundColor: '#E2F4DE',
      },

buttonfb: {
    backgroundColor: '#4765A9',
    fontSize: 22,
    padding: 10,
    width :'70%',
    marginVertical: 20,
    margin: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttongoogle: {
    backgroundColor: '#F41616',
    fontSize: 22,
    padding: 10,
    width :'50%',
    marginVertical: 20,
    margin: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    padding: 70,
    fontSize: 30,
    color: '#0F5202',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    width :'90%',
    margin: 12,
    borderWidth: 4,
    padding: 10,
    fontSize: 16,
    borderColor: '#0F5202',
    backgroundColor: 'white',
    alignSelf: 'stretch'
  },
  container_Primary: {
    fontSize: 22,
    padding: 10,
    height: 45,
    width :'90%',
    marginVertical: 20,
    margin: 12,
    backgroundColor: '#0F5202',
    borderColor: '#0F5202',
    borderWidth: 2,
  },
  text_Tertiary: {
    margin:2, 
    color : "#07A0A2",
    textAlign: 'center',
    fontSize: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
   container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
});

export default SignUpScreen;