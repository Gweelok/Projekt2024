import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
//import * as Location from 'expo-location'

import { EStations } from './Testdata'

export function Map ({route}) {
	const { status } = route.params
	const [location, setLocation] = useState(null);
	
	useEffect( () => {
		console.log('useEffect start');
		if (status === 'granted'){
			(async () => {
				let location = await Location.getCurrentPositionAsync({});
				setLocation(location);
				} 
			)()
		}
	},[status])



	for (let i = 0 ; i < EStations.length; i++) {
		MARKER_DATA.push(
			{
				id: MARKER_DATA.length+1, 
				latitude: EStations[i].lat, 
				longitude: EStations[i].long, 
				color: '#0f9916', name: 
				EStations[i].name,
				direction:'test '+i
			}
		)
	}
	
//			<Text style={styles.container}>{text}</Text>	
	return (
			<MapView
				style={StyleSheet.absoluteFillObject}
				provider={MapView.PROVIDER_GOOGLE}
				region={
					{
						latitude: location.coords.latitude, 
						longitude: location.coords.longitude, 
						latitudeDelta: 0.003, 
						longitudeDelta: 0.003
					}
				}
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
	);
}


//				Directions API, that we'll test later on
				/*	<MapViewDirections
						origin={coordinates[1]}
						destination={coordinates[0]}
						strokeWidth = {2}
						apikey={GOOGLE_MAPS_APIKEY}
						strokeColor="hotpink"
					/>
				*/



//custom marker
export const MARKER_DATA =[
	{
		id:'1',
		latitude: 55.6622, 
		longitude: 12.5408,
		color: '#2F3136',
		name: 'Test',
		direction: 'arbejde,100'
	},
	{
		id:'2',
		latitude: 55.217944,
		longitude: 12.162667,
		color:'#CCAC93',
		name:'seb2',
		direction:'faxe,16'
	}
]
