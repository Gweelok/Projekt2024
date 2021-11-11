import React, { useState } from 'react';
import { SafeAreaView ,StyleSheet, ScrollView, Button, Text, View } from 'react-native';
// used when we pay
//import MapViewDirections from 'react-native-maps-directions'

import { Map, MARKER_DATA } from './src/utils/Map'


// Main function that everything runs in
export default function App() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<LandingPage/>
			<Map/>
			<RegisterItem/>
		</SafeAreaView>
	)
}
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
