import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, Backgroundstyle, Buttons } from '../styles/Stylesheet';
import { useLanguage, t } from '../Languages/LanguageHandler'; 


const LogoutConfirmation = ({ navigation }) => {
  const { currentLanguage } = useLanguage();

  return (
    <View style={Backgroundstyle.interactive_screens}>
      <Text style={styles.Header_Primarycolor1}>
        {t('LogoutConfirmation.confirmMessage', currentLanguage)}
      </Text>

      <TouchableOpacity 
        style={[Buttons.secondary_button, { marginTop: 20, marginBottom: 10 }]}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={Buttons.secondary_buttonText}>
        {t('LogoutConfirmation.logoutButton', currentLanguage)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={ Buttons.main_button}
        onPress={() => navigation.navigate('Profile')}>
        <Text style={Buttons.main_buttonText}>
        {t('LogoutConfirmation.cancelButton', currentLanguage)}        
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default LogoutConfirmation;
