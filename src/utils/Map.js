import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'

export function Map () {
	const mapRegion={
	latitude: 55.6622, 
	longitude: 12.5408,
	latitudeDelta: 0.003,
	longitudeDelta: 0.003,
	}

	return (
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
		latitude: 55.216944,
		longitude: 12.161667,
		color:'#CCAC93',
		name:'seb2',
		direction:'faxe,16'
	}
]
