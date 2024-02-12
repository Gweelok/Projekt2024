import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { dropdownStyles} from "../../styles/styleSheet";
import Uptainer from './Uptainer';
import Spacer from '../atoms/Spacer';

const UptainerList = ({loading, uptainers}) => {
    
    //Temporary string for not found text
    const NO_UPTAINERS_FOUND = 'No uptainers found';
    const navigation = useNavigation();

    const handleUptainerPress = (location) => {
        // Handle the press event, e.g., navigate to a detailed view
        console.log(`Uptainer ${location.uptainerName} pressed`);
        navigation.navigate("ServiceAdminMain", { location: location });
    };

    const renderUptainers = ({ item, index }) => {
        return (
            <View>
                <Uptainer
                    key={index}
                    location={item}
                    onPress={() => handleUptainerPress(item)}
                    index={index}
                    styling={[
                        dropdownStyles.dropdownListItem2,
                        styles.lastItem,
                    ]}
                    distance={item.distance}
                />

                <Spacer height={25}></Spacer>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size='large' color='black' />
            ) : uptainers.length !== 0 ? (
                <FlatList
                    data={uptainers}
                    keyExtractor={(item) => item.uptainerName}
                    style={[styles.uptainerList]}
                    renderItem={renderUptainers}
                />
            ) : (
                <Text style={[styles.notFound]}>
                    {NO_UPTAINERS_FOUND}
                </Text>
            )}
        </View>
    );

};

const styles = StyleSheet.create(
    {
        container: {height: 325},
        lastItem: { borderBottomWidth: 3 },
        uptainerList: {
            width: '100%',
        },
    });

export default UptainerList;