import React from 'react';
import { TouchableOpacity ,FlatList, Text, View } from 'react-native';

import { styles } from './Stylesheet'


//				Render of database
// eslint-disable-next-line react/prop-types
export const Render = ({data}) => {
	// eslint-disable-next-line react/prop-types
	const Item = ({ name, id, lat, long, catId, modId, bndId, estId, proId, aval }) => {
		//console.log(description + " "+ title);
		if (estId != null){
			return (
				<View>
					<Text>Name: {name}, Id: {id}</Text>
					<Text>Availability: {aval}, EStations id: {estId}, Catagory id: {catId}, Product id: {proId}</Text> 
					<Text>Models id: {modId || 0}, Brand id: {bndId || 0}</Text>
					<Text/>
				</View>
			)
		} else if (bndId != null) {
			return (
				<View>
					<Text>Name: {name}, Id: {id}</Text>
					<Text>Brand id: {bndId}</Text>
					<Text/>
				</View>
			)
		} else if (proId != null) {
			return (
				<View>
					<Text>Name: {name}, Id: {id}</Text>
					<Text>Product id: {proId}</Text>
					<Text/>
				</View>
			)
		} else if (catId != null) {
			return (
				<View>
					<Text>Name: {name}, Id: {id}</Text>
					<Text>Catagory id: {catId}</Text>
					<Text/>
				</View>
			)
		} else if (lat != null || long != null) {
			return (
				<View>
					<Text>Name: {name}, Id: {id}</Text>
					<Text>Latitude: {lat}, Longitude: {long}</Text>
					<Text/>
				</View>
			)
		} else {
			return (
				<View>
					<Text>Name: {name}, Id: {id}</Text>
					<Text/>
				</View>
			)
		}
	}

	const renderItem = ( {item} ) => (
		<Item 
				name = {item.name || null} 
				id = {item.id || null}
				lat = {item.lat || null} 
				long = {item.long || null} 
				catId = {item.catId || null} 
				modId = {item.modId || null} 
				bndId = {item.bndId || null}
				estId = {item.estId || null}
				proId = {item.proId || null}
				aval = {item.aval}
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


const renderSeparator = () => {
	return (
		<View
			style={{
			height: 1,
			width: "100%",
			backgroundColor: "#CED0CE",
		}}/>
	)
}

export const RegRender = ({data,navigation,db,rid}) => {
	const tableList = [ 'Cat', 'Pro', 'Bnd', 'Mod', 'Stations' ]

	const renderName = ( {item} ) => (
		<Item name = {item.name} id = {item.id}/>
	);

	const Item = ({name,id}) => {
		const navplace = tableList[rid]
		return (
			<TouchableOpacity 
				style={styles.renderRegister} 
				onPress= {() => {
					console.log(navplace)
					if (navplace == 'Stations') 
						{ navigation.navigate('Stations', {id:id, name:db})}
					navigation.navigate(navplace, {reg:id})
				}
			}>
				<Text style={{fontSize: 18,marginLeft: "10%"}}>{name}</Text>
			</TouchableOpacity >
		)
	}

	return (
		<View style={{flex:1}}>
			{data && (
				<FlatList
					data={data}
					ItemSeparatorComponent={renderSeparator}
					renderItem={renderName}
					keyExtractor={(item) => item.id.toString()}
					ListFooterComponent={renderSeparator}
				/>
			)}
		</View>
	)
}