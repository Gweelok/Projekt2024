import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location'

import { styles } from '../../../src/styles/Stylesheet'
import { getClosestEst } from '../../../src/utils/Database'


export const CurrStation = () => {
	const [dist,setDist] = useState({ distance: '?', name: '' })
	
	useEffect( () => {
		var location = null
		var data = null

		function domath(data, location){
			var tempdata = []
			console.log('start domath');
			for (let i = 0; i < data.length; i++){
						let dlon = data[i].long - location.coords.longitude;
						let dlat = data[i].lat - location.coords.latitude;
			//			console.log(dlat +' '+dlon)
						let a = Math.pow(Math.sin(dlat / 2), 2)
						+ Math.cos(location.coords.latitude) * Math.cos(data[i].lat)
						* Math.pow(Math.sin(dlon / 2),2);
			//			console.log(a);
						let c = 2 * Math.asin(Math.sqrt(a));
			//			console.log(c);
						// Radius of earth in kilometers. Use 3956
						// for miles
						let r = 6371;
						tempdata.push({distance: c*r, name: data[i].name})
					}
			
			// calculate the result
//			console.log(c*r);
			let sorteddata = tempdata.sort((a,b) => { return a.distance - b.distance})
			console.log(sorteddata);
			setDist({distance: Math.ceil(sorteddata[0].distance), name: sorteddata[0].name})
		}

		function setLocation(prop) {
			location = prop
		} 
		function setData (prop) {
			data = prop
		}

		console.log('start current useeffect');
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.log('Permission to access location was denied');
				return;
			}
			console.log('status good');
			let loc = await Location.getLastKnownPositionAsync({});
			setLocation(loc);
			getClosestEst(location.coords.latitude,location.coords.longitude,setData)
		})();
		const timer = setTimeout(() => domath(data,location), 1000);
		return () => clearTimeout(timer);
	},[])

	return (
		<View style={styles.currEstStyle}>
			<Text>{dist.distance} m</Text>
			<Text style ={{fontSize: 24}}>{dist.name}</Text>
			<Text>not implemented yet</Text>
		</View>
	)
}