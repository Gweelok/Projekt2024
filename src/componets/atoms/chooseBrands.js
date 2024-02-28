/**
 * choose brands
 * screen where you choose which type of brand you want to register
 * **/

import React, { useState, useEffect, useMemo } from 'react';

// import from files
import { RegRender } from '../../../src/utils/RenderData'
import { RegisterItem } from './registerItem'
import Screens from "../../utils/ScreenPaths";

export const ChooseBrands = ({navigation,route}) => {
	const [data, setData] = useState(null)
	const { reg } = route.params
	const getId = useMemo(() => setId(reg),[reg])

	useEffect(()=>{
		console.log('choose brands useeffect start')
		getDataGroup(getId,setData,'Brands')
	},[getId])

	return (
		<>
			<RegRender data = {data} navigation = {navigation} rid={3} />
			<RegisterItem navigation= {navigation} navplace={Screens.STATIONS} id={reg} name={'Products'} />
		</>
	)
}

function setId (id) {
	return 'proId = '+id
}