import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import { Primarycolor1 } from "../styles/styleSheet";

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleLogoutPress = () => {
    navigation.navigate('Login');
  };

  // Get the name of the current route
  const currentRouteName = route.name;

  return (
    <View style={styles.container}>
      {/* Profile screen content */}
      <TouchableOpacity onPress={handleLogoutPress} style={styles.button}>
        <View style={styles.content}>
          <Text style={styles.buttonText}>Log Out</Text>
        </View>
        <View style={styles.arrowContainer}>
          <AntDesign name="right" size={20} style={styles.menuItem_arrow} />
        </View>
      </TouchableOpacity>

      {/* Navigation bar */}
      <View style={styles.navigationBar}>
        {/* Your navigation bar content goes here */}
        {/* Example: */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text>Settings</Text>
        </TouchableOpacity>
        {/* Add more navigation options as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  button: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    height: 45,
    width: 280,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: Primarycolor1,
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  buttonText: {
    fontFamily: 'space-grotesk-Medium',
    color: Primarycolor1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  arrowContainer: {
    marginLeft: 'auto',
  },
  menuItem_arrow: {
    color: Primarycolor1,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
  },
});

export default Profile;