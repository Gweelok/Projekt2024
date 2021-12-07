import { StyleSheet } from 'react-native';
import { DefaultTheme } from '@react-navigation/native'

//		backgroundColor: '#fff',
// Stylesheet like CSS
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop :20,
		alignItems: 'center',
		justifyContent: 'center',
	}, 
	footer: {
		height: 50,
	}, 
	mapViewBox: {
		marginTop:40,
		width: 145 *2,
		height: 140*3,
		borderColor:'black',
		borderBottomWidth:5,
		borderTopWidth:5,
		borderLeftWidth:5,
		borderRightWidth:5,
		borderRadius: 10,
		borderWidth: 1,
	}, 
	currEstStyle: {
		marginTop:10,
		width: 170 *2,
		height: 80,
		backgroundColor: '#4cad6a'
	}, 
	mapStyle: {
		marginTop:40,
		width: 170 *2,
		height: 120*3,
		borderRadius: 10,
		borderWidth: 1,
	}, 
	listEstStyle: {
		marginTop:10,
		width: 170 *2,
		height: 80,
		backgroundColor: '#f3f3f3'
	}, 
	chooseStyle: {
		marginBottom:10,
		width: 190 *2,
		height: 60,
		backgroundColor: '#f4940a',
		alignItems: 'center',
		justifyContent: 'center',
	},renderRegister: {
		height: 65,
		justifyContent: 'center',
	}
});

//		borderColor:'#5cdb7e',
//		borderBottomWidth:2,
//		borderTopWidth:2,
//		borderLeftWidth:2,
//		borderRightWidth:2,
//		borderRadius: 10,
//		borderWidth: 1,

export const navStyle = {
	...DefaultTheme,
	colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255,255,255)',
  },
}

//	SquareShapeView: {
//		width: 120,
//		height: 120,
//		backgroundColor: '#00BCD4'
//	},
//	RectangleShapeView: {	 
//		marginTop: 20,
//		width: 120 * 2,
//		height: 120,
//		backgroundColor: '#FFC107'
//	}