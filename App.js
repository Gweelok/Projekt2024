import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, ScrollView, Button, Alert, Text, View } from 'react-native';


//                <StatusBar style="auto" />
const ItemButton = () => {
    const [isButton, isSetButton] = useState(true);
    return(
        <View>
            <Button
                onPress={() => {
                    isSetButton(!isButton);
                    }}
                title={isButton ? "Press Me" : "Thank you!"}
            />
        </View>
    );
};

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

function App() {
    return (
        <>
            <Dashboard/>
            <ItemButton/>
        </>
        );
    };

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        marginTop :20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App
