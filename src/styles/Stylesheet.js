import { StyleSheet } from 'react-native';
import { DefaultTheme } from '@react-navigation/native'

//		backgroundColor: '#fff',
// Stylesheet like CSS
export const styles = StyleSheet.create({
	landingPageStyle: {
		flex: 1,
		marginTop :20,
		alignItems: 'center',
		justifyContent: 'center',
	}, 
	mapStyle: {
		marginTop:40,
		width: 170 *2,
		height: 120*3,
		borderRadius: 10,
		borderWidth: 1,
	},
	seperatorStyle:	{
		height: 1,
		width: "100%",
		backgroundColor: "#CED0CE",
	}
})

const regRenderStyle = {height: 65}
const stationListStyle = { width: 170 *2, height: 80 }
const cornerStyle = { borderRadius: 5 }
const chooseStyle = { marginBottom:10, width: 190 *2 }

const bigFont = { fontSize: 35 }
const midFont = { fontSize: 24 }

const greenColor = {backgroundColor: "#4cac6a"}
const yellowColor = {backgroundColor: '#f4940a',}
const greyColor = {backgroundColor: '#f3f3f3'}


export const elementsStyles = {
	regRenderStyle,
	stationListStyle,
	cornerStyle,
	chooseStyle,
	bigFont,
	midFont,
	greenColor,
	yellowColor,
	greyColor,
}

export const navStyle = {
	...DefaultTheme,
	colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255,255,255)',
  },
}

