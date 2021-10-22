import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView, FlatList, StyleSheet, ScrollView, Button, Text, View } from 'react-native';
// sqlite database
import { database, TestData } from './database'

console.log('start');



// Main function that everything runs in
export default function App() {
	const [data, setData] = useState([]);
	const [place, setPlace] = useState({choice: "data", id: 1, name: "Dummy 1.1", lat: 55.111, long: 55.111})
	//,name: null, id: 0, lat: null, long: null});
	const getPlace = useMemo (() => createPlace(place),[place])


	function createPlace(item) {
		console.log('place created');
		let temp = item
			/* Different  
			{
				choice: 
				table:
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
		database.setTable("EStations")

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
					database.getTable("EStations")
					break
				case ("drop"):
					database.dropData()
					database.getData(setData)
					break;
				case ("vacuum"):
					database.vacuums()
					break
				// test data
				//###### only run once ######
				case ("testdata"):
					TestData()
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



//				Render of database
// eslint-disable-next-line react/prop-types
const Render = ({data}) => {
	// eslint-disable-next-line react/prop-types
	const Item = ({ title, description }) => {
		//console.log(description + " "+ title);
		return (
			<View>
				<Text>{title} </Text>
				<Text>{description} </Text>
			</View>
		);
	}

	const renderItem = ( {item} ) => (
		<Item title={"name: "+item.name+" \b id: "+item.id} description={"lat: "+item.lat +" long: "+ item.long} />
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
				
				title={isButton ? "+ \n Register item" : "\n Registering item"}
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