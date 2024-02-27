import React, { createContext, useState } from 'react';
import { StyleSheet, Modal, View, ActivityIndicator } from 'react-native';
import { Primarycolor1 } from '../styles/Stylesheet';

// using context API, we can create a global loader.
// create pass data  to pass data
export const LoaderContext = createContext();

//the provider allows consuming the components to subscribe to context changes
export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && <Modal transparent visible={isLoading}>
                                <View style={styles.loaderContainer}>
                                    <ActivityIndicator size='large' color={Primarycolor1} />
                                </View>
                            </Modal>}
            {children}
        </LoaderContext.Provider>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
  });