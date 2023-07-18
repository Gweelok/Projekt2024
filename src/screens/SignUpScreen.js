import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput , Pressable } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  let Header='Opret bruger';
  return (
    
    <View>
      <Text style={SignUpStyles.headerText}>{Header}</Text>
       <TextInput
        value={email}
        onChangeText={onChangeEmail}
        placeholder={'E-mail'}
        keyboardType={'email-address'}
        clearButtonMode={"always"}  
        style={SignUpStyles.inputBox}
      />
      <TextInput
        style={SignUpStyles.inputBox}
        value={password}
        onChangeText={onChangePassword}
        placeholder={'Kodeord'}
        keyboardType={'default'}
        secureTextEntry={true}
      />
      <Pressable onPress={() => navigation.navigate('Home')} style={SignUpStyles.container_Primary}>
            <Text style={SignUpStyles.buttonText}>{Header}</Text>
        </Pressable>
        
         <Pressable onPress={() => navigation.navigate('Home')} style={SignUpStyles.buttonfb}>
          <View style={SignUpStyles.container}>
            <Text style={SignUpStyles.buttonText}> Continue with FaceBook</Text>
          </View>
        </Pressable>

         <Pressable onPress={() => navigation.navigate('Home')}  style={SignUpStyles.buttongoogle}>
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