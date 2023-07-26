import { View, TextInput , ScrollView ,StyleSheet} from 'react-native';
import { styles , Backgroundstyle} from '../styles/Stylesheet';
import Navigationbar from '../componets/Navigationbar';
import React, { useState } from 'react';
import Uptainer from '../componets/Uptainer';
import { BoxLink } from '../styles/BoxLink';

///Asumming i have data
const photo = [
    { id: '1', imageSource: 'https://via.placeholder.com/200x200' },
    { id: '2', imageSource: 'https://via.placeholder.com/200x200' },
    { id: '3', imageSource: 'https://via.placeholder.com/200x200' },
    { id: '4', imageSource: 'https://via.placeholder.com/200x200' },
    { id: '5', imageSource: 'https://via.placeholder.com/200x200' },
    { id: '6', imageSource: 'https://via.placeholder.com/200x200' },
    { id: '7', imageSource: 'https://via.placeholder.com/200x200' },
    { id: '8', imageSource: 'https://via.placeholder.com/200x200' },
    { id: '9', imageSource: 'https://via.placeholder.com/200x200' },
    // Add more image URLs as needed
  ];

const UptainerData = [
    {
      name: 'Valby',
      location: 'Allegrade',
      photos: photo,
    },

  {
    name: 'Norrebo',
    location: 'ved fatka',
    photos: photo,
  },
  {
      name: 'Norrebo',
      location: 'ved fatka',
      photos: photo,
    },
  ];
import React from 'react';
import * as Location from "expo-location";

  const renderUptainers = () => {
    // Create a new array without the first element
    const slicedUptainerData = UptainerData.slice(1);

    // rendering the rest of the Uptainer components
    return slicedUptainerData.map((item, index) => (
      <Uptainer key={index + 1} name={item.name} location={item.location} data={item.photos} />
    ));
  };




const Home = ({ navigation }) => {


    const startBackgroundTracking = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status == "granted") {
          await Location.requestBackgroundPermissionsAsync();
        }
      };


    const [search, onChangeSearch] = useState('');

return (
    <View style={Backgroundstyle.interactive_screens}>
            <TextInput
         placeholder="search"
        value={search}
        onChangeText={onChangeSearch}
        keyboardType="email-address"
        autoCapitalize="none"
        clearButtonMode={"always"}
        style={[styles.inputBox , style.searchbar]}
      />
      <ScrollView style={{marginBottom:60,}}>
      <Uptainer name={UptainerData[0].name} location={UptainerData[0].location} data={UptainerData[0].photos} />
       <BoxLink msg="Hvordan funger UPDROPP?"/>
       {renderUptainers()}
      </ScrollView>
    <Navigationbar navigation={navigation}/>
    </View>
);
}

export default Home;


const style=StyleSheet.create({
    searchbar: {
        marginTop:10,
    }
})
