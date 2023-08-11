import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Backgroundstyle, styles, Buttons } from '../styles/Stylesheet';

const TermsAndConditions = ({ navigation }) => {
  return (
    <View style={[Backgroundstyle.interactive_screens, { padding: 20 }]}>
      <Text style={[styles.Header, styles.Header_Primarycolor1, { fontSize: 25 }]}>
        Terms and Conditions 
      </Text>
      <View style={{ marginVertical: 20 }}>
        <Text style={styles.paragraph_text}>1. You agree not to misuse the services.</Text>
        <Text style={styles.paragraph_text}>2. All content is copyrighted and owned by us.</Text>
        <Text style={styles.paragraph_text}>3. Personal data shared will be protected.</Text>
      </View>
      <TouchableOpacity 
        style={[Buttons.main_button, { marginBottom: 10 }]}
        onPress={() => navigation.navigate('ProfileCreated')}>
        <Text style={Buttons.main_buttonText}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[Buttons.secondary_button]}
        onPress={() => navigation.goBack()}>
        <Text style={Buttons.secondary_buttonText}>Decline</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TermsAndConditions;