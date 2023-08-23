/**
 * choose brands
 * screen where you choose which type of brand you want to register
 * **/

import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';


// sqlite database
import { getDataGroup } from '../../../src/utils/Database'

// import from files
import { RegRender } from '../../../src/utils/RenderData'
import { RegisterItem } from './registerItem'
import GlobalStyle from "../../styles/GlobalStyle";


export const ChooseBrands = ({navigation,route}) => {
	const [data, setData] = useState(null)
	const { reg } = route.params
	const getId = useMemo(() => setId(reg),[reg])

	useEffect(()=>{
		console.log('choose brands useeffect start')
		getDataGroup(getId,setData,'Brands')
	},[getId])

	return (
		<View style={GlobalStyle.BodyWrapper}>
			<View style={{ flex: 1, width: '100%' }}>

			<RegRender data = {data} navigation = {navigation} rid={3} />
			<RegisterItem navigation= {navigation} navplace={'Stations'} id={reg} name={'Products'} />
		</View>
		</View>
	)
}

function setId (id) {
	return 'proId = '+id
}