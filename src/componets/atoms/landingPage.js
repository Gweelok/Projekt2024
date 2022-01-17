// Donia code
// Used the "Dashboard" and "ItemButton" function created by Sebastian to create a identical "LandingPage" page and "RegisterItem" button.
import React from 'react'
import { View, ScrollView, Button } from 'react-native'

import { styles } from '../../../src/styles/Stylesheet'

export const LandingPage = ({navigation}) => {
	return(
		<View style={styles.container}>
			<ScrollView>
				<Button title='Your statistics' onPress={() => {navigation.navigate('Dash')}}/>
			</ScrollView>
		</View>
	);
};