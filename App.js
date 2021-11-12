import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView, FlatList, StyleSheet, ScrollView, Button, Text, View } from 'react-native';
// sqlite database
import { database, createTestData } from './src/utils/Database'
import { Map, MARKER_DATA } from './src/utils/Map'

//const tableList = [ 'EStations', 'Catagories', 'Products', 'Models', 'Brands' ]

console.log('start');

// Main function that everything runs in
export default function App() {
	const [data, setData] = useState([])
	const [place, setPlace] = useState({choice: "data", id: 2, name: "Dummy 2", lat: 57.121, long: 53.887})
	//,name: null, id: 0, lat: null, long: null});
	const getPlace = useMemo (() => createPlace(place),[place])

	function createPlace(item) {
		console.log('place created');
		let temp = item
			/* Different  
			{
				choice: 
				name: 
				id: 
				lat: 
				long: 
				catId:
				modId:
				bndId:
			}
			*/
		console.log(temp);
		return temp
	}

	useEffect( () => {
		console.log('useEffect start');
		database.setTable('Models')

		try {
			database.getTable()
			switch (getPlace.choice) {
				// crud functions
				case ("insert"):
					database.insertData(getPlace);
					database.getData(setData)
					break;
				case ("data"):
					database.getData(setData)
					break;
				case ("specific"):
					database.getSpecificData(getPlace.id,setData)
					break
				case ("update"):
					database.updateData(getPlace)
					database.getData(setData)
					break;
				case ("delete"):
					database.deleteData(getPlace.id)
					database.getData(setData)
					break;
				// utility functions
				case ("table"):
					database.getTable()
					break
				case ("drop"):
					database.dropData()
					setData([])
					break;
				case ("dropall"):
					database.dropAll()
					break
				case ("vacuum"):
					database.vacuums()
					break
				// test data
				//###### only run once ######
				case ("testdata"):
					createTestData()
					break
				default:
					console.log('error: not a possible action');
			}
		} catch (error) {
			console.warn(error)
		}
	},[getPlace])

	
	//setPlace()
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<LandingPage/>
			<Render data = {data}/>
			<RegisterItem/>
		</SafeAreaView>
	);
}

/* Different  
			{
				choice:
				name: 
				id: 
				lat: 
				long: 
				catId:
				modId:
				bndId:
			}
			*/

//				Render of database
// eslint-disable-next-line react/prop-types
const Render = ({data}) => {
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

/* Donia Inputs 
*/

// Used the "Dashboard" and "ItemButton" function created by Sebastian to create a identical "LandingPage" page and "RegisterItem" button.
const LandingPage = () => {
	return(
		<View style={styles.container}>
			<ScrollView>
				<Text>
					LandingPage 
				</Text>
			</ScrollView>
		</View>
	);
};

const RegisterItem = () => {
	const [isButton, isSetButton] = useState(true);
	return(
		<View style ={styles.footer}>
			<Button
				color="#4cac6a"
				onPress={() => {
					isSetButton(!isButton);				
					// If button is pressed: Redirect to "registrering item"
				}}
				
				title={isButton ? "+ \nRegister item" : "\nRegistering item"}
			/>
		</View>
	);
};

// Stylesheet like CSS
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop :20,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	}, footer: {
		height: 50,
	},
});
