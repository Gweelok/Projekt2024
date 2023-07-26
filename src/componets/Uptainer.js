import { View, Text, Image , FlatList ,StyleSheet } from 'react-native';
import { styles , Primarycolor1 } from '../styles/Stylesheet';
import React from 'react';



const Uptainer = ({ name,location , data }) => {

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
        <View style={styling.item}>
            <Image source={{ uri: item.imageSource }} style={styling.image} />
        </View>
      )}
    />
     <FlatList
      horizontal={true}
      data={data}
      keyExtractor={(item) => item.id}
      style={{marginBottom:10, marginTop:5,}}
      renderItem={({ item }) => (
        <View style={styling.item}>
            <Image source={{ uri: item.imageSource }} style={styling.image} />
        </View>
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