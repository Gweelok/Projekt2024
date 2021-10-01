import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView, FlatList, StyleSheet, ScrollView, Button, Text, View } from 'react-native';
// sqlite database
import * as SQLite from 'expo-sqlite';


var db = SQLite.openDatabase('sqlite.db');
console.log('start');

// Main function that everything runs in
export default function App() {
	const [data, setData] = useState([]);
	const [place, setPlace] = useState({choice: "data",name: null, id: 0, lat: null, long: null});
	const getPlace = useMemo (() => createPlace(place),[place])

	function createPlace(item) {
		console.log('place created');
		let temp = {
				choice: item.choice,
				name: item.name,
				id: item.id,
				lat: item.lat,
				long: item.long
			} 
		console.log(temp);
		return temp
	}

	useEffect( () => {
		console.log('useEffect start');
		const getTable = async () => {
			await db.transaction(tx => {
				tx.executeSql(
					'CREATE TABLE IF NOT EXISTS EStations (id INTEGER PRIMARY KEY, name VARCHAR(20), lat DECIMAL(15,10), long DECIMAL(15,10))'
					)
				}
			)
			console.log('table gotten');
		};
		const getData = async () => {
			var sqldata = []
			switch(getPlace.id) {
				case 0:
					await db.transaction(tx => {
							tx.executeSql(
								'SELECT * FROM EStations ORDER BY id ASC', null,
									(txObj, results) => {
										const le = results.rows.length
											if (le > 0){
												for (var i = 0; i <= le-1; i++) {
													sqldata = [...sqldata,results.rows.item(i)];
												}
											}
											setData(sqldata)
											console.log('data gotten');
										},
									(txObj, error) => console.log('DB Select All Error: ', error)
								)
							}
						);
					break;
				default:
					await db.transaction(tx => {
						tx.executeSql(
								"SELECT * FROM EStations WHERE id = ?",
								[getPlace.id],
								(txObj, result) => {
									console.log(result.rows);
									if (result.rows.length == 1) {
										sqldata = [...sqldata, result.rows.item(0)]
									} else if (result.rows.length > 1) {
										console.log('DB error: More than one result');
									} else {
										console.log('DB Select Specific: No result on this id');
									}
									setData(sqldata)
									console.log('specific data gotten');
								},
								(txObj, error) => console.log('DB Select Specific Error: ', error)
							)
						}
					)
					break;
			}
		}
		const dropData = async () => {
			await db.transaction(tx => {
				tx.executeSql(
					'DROP TABLE EStations',null,
					(txObj, results) => console.log("db drop success: it worked! " + results),
					(txObj,error) => console.log("db drop error: " + error)
				)
			}
		)}

		const truncateData = async () => {
			await db.transaction(tx => {
				tx.executeSql(
					'TRUNCATE TABLE EStations',null,
					(txObj, results) => console.log("db truncate success: haleluja! " + results),
					(txObj,error) => console.log("db truncate error: " + error)
				)
			}
		)}

		const insertData = async (item) => {
			await db.transaction(tx => {
				tx.executeSql(
					"INSERT INTO EStations (id, name, lat, long) VALUES ( ?,?,?,?)",
					[item.id, item.name, item.lat, item.long],
					(txObj, results) => console.log("db insert success: good job :thumbs_up: "+results),
					(txObj,error) => console.log("db insert error: " + error)
				)
			}
		)}

		const updateData = async (item) => {
			await db.transaction(tx => {
				tx.executeSql(
					"UPDATE EStations SET name = ?, lat = ?, long = ? WHERE id = ?",
					[item.name, item.lat, item.long, item.id],
					(txObj, results) => console.log("db update success: huzzah for you! "+results),
					(txObj,error) => console.log("db update error: " + error)
				)

			}
		)}

		getTable()
		switch (getPlace.choice) {
			case ("drop"):
				dropData()
				getData()
				break;
			case ("truncate"):
				truncateData()
				getData()
				break;
			case ("insert"):
				insertData(getPlace);
				getData()
				break;
			case ("update"):
				updateData(getPlace)
				getData()
				break;
			case ("data"):
				getData()
				break;
			default:
				console.log('error: not a possible action');
		}
		
	},[getPlace])

	

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<LandingPage/>
			<Render data = {data}/>
			<RegisterItem/>
		</SafeAreaView>
	);
}



//				Render of database

// eslint-disable-next-line react/prop-types
const Render = ({data}) => {
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
		<Item title={"name: "+item.name+" \b id: "+item.id} description={"lat: "+item.lat +" long: "+ item.long} />
	);

	return (
		<View style={{flex:1}}>
			{data && (
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
				/>
			)}
		</View>
	)
}

/* Donia Inputs 
*/

// Used the "Dashboard" and "ItemButton" function created by Sebastian to create a identical "LandingPage" page and "RegisterItem" button.
const LandingPage = () => {
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

const RegisterItem = () => {
	const [isButton, isSetButton] = useState(true);
	return(
		<View style ={styles.footer}>
			<Button
				color="#4cac6a"
				onPress={() => {
					isSetButton(!isButton);				
					// If button is pressed: Redirect to "registrering item"
				}}
				
				title={isButton ? "+ \n Register item" : "\n Registering item"}
			/>
		</View>
	);
};

// Stylesheet like CSS
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop :20,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	}, footer: {
		height: 50,
	},
});



/**		 Unused code (or a maybe will be used code)
 * 
 *	<StatusBar style="auto" />

const Dashboard = () => {
	return(
		<View style={styles.container}>
			<ScrollView>
				<Text>
					DashBoard 
				</Text>
			</ScrollView>
		</View>
	);
};

const ItemButton = () => {
	const [isButton, isSetButton] = useState(true);
	return(
		<View style ={styles.footer}>
			<Button
				onPress={() => {
					isSetButton(!isButton);
					}}
				title={isButton ? "Press Me" : "Thank you!"}
			/>
		</View>
	);
};


const databasestuff = () => {
	return (
	<SafeAreaView style={{ flex: 1 }}>
		<View style={{flex:1}}>
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor= {(item) => item.id }
					extraData={selectedId}
				/>
		</View>
	</SafeAreaView>
		)
// Parts gotten from https://reactnativecode.com/view-all-data-from-sqlite-database/
/*	useEffect(() => {
		db.transaction(function (txn) {
			txn.executeSql(
				"SELECT name FROM sqlite_master WHERE type='table' AND name='EStations'",
				[]
			);
		})
	}, []);


	const viewStation = () => {
		db.transaction((tx) => {
			tx.executeSql(
				'SELECT * FROM EStations',
				[],
				(tx, results) => {
					var temp = [];
					for (let i = 0; i < results.rows.length; ++i)
						temp.push(results.rows.item(i));
						setListE(temp);
	
					if (results.rows.length >= 1) {
						setEmpty(false);
					} else {
						setEmpty(true)
					}
				}
			);
		})
	};


const emptyMSG = (status) => {
	return (( {item} ) => {
		return(

		<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
			<Text style={{ fontSize: 25, textAlign: 'center' }}>
				Database is Empty...
			</Text>
		</View>
	);
}
const renderItem = ({ item }) => (
	<Item title={item.title} />
);

return(
	<SafeAreaView style={{ flex: 1 }}>
		<View style={{flex:1}}>
			{empty ? emptyMGS(empty) :
				<FlatList
					data={listE}
					renderItem = {({ listEsss }) =>
						<View key={listE.id} style={{padding:20}}>
							<Text> Id: {listE.id} </Text>
							<Text> Name: {listE.name} </Text>
						</View>
					}
				/>
			}
		</View>
	</SafeAreaView>
	);
}*/