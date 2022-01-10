import React, {useEffect,useState} from 'react';
import { TouchableOpacity, Text, View, FlatList } from 'react-native';
import * as Location from 'expo-location'

import { styles } from '../../../Stylesheet'
import { getClosestEst, getSpecificItem, database } from '../../../src/utils/Database'
import MapView, { Marker } from 'react-native-maps'



export const ChooseStation = ({navigation,route}) => {
	const [dist,setDist] = useState([{ distance: '?', name: '',id:9 }])
	const [selected,setSelected] = useState(0)
	const [item,setItem] = useState(null)
	const [location,setLocation] = useState({latitude: 0.000000, longitude: 0.000000, latitudeDelta: 0.01, longitudeDelta: 0.01});
	const [MARKER_DATA,set_MARKER_DATA] = useState(tempdata)
	const { id, name } = route.params
	
	useEffect( () => {
		var templocation = null
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
						tempdata.push({distance: c*r, name: data[i].name, id: data[i].id})
					}
			
			// calculate the result
//			console.log(c*r);
			let sorteddata = tempdata.sort((a,b) => { return a.distance - b.distance})

			getSpecificItem(name,setItem,id)

			setSelected(sorteddata[0].id)
			setDist(sorteddata)
			setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01})
		}
		function domMathNoPermission () {
			//setSelected(data[0].id)
			setSelected(999)
			data.sort((a, b) => {
				let fa = a.name.toLowerCase(), fb = b.name.toLowerCase();
				
				if (fa < fb) {
					return -1;
				}
				if (fa > fb) {
					return 1;
				}
				return 0;
			});
			setDist(data)
			set_MARKER_DATA(data)
			setLocation({latitude: 56.242319, longitude: 10.559465, latitudeDelta: 3.5, longitudeDelta: 3.5})
		}

		function setCurrLocation(prop) {
			templocation = prop
		} 
		function setData (prop) {
			data = prop
		}

		console.log('start current useeffect');
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.log('Permission to access location was denied');
				database.getData(setData,'EStations')
		const timer = setTimeout(() => domMathNoPermission(), 1000);
		return () => clearTimeout(timer);
			} else {
				console.log('status good');
//				let loc = await Location.getLastKnownPositionAsync({});
				let loc = await Location.getCurrentPositionAsync({});
				setCurrLocation(loc);
				database.getData(set_MARKER_DATA,'EStations')
				getClosestEst(loc.coords.latitude,loc.coords.longitude,setData)
		const timer = setTimeout(() => domath(data,templocation), 1000);
		return () => clearTimeout(timer);
			}
		})();
	},[id, name])


	function renderItem ({item}) {
		return (
			<TouchableOpacity
				style={selected == item.id ? styles.currEstStyle : styles.listEstStyle}
				onPress={() => {setSelected(item.id)}}>
				<Text>{Math.ceil(item.distance)} m</Text>
				<Text style = {{fontSize: 24}}>{item.name}</Text>
				<Text>Not implemented yet</Text>
			</TouchableOpacity >
		)
	}


	return (
		<>
			<MapView
				style={styles.mapStyle}
				provider={MapView.PROVIDER_GOOGLE}
				region={ location }
				showsUserLocation={true}
			>
			{MARKER_DATA.map((marker) => (
				<Marker
				key={marker.id+'&'+selected}
				title ={marker.name}
				pinColor = {marker.id==selected ? 'green' : 'red'}
				coordinate={{
					latitude: marker.lat,
					longitude: marker.long}}
					onPress={ () => { setSelected(marker.id) } }
/*			
//					{getClosestEst(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude,getTest)}
//					{console.log(e.nativeEvent)}
//					{getClosestEst(location.latitude,location.longitude)}}
*/				
				/>
			))}
			</MapView>

			{dist && (
				<FlatList
					data={dist}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
				/>
			)}
			<TouchableOpacity 
				style={styles.chooseStyle}
				onPress={() => {
					// eslint-disable-next-line react/prop-types
					// Item (id , aval , estId , catId , proId , bndId , modId )
					database.insertData({id: Math.floor(Math.random() * (10000 - 1 + 1) + 1), aval: 1, estId: selected, catId: item[0].catId, proId: item[0].proId, bndId: typeof item[0].bndId !== 'undefined' ? item[0].bndId : null, modId: typeof item[0].modId !== 'undefined' ? item[0].modId : null},'Items')
					setTimeout(() => navigation.navigate('Thanks',{estId: selected,}),2000)			
					// If button is pressed: Redirect to "registrering item"
				}}
				>
				<Text style={{fontSize: 35}}>choose</Text>
			</TouchableOpacity>
		</>
	)
}

const tempdata = []

//	Directions API, that we'll test later on
	/*	<MapViewDirections
			origin={coordinates[1]}
			destination={coordinates[0]}
			strokeWidth = {2}
			apikey={GOOGLE_MAPS_APIKEY}
			strokeColor="hotpink"
		/>
	*/