import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('sqlite.db')

import { setXlsx } from './Mobile_phone'
import { Catagories, Products, Models, Brands, EStations } from './Testdata'

// for 'table' in the functions
const tableList = [ 'EStations', 'Catagories', 'Products', 'Models', 'Brands' ]

var table = null


//############  IMPORTANT ###############
// MUST be used when starting app
const setTable = (temp) => table = temp;


// standard CRUD for database
const insertData = async (item, tempTable = table) => {
	await db.transaction(tx => {
		tx.executeSql(
			createInsertSql([item],tempTable),null,
			(txObj, results) => {console.log("db insert success: good job :thumbs_up: "+results)},
			(txObj,error) => {console.log("db insert error: " + error)}
			)
		}
	)
}

const getData = async (setDataFunc, tempTable = table) => {
	await db.transaction(tx => {
		tx.executeSql(
			'SELECT * FROM '+tempTable+' ORDER BY id ASC', null,
			(_, { rows: { _array } }) => {
				setDataFunc(_array)
			})
		},
		(txObj, error) => {console.log('DB Select All Error: ', error)},
		(_txObj, success) => {console.log('data gotten', success)}
	)
}

const getSpecificData = async (id,setDataFunc) => {
	await db.transaction(tx => {
		tx.executeSql(
				"SELECT * FROM "+table+" WHERE id = ?",
				[id],
				(_, { rows: { _array } }) => {
					setDataFunc(_array)
				})
			}
		),
	(txObj, error) => {console.log('DB Select Specific Error: ', error)},
	(txObj, success) => {console.log('specific data gotten', success)}
}

const updateData = async (item, tempTable = table) => {
	await db.transaction(tx => {
		tx.executeSql(
			createUpdateSql(item,tempTable),null,
			(txObj, results) => {console.log("db update success: huzzah for you! "+results)},
			(txObj,error) => {console.log("db update error: " + error)}
		)
	})
}

const deleteData = async (id) => {
	await db.transaction(tx => {
		tx.executeSql(
			'DELETE FROM '+table+ ' WHERE id = ?', id,
			(txObj, results) => {console.log("db data deleted success: haleluja! ", results)},
			(txObj,error) => {console.log("db data delete error: ", error)}
		)
	})
}

// other utility functions
const getTable = async (tempTable = table) => {
	await db.transaction(tx => {
		tx.executeSql(
				createTableSql(tempTable)
			)
		},
		(_, error) => {console.log('db error creating tables: ', error)},
		(_, success) => {console.log('table gotten', success)}
	)
}

const dropData = async () => {
	var tempStr = 'DROP TABLE ' +table 
	await db.transaction(tx => {
		tx.executeSql(
			tempStr,null,
			(txObj, results) => {console.log("db drop success: it worked! ",results)},
			(txObj,error) => {console.log("db drop error: " + error)}
		)
	})
}

export const dropAll = async () => {
	for (let i = 0; i < tableList.length; i++) {
		let tempStr = 'DROP TABLE ' +tableList[i]
		await db.transaction(tx => {
			tx.executeSql(
				tempStr,null,
				(txObj, results) => {console.log("db drop success: it worked! ",results)},
				(txObj,error) => {console.log("db drop error: " + error)}
			)
		})
	}
}

const vacuums = async () => {
	await db.exec([{sql:'VACUUM;', args: []}], false, 
		//() => console.log('got here'),
		(txObj, results) => console.log("db truncation success: haleluja! " + results),
		(txObj,error) => console.log("db truncation error: " + error))
}




// main object that'll be used
export const database = {
	getTable,
	getData,
	getSpecificData,
	dropData,
	deleteData,
	vacuums,
	insertData,
	updateData,
	setTable,
	dropAll
}




// implement testdata into database
// ##########   WARNING ###########
// ######### only run once ########
export const createTestData = async () => {
	setXlsx(applyExtraData)
}

