// Donia code
// Used the "Dashboard" and "ItemButton" function created by Sebastian to create a identical "LandingPage" page and "RegisterItem" button.
import React from 'react';
import { Button } from 'react-native-elements'

import { elementsStyles } from '../../../src/styles/Stylesheet'

var tempid = null
var tempname = null

export const RegisterItem = ( {navigation, navplace,id = tempid, name = tempname } ) => {
	return(
		<Button
			buttonStyle={elementsStyles.greenColor}
			onPress={() => {
				// eslint-disable-next-line react/prop-types
				navigation.navigate(navplace,{id: id, name: name})
				// If button is pressed: Redirect to "registrering item"
			}}
			
			title={navplace == 'Stations' ? "Next":"+ \nRegister item"}
		/>
	);
};