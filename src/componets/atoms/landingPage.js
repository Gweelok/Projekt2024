// Donia code
// Used the "Dashboard" and "ItemButton" function created by Sebastian to create a identical "LandingPage" page and "RegisterItem" button.
import React from 'react'
import { View, ScrollView, Text } from 'react-native'

import { styles } from '../../../Stylesheet'

export const LandingPage = () => {
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