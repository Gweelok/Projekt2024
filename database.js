import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('sqlite.db')

// for 'table' in the functions
const est = 'EStations'
const cat = 'Catagories'
const pro = 'Products'
const mod = 'Models'
const bnd = 'Brands'

var table = null


//############  IMPORTANT ###############
// MUST be used when starting app
const setTable = (temp) => table = temp;


// standard CRUD for database
const insertData = async (item) => {
	switch (table){
		case 'Products':
			await db.transaction(tx => {
				tx.executeSql(
					"INSERT INTO "+table+" (id, cadId, name, modId, bndId ) VALUES ( ?,?,?,?,?)",
					[item.id, item.cadId, item.name, item.modId, item.bndId],
					(txObj, results) => {console.log("db insert success: good job :thumbs_up: "+results)},
					(txObj,error) => {console.log("db insert error: " + error)}
					)
				}
			)
			break
		case 'Models':
		case 'Brands':
		case 'Catagories':
			await db.transaction(tx => {
				tx.executeSql(
					"INSERT INTO "+table+" (id, name) VALUES ( ?, ?)",
					[item.id, item.name],
					(txObj, results) => {console.log("db insert success: good job :thumbs_up: "+results)},
					(txObj,error) => {console.log("db insert error: " + error)}
				)
			})
		break
		case 'EStations':
			await db.transaction(tx => {
				tx.executeSql(
					"INSERT INTO EStations (id, name, lat, long) VALUES ( ?,?,?,?)",
					[item.id, item.name, item.lat, item.long],
					(txObj, results) => {console.log("db insert success: good job :thumbs_up: "+results)},
					(txObj,error) => {console.log("db insert error: " + error)}
				)
			})
			break
		default:
			console.log('error in insert data, not available table')
	}
}

const getData = async (setDataFunc) => {
	await db.transaction(tx => {
		tx.executeSql(
			'SELECT * FROM '+table+' ORDER BY id ASC', null,
			(_, { rows: { _array } }) => {
				setDataFunc(_array)
			}
				/*(txObj, results) => {
					//console.log(results.rows)
					const le = results.rows.length
						if (le > 0){
							for (let i = 0; i < le; i++) {
								sqldata = [...sqldata,results.rows.item(i)];
							}
						}
					//console.log(sqldata);
				}*/
			)
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
				}
				/*(txObj, result) => {
					console.log(result.rows);
					if (result.rows.length == 1) {
						sqldata = [...sqldata, result.rows.item(0)]
						return sqldata
					} else if (result.rows.length > 1) {
						console.log('DB error: More than one result');
					} else {
						console.log('DB Select Specific: No result on this id');
					}
					// what do with data
					console.log('specific data gotten');
				},*/
				)
			}
		),
	(txObj, error) => {console.log('DB Select Specific Error: ', error)},
	(txObj, success) => {console.log('specific data gotten', success)}
}

