import { useState, useEffect } from 'react';
import * as Location from 'expo-location'

export async function useLocation (choice,setData) {
	const [errorMsg,setErrorMsg] = useState(null)
	const [location,setLocation] = useState(null)

	useEffect(() => { 
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	},[]);

	var text = 'Waiting..';
	switch (choice){
		case 'location':
			if (errorMsg) {
				text = errorMsg;
			} else if (location) {
				text = location
			}
			setData(text)
			break
		case 'status':
			text = errorMsg
			setData(text)
			break
		}
}