async function applyExtraData (data) {
	for (let i = 0; i < data.length; i++) {
	//products: smartphone 18
		let knowBrand = Brands.findIndex(prop => prop.name ===data[i].LITE_1)
		if (knowBrand == -1) {
			Brands.push({id: Brands.length+1, proId: 18, name: data[i].LITE_1})
			knowBrand = Brands.length	
		}
		Models.push({id: Models.length+1, bndId: knowBrand+1, name: data[i].LITE_2})
	}

	const testdata = [createInsertSql(EStations,tableList[0]),createInsertSql(Catagories,tableList[1]),createInsertSql(Products,tableList[2]),createInsertSql(Models,tableList[3]),createInsertSql(Brands,tableList[4])]

	testdata.forEach(prop => console.log(prop))

	for (let i = 0; i < tableList.length; i++) {
		getTable(tableList[i])
	}

	for (let i = 0; i < testdata.length; i++) {
		await db.transaction(tx =>
			tx.executeSql(
				testdata[i],
				null,
				(txObj, results) => {console.log("db test data insert success: good job :thumbs_up: "+results)},
				(txObj,error) => {console.log("db test data insert error: " + error)}
			)
		)
	}
}




//#############			For creating sql strings 		#################
const createInsertSql = (props, tab) => {
	var tempStr = 'INSERT INTO ' 
	switch (tab){
		case 'Products':
			tempStr += tab + ' (id, catId, name) VALUES '
			props.forEach(prop =>
				tempStr += '('+prop.id+','+prop.catId+',"'+prop.name+'"),'
			)
			return tempStr.slice(0,-1)
		case 'Catagories':
			tempStr += tab + ' (id, name) VALUES '
			props.forEach(prop =>
				tempStr += '('+prop.id+', "'+prop.name+'"),'	
			)
			return tempStr.slice(0,-1)
		case 'Brands':
			tempStr += tab + ' (id, proId, name) VALUES '
			props.forEach(prop =>
				tempStr += '('+prop.id+','+prop.proId+',"'+prop.name+'"),'	
			)
			return tempStr.slice(0,-1)
		case 'Models':
			tempStr += tab + ' (id, bndId, name) VALUES '
			props.forEach(prop =>
				tempStr += '('+prop.id+','+prop.bndId+',"'+prop.name+'"),'	
			)
			return tempStr.slice(0,-1)
		case 'EStations':
			tempStr += tab + ' (id, name, lat, long) VALUES '
			props.forEach(prop =>{
				tempStr += '('+prop.id+',"'+prop.name+'",'+prop.lat+','+prop.long+'),' 
				console.log(prop)}
			)
			return tempStr.slice(0,-1)
	}
}

const createTableSql = (tab) => {
	var tempStr = 'CREATE TABLE IF NOT EXISTS '
	switch (tab){
		case 'Products':
			return tempStr += tab + ' (id INTEGER PRIMARY KEY, catId INTEGER, name VARCHAR(20))'
		case 'Catagories':
			return tempStr += tab + ' (id INTEGER PRIMARY KEY, name VARCHAR(20))'
		case 'Brands':
			return tempStr += tab + ' (id INTEGER PRIMARY KEY, proId INTEGER, name VARCHAR(20))'
		case 'Models':
			return tempStr += tab + ' (id INTEGER PRIMARY KEY, bndId INTEGER, name VARCHAR(20))'
		case 'EStations':
			return tempStr += tab + ' (id INTEGER PRIMARY KEY, name VARCHAR(20), lat DECIMAL(15,10), long DECIMAL(15,10))'
	}
}

const createUpdateSql = (item, tab) => {
	var tempStr = 'UPDATE '+tab+' SET '
	switch (tab){
		case 'Products':
			return tempStr += 'name = "'+item.name+'", catId = '+item.catId+' WHERE id = '+item.id
		case 'Catagories':
			return tempStr += 'name = "'+item.name+'" WHERE id = '+item.id
		case 'Brands':
			return tempStr += 'name = "'+item.name+'", proId = '+item.proId+' WHERE id = '+item.id
		case 'Models':
			return tempStr += 'name = "'+item.name+'", bndId = '+item.bndId+' WHERE id = '+item.id
		case 'EStations':
			return tempStr += 'name = "'+item.name+'", lat = '+item.lat+', long = '+item.long+' WHERE id = '+item.id
	}
}