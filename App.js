import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, ScrollView, Button, Text, View } from 'react-native';
// sqlite database
import * as SQLite from 'expo-sqlite';


var db = SQLite.openDatabase('db.testDb');

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


// Main function that everything runs in
export default function App() {
	const [data, setData] = useState([]);
	useEffect(() => {
		db.transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS EStations (id INTEGER PRIMARY KEY, name VARCHAR(20))'
			)
		})

		db.transaction(tx => {
			tx.executeSql(
					'SELECT * FROM EStations', null,
					(txObj, {rows: { _array } }) => setData(_array),
					(txObj, error) => console.log('DB Error: ', error)
				)
			}
		);
	},[]);

	const Item = ( item ) => (
			<Text>{item.name}</Text>
		
	);
	const renderItem = ( {item} ) => {
		return(
				<Item
					item ={item}
				/>
			);
	};

	return (
		<>
			<LandingPage/>
	<SafeAreaView style={{ flex: 1 }}>
		<View style={{flex:1}}>
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor= {(item) => item.id }
				/>
		</View>
	</SafeAreaView>
			<RegisterItem/>
		</>
		);
	}

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

/* Donia Inputs
*/
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
				onPress={() => {
					isSetButton(!isButton);
					}}
				title={isButton ? "+ \n Register Item" : "Thank you!"}
			/>
		</View>
	);
};



/**		 Unused code (or a maybe will be used code)
 * 
 *	<StatusBar style="auto" />

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
/
}*/