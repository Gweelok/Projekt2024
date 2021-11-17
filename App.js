import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from 'expo-location'

// sqlite database
import { database, createTestData } from './src/utils/Database'

// import from files
import { Map } from './src/utils/Map'


//const tableList = [ 'EStations', 'Catagories', 'Products', 'Models', 'Brands' ]

console.log('start');
const Stack = createNativeStackNavigator()
var status = 'Waiting...'

// Main function that everything runs in
export default function App() {
	const [data, setData] = useState([])
	const [errorMsg, setErrorMsg] = useState(null);
/*
	const [place, setPlace] = useState({choice: "", id: 2, name: "Dummy 2", lat: 57.121, long: 53.887})
	const getPlace = useMemo (() => createPlace(place),[place])

	function createPlace(item) {
		console.log('place created');
		let temp = item
//			Different  
//			{
//				choice: 
//				name: 
//				id: 
//				lat: 
//				long: 
//				catId:
//				modId:
//				bndId:
//			}
			
		console.log(temp);
		return temp
	}
*/
	useEffect( () => {
		console.log('useEffect start');
//		Rewuest permission to get location
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			} else {
				setErrorMsg(status)
			}} 
		)()
/*
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
*/
	},[])

	
	if (errorMsg === 'granted') {
		status = errorMsg
	}
	console.log(status);

	//setPlace()
//			<Render data = {data}/>
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={LandingScreen} options={{ title: 'Overview' }} />
				<Stack.Screen name="Details" component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}


//Screens
function LandingScreen({ navigation }) {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<LandingPage/>
			<RegisterItem navigation = {navigation}/>
		</SafeAreaView>
	)
}

function DetailsScreen({route,navigation}) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Map route= {route}/>
		</View>
	);
}



// Components

// Donia code
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

const RegisterItem = ( {navigation} ) => {
	const [isButton, isSetButton] = useState(true);
	return(
		<View style ={styles.footer}>
			<Button
				color="#4cac6a"
				onPress={() => {
					navigation.navigate('Details', { status: status } )
					isSetButton(!isButton);				
					// If button is pressed: Redirect to "registrering item"
				}}
				
				title={isButton ? "+ \nRegister item" : "\nRegistering item"}
			/>
		</View>
	);
};

//		backgroundColor: '#fff',
// Stylesheet like CSS
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop :20,
		alignItems: 'center',
		justifyContent: 'center',
	}, footer: {
		height: 50,
	},
});
