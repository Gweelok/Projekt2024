import React from 'react';
import { FlatList, Text, View } from 'react-native';

import XLSX from 'xlsx'
import * as FileSystem from 'expo-file-system'



export const setXlsx = async (setData) => {
	if (!(FileSystem.cacheDirectory + 'cities.xlsx').exists) {
		var data = [{
			"name": "John",
			"city": "Seattle"
		},
		{
			"name": "Mike",
			"city": "Los Angeles"
		},
		{
			"name": "Zach",
			"city": "New York"
		}
		];
		var ws = XLSX.utils.json_to_sheet(data);
		var wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Cities");
		const wbout = XLSX.write(wb, {
			type: 'base64',
			bookType: "xlsx"
		});
		const uri = FileSystem.cacheDirectory + 'cities.xlsx';
//		console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
		await FileSystem.writeAsStringAsync(uri, wbout, {
			encoding: FileSystem.EncodingType.Base64
		})
	}

	try {
		await FileSystem.downloadAsync(
			'https://www.teoalida.com/database/Mobile-Phones-Database-by-Teoalida-SAMPLE-LITE.xlsx',
			FileSystem.cacheDirectory + 'cities.xlsx'
		)
	
//		const info = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + 'cities.xlsx')
//		console.log(info);

		const uri = await FileSystem.readAsStringAsync(FileSystem.cacheDirectory + 'cities.xlsx',{encoding: FileSystem.EncodingType.Base64})
		const workbook = await XLSX.read(uri)
		const ws = workbook.Sheets['Phones database']
		const halloween = XLSX.utils.sheet_to_json(ws)
		halloween.splice(0,10)
		setData(halloween)
		console.log(halloween);
	} catch (e) {
		console.log(e); 
	}
}

// eslint-disable-next-line react/prop-types
export const Render = ({data}) => {
	// eslint-disable-next-line react/prop-types
	const Item = ({ title, description }) => {
		//console.log(description + " "+ title);
		return (
			<View>
				<Text>{title} </Text>
				<Text>{description} </Text>
			</View>
		);
	}

	const renderItem = ( {item} ) => (
		<Item title={'\nLITE: '+item.LITE} description={'LITE_1: '+item.LITE_1+"\nLITE_2: "+item.LITE_2+'\nLITE_3: '+item.LITE_3+'\nLITE_4: '+item.LITE_4+'\nLITE_5: '+item.LITE_5+'\nLITE_6: '+item.LITE_7+'\nLITE_8: '+item.LITE_8} />
	);

	return (
		<View style={{flex:1}}>
			{data && (
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => item.LITE.toString()}
				/>
			)}
		</View>
	)
}

/*
	const selectFile = async () => {
		try {
			const file = await DocumentPicker.getDocumentAsync({type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
			if (file.type === 'success'){
//				readExcel(file)
				console.log(file);
				readExcel(file)
			}
		} catch (error) {
			console.log('File error: ' + error)
		}
	}

	const readExcel = (file) => {
		const promise = new Promise((resolve,reject)=>{
		const fileReader= new FileReader()
			fileReader.onload = (e) => {
				const bufferArray = e.target.result
				const wb = XLSX.read(bufferArray, {type: 'binary'})
				const wsname = wb.SheetNames[0]
				const ws = wb.Sheets[wsname]
				setData(XLSX.utils.sheet_to_json(ws))
				resolve(data)
			}
			fileReader.onerror = (error) => {
				reject(error)
			}
			fileReader.readAsBinaryString(file)
		})
		promise.then((d) => {
			console.log(d);
		})
	}
*/