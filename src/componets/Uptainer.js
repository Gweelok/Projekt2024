import { View, Text, Image , FlatList ,StyleSheet, TouchableOpacity } from 'react-native';
import { styles , Primarycolor1 } from '../styles/Stylesheet';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const Uptainer = ({ name, location, data }) => {
    const navigation = useNavigation();
//   const UptainerData = [
//   {
//     id: '1',
//     name: 'Valby',
//     location: '55.6666, 12.3000',
//     imageSource: 'https://via.placeholder.com/200x200',
//   },
//   {
//     id: '2',
//     name: 'Norrebro',
//     location: '55.6666, 12.1000',
//     imageSource: 'https://via.placeholder.com/200x200',
//   },
//   {
//     id: '3',
//     name: 'Norrebro',
//     location: '55.6666, 12.000',
//     imageSource: 'https://via.placeholder.com/200x200',
//   },
// ]

return (
    <View> 
      <Text style={styles.menuItem_text}> {name}</Text>
        <Text style={{fontSize :18 , color :Primarycolor1}}> {location}</Text>
        <FlatList
      horizontal={true}
      data={data}
      keyExtractor={(item) => item.id}
      style={{marginBottom:5, marginTop:5,}}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('DetailView', {data: item })}>
        <View style={styling.item}>
            <Image source={{ uri: item.imageSource }} style={styling.image} />
        </View>
        </TouchableOpacity>
      )}
    />
     <FlatList
      horizontal={true}
      data={data}
      keyExtractor={(item) => item.id}
      style={{marginBottom:10, marginTop:5,}}
      renderItem={({ item }) => (
        <TouchableOpacity  onPress={() => navigation.navigate('DetailView', {data: item })}>
        <View style={styling.item}>
            <Image source={{ uri: item.imageSource }} style={styling.image} />
        </View>
        </TouchableOpacity>
      )}
    />
    </View>
);
}
const styling = StyleSheet.create({
    item: {
      width: 100, // Set the width of each item
      height: 100,
      margin: 5,
      borderRadius: 10,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  });

export default Uptainer;