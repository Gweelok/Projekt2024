import React from 'react';
import { FlatList, Text, View } from 'react-native';


//				Render of database
// eslint-disable-next-line react/prop-types
export const Render = ({data}) => {
	// eslint-disable-next-line react/prop-types
	const Item = ({ name, id, lat, long, catId, modId, bndId }) => {
		//console.log(description + " "+ title);
		return (
			<View>
				<Text>Name: {name}, Id: {id}</Text>
				<Text>Latitude: {lat}, Longitude: {long}</Text>
				<Text>Catagory id: {catId}, Models id: {modId}, Brand id: {bndId}</Text>
				<Text/>
			</View>
		);
	}

	const renderItem = ( {item} ) => (
		<Item 
				name = {item.name || 'Joe'} 
				id = {item.id || 0}
				lat = {item.lat || 'space'} 
				long = {item.long || 'sea'} 
				catId = {item.catId || 27} 
				modId = {item.modId || 12} 
				bndId = {item.bndId || 1997}
		/>
	);

	return (
		<View style={{flex:1}}>
			{data && (
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
				/>
			)}
		</View>
	)
}
