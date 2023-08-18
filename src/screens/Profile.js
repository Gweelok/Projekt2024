import { View, Text, TouchableOpacity} from 'react-native';
import { styles, Backgroundstyle, Buttons} from '../styles/Stylesheet';
import { MenuItems } from '../styles/MenuItems';
import { useLanguage, t } from '../Languages/LanguageHandler'; 
import Navigationbar from '../componets/Navigationbar';
import React from 'react';


const Profile = ({ navigation }) => {
const { currentLanguage } = useLanguage();

return (
    <View style={Backgroundstyle.interactive_screens}> 
        <Text style={styles.Header_Primarycolor1}> Profile page </Text>
        <MenuItems 
          msg={t('Profile.logout', currentLanguage)}
          onPress={() => navigation.navigate('LogoutConfirmation')}
        />
        <Navigationbar navigation={navigation}/>
    </View>
);
}

export default Profile;