const updateData = async (item) => {
	switch (table){
		case 'Products':
			await db.transaction(tx => {
				tx.executeSql(
					"UPDATE Products SET cadId = ?, name = ?, modId = ?, bndId = ? WHERE id = ?",
					[item.cadId, item.name, item.modId, item.bndId, item.id],
					(txObj, results) => {console.log("db update success: huzzah for you! "+results)},
					(txObj,error) => {console.log("db update error: " + error)}
				)
			})
			break
		case 'Models':
		case 'Brands':
		case 'Catagories':
			await db.transaction(tx => {
				tx.executeSql(
					"UPDATE "+table+" SET name = ? WHERE id = ?",
					[item.name, item.id],
					(txObj, results) => {console.log("db update success: huzzah for you! "+results)},
					(txObj,error) => {console.log("db update error: " + error)}
				)
			})
			break
		case 'EStations':
			await db.transaction(tx => {
				tx.executeSql(
					"UPDATE EStations SET name = ?, lat = ?, long = ? WHERE id = ?",
					[item.name, item.lat, item.long, item.id],
					(txObj, results) => {console.log("db update success: huzzah for you! "+results)},
					(txObj,error) => {console.log("db update error: " + error)}
				)
			})
			break
		default:
			console.log('Error in update: table not available')
	}
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
const getTable = async () => {
	switch (table){
		case ('Products'):
			await db.transaction(tx => {
				tx.executeSql(
						'CREATE TABLE IF NOT EXISTS Products (id INTEGER PRIMARY KEY, catId INTEGER, name VARCHAR(20), modId INTEGER, bndId INTEGER)'
					)
				},
				(_, error) => {console.log('db error creating tables: ', error)},
				(_, success) => {console.log('table gotten')}
			)
			break
		case ('Models'):
		case ('Brands'):
		case ('Catagories'):
			await db.transaction(tx => {
				tx.executeSql(
						'CREATE TABLE IF NOT EXISTS '+table+' (id INTEGER PRIMARY KEY, name VARCHAR(20))'
					)
				},
				(_, error) => {console.log('db error creating tables: ' +error)},
				(_, success) => {console.log('table gotten')}
			)
			break
		case ('EStations'):
			await db.transaction(tx => {
				tx.executeSql(
						'CREATE TABLE IF NOT EXISTS EStations (id INTEGER PRIMARY KEY, name VARCHAR(20), lat DECIMAL(15,10), long DECIMAL(15,10))'
					)
				},
				(_, error) => {console.log('db error creating tables: ' +error)},
				(_, success) => {console.log('table gotten')}
			)
			break
		default:
			console.log('Table Error: Not valid input')
	}
}

const dropData = async () => {
	await db.transaction(tx => {
		tx.executeSql(
			'DROP TABLE '+table, null,
			(txObj, results) => {console.log("db drop success: it worked! ",results)},
			(txObj,error) => {console.log("db drop error: " + error)}
		)
	})
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
	setTable
}


// implement testdata into database
// ##########   WARNING ###########
// ######### only run once ########
export const TestData = async () => {
	getTable(cat)
	for (let i = 0; i < Catagories.length; i++) {
		insertData(Catagories[i],cat)
	}
	console.log('Catagories data insertet')
	getTable(pro)
	for (let i = 0; i < Products.length; i++) {
		insertData(Products[i],pro)
	}
	console.log('Products data insertet')
	getTable(mod)
	for (let i = 0; i < Model.length; i++) {
		insertData(Model[i],mod)
	}
	console.log('Models data insertet')
	getTable(bnd)
	for (let i = 0; i < Brand.length; i++) {
		insertData(Brand[i],bnd)
	}
	console.log('Brands data insertet')
	console.log('Test data insertet')
}


const Catagories = [
	{
		id: 1,
		name: 'Hi-fi eqipment'
	},
	{
		id: 2,
		name: 'Kichen machines'
	},
	{
		id: 3,
		name: 'Household machines'
	},
	{
		id: 4,
		name: 'Tablet, smartphones, computers + equipment'
	},
	{
		id: 5,
		name: 'Tv and game consoles'
	}
]

const Products = [
	{
		id: 1,
		catId: 1,
		name: 'Speakers',
		modId: 1,
		bndId: 1
	},
	{
		id: 2,
		catId: 1,
		name: 'Bluetooth speakers',
		modId: null,
		bndId: null
	},
	{
		id: 3,
		catId: 1,
		name: 'Headset and Headphones',
		modId: null,
		bndId: null
	},
	{
		id: 4,
		catId: 1,
		name: 'Turntable',
		modId: null,
		bndId: null
	},
	{
		id: 5,
		catId: 1,
		name: 'Radio',
		modId: null,
		bndId: null
	},
	{
		id: 6,
		catId: 1,
		name: 'Amplifier',
		modId: null,
		bndId: null
	},
	{
		id: 7,
		catId: 1,
		name: 'Stereo',
		modId: null,
		bndId: null
	},
	{
		id: 8,
		catId: 2,
		name: 'Foodprocessor',
		modId: null,
		bndId: null
	},
	{
		id: 9,
		catId: 2,
		name: 'Mixer',
		modId: null,
		bndId: null
	},
	{
		id: 10,
		catId: 2,
		name: 'Blender',
		modId: null,
		bndId: null
	},
	{
		id: 11,
		catId: 2,
		name: 'Juicer',
		modId: null,
		bndId: null
	},
	{
		id: 12,
		catId: 2,
		name: 'Coffee maker',
		modId: null,
		bndId: null
	},
	{
		id: 13,
		catId: 2,
		name: 'Electric kettle',
		modId: null,
		bndId: null
	},
	{
		id: 14,
		catId: 3,
		name: 'Vacuum cleaner',
		modId: null,
		bndId: null
	},
	{
		id: 15,
		catId: 3,
		name: 'Robot vacuums',
		modId: null,
		bndId: null
	},
	{
		id: 16,
		catId: 3,
		name: 'Steam mop',
		modId: null,
		bndId: null
	},
	{
		id: 17,
		catId: 4,
		name: 'Tablet',
		modId: null,
		bndId: null
	},
	{
		id: 18,
		catId: 4,
		name: 'Smartphone',
		modId: null,
		bndId: null
	},
	{
		id: 19,
		catId: 4,
		name: 'Laptop',
		modId: null,
		bndId: null
	},
	{
		id: 20,
		catId: 4,
		name: 'Desktop computer',
		modId: null,
		bndId: null
	},
	{
		id: 21,
		catId: 4,
		name: 'Computer screen',
		modId: null,
		bndId: null
	},
	{
		id: 22,
		catId: 4,
		name: 'Keyboard',
		modId: null,
		bndId: null
	},
	{
		id: 23,
		catId: 4,
		name: 'Computer mouse',
		modId: null,
		bndId: null
	},
	{
		id: 24,
		catId: 5,
		name: 'Flatscreen tv (not smart)',
		modId: null,
		bndId: null
	},
	{
		id: 25,
		catId: 5,
		name: 'Smart tv',
		modId: null,
		bndId: null
	},
	{
		id: 26,
		catId: 5,
		name: 'Gaming console',
		modId: null,
		bndId: null
	}
]

const Model = [
	{
		id:1,
		name:'Marshall'
	}
]

const Brand = [
	{
		id: 1,
		name: 'Acton II'
	}
]