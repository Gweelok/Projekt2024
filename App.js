import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// sqlite database
import { database, createTestData } from './src/utils/Database'

// import from files
import { Render } from './RenderData'
import { navStyle } from './Stylesheet'
import { ChooseStation } from './src/componets/molocules/stationOptions'
import { LandingPage } from './src/componets/atoms/landingPage'
import { RegisterItem } from './src/componets/atoms/registerItem'
import { ChooseCatagories,ChooseProducts, ChooseModels, ChooseBrands } from './src/componets/molocules/registerOptions'


console.log('start');
const Stack = createNativeStackNavigator()

// Main function that everything runs in
export default function App() {
	const [data, setData] = useState([])
	const [place, setPlace] = useState({choice: "data", id: 2, name: "Dummy 2", lat: 57.121, long: 53.887})
	const getPlace = useMemo (() => createPlace(place),[place])

//	useLocation('status',setErrorMsg)

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

	useEffect( () => {
		console.log('useEffect start');
		const tableList = [ 'EStations', 'Catagories', 'Products', 'Models', 'Brands', 'Items' ]
		database.setTable(tableList[5])
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

//	},[])


	//setPlace()
//			<Render data = {data}/>

	return (
		<NavigationContainer theme={navStyle}>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={LandingScreen} options={{ title: 'Overview' }} />
				<Stack.Screen name="Cat" component={CatScreen} options={{ title: 'Catagories' }} />
				<Stack.Screen name="Pro" component={ProScreen} options={{ title: 'Products' }} />
				<Stack.Screen name="Bnd" component={BndScreen} options={{ title: 'Brands' }} />
				<Stack.Screen name="Mod" component={ModScreen} options={{ title: 'Models' }} />
				<Stack.Screen name="Stations" component={StationsScreen} />
				<Stack.Screen name="Thanks" component={ThanksScreen} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);


	//Screens
	// eslint-disable-next-line react/prop-types
	function LandingScreen({ navigation }) {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<LandingPage/>
				<Render data = {data}/>
				<RegisterItem navigation = {navigation} navplace={'Cat'}/>
			</SafeAreaView>
		)
	}
	
	// eslint-disable-next-line react/prop-types
	function StationsScreen({navigation,route}) {
		return (
			<View style={{ flex: 1, alignItems: 'center' }}>
				<ChooseStation navigation={navigation} route={route}/>
			</View>
		);
	}

	function CatScreen({navigation}){
		return (
			<SafeAreaView style={{flex:1}}>
				<ChooseCatagories navigation = {navigation}/>
			</SafeAreaView>
		)
	}

	function ProScreen({navigation,route}){
		return (
			<SafeAreaView style={{flex:1}}>
				<ChooseProducts route={route} navigation = {navigation}/>
			</SafeAreaView>
		)
	}

	function BndScreen({navigation,route}){
		return (
			<SafeAreaView style={{flex:1}}>
				<ChooseBrands route={route} navigation = {navigation}/>
			</SafeAreaView>
		)
	}

	function ModScreen({navigation,route}){
		return (
			<SafeAreaView style={{flex:1}}>
				<ChooseModels route = {route} navigation = {navigation}/>
			</SafeAreaView>
		)
	}

	function ThanksScreen({navigation,route}) {
		const {estId} = route.params
		setTimeout(()=>navigation.navigate('Home'), 3000);
		return (
			<View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
				<Text style={{fontSize: 23}}>Thank You</Text>
				<Text style={{fontSize: 15}}>You have registered an item on Station: {estId}</Text>
			</View>
		)
	}
}
//				<ChooStation/>