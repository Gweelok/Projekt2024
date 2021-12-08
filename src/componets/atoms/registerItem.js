// Donia code
// Used the "Dashboard" and "ItemButton" function created by Sebastian to create a identical "LandingPage" page and "RegisterItem" button.
import React, { useState } from 'react';
import { Button, View } from 'react-native';

import { styles } from '../../../Stylesheet'

var tempid = null
var tempname = null

export const RegisterItem = ( {navigation, navplace,id = tempid, name = tempname } ) => {
	return(
		<View style ={styles.footer}>
			<Button
				color="#4cac6a"
				onPress={() => {
					// eslint-disable-next-line react/prop-types
					navigation.navigate(navplace,{id: id, name: name})
					// If button is pressed: Redirect to "registrering item"
				}}
				
				title={navplace == 'Stations' ? "Next":"+ \nRegister item"}
			/>
		</View>
	);
};