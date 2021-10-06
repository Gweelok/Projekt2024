import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Button, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'

const MARKER_DATA =[
	{
		id:'1',
		latitude: 55.6622, 
		longitude: 12.5408,
		color: '#2F3136',
		name: 'Test',
		direction: 'arbejde,100'
	}
]

// Main function that everything runs in
export default function App() {
	const mapRegion={
	latitude: 55.6622, 
	longitude: 12.5408,
	latitudeDelta: 0.003,
	longitudeDelta: 0.003,
	}

	return (
			<SafeAreaView style={{ flex: 1 }}>
				<LandingPage/>
				<MapView
				style={StyleSheet.absoluteFillObject}
				provider={MapView.PROVIDER_GOOGLE}
				region={mapRegion}
				>
					{MARKER_DATA.map((marker) => (
						<Marker
						key={marker.id}
						coordinate={{
							latitude: marker.latitude,
							longitude: marker.longitude,
						}}></Marker>
					))}
				</MapView>
				<RegisterItem/>
			</SafeAreaView>
		);
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
