import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// sqlite database
import { dropAll, createTestData, database } from './src/utils/Database'

// import from files
import { navStyle } from './src/styles/Stylesheet'
import { ChooseStation } from './src/componets/molocules/stationOptions'
import { LandingPage } from './src/componets/atoms/landingPage'
import { RegisterItem } from './src/componets/atoms/registerItem'
import { ChooseCatagories,ChooseProducts, ChooseModels, ChooseBrands } from './src/componets/molocules/registerOptions'
import { DashboardScreen} from './src/screens/dashboardScreen'

console.log('start');
const Stack = createNativeStackNavigator()

// Main function that everything runs in
export default function App() {
	const [test, setTest] = useState(0)
	useEffect( () => {
		function showdata (data) {
			console.log(data);
		}
		database.getData(showdata,'Items')
	},[])


	return (
		<NavigationContainer theme={navStyle}>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={LandingScreen} options={{ title: 'Overview', headerRight:() => ( <Button
						onPress={() => {test ? dropAll() : createTestData(); setTest(!test)}}
						title={test ? "Drop" : "TEST!"}
						color="#4cad6a"
						/>) }} />
				<Stack.Screen name="Dash" component={DashboardScreen} options={{ title: 'Dashboard' }} />
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
			<SafeAreaView style={{ flex: 1, backgroundColor: 'Blue' }}>
				<LandingPage navigation = {navigation}/>
				<RegisterItem navigation = {navigation} navplace={'Cat'}/>
			</SafeAreaView>
		)
	}
	
	// eslint-disable-next-line react/prop-types
	function StationsScreen({navigation,route}) {
		return (
			<SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
				<ChooseStation navigation={navigation} route={route}/>
			</SafeAreaView>
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
			<SafeAreaView style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
				<Text style={{fontSize: 23}}>Thank You</Text>
				<Text style={{fontSize: 15}}>You have registered an item on Station: {estId}</Text>
			</SafeAreaView>
		)
	}
}
//				<ChooStation/>