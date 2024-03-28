import React, { createContext, useState } from "react";
import { Modal, View, ActivityIndicator } from "react-native";
import loaderContextStyles from "./loaderContextStyles";

// using context API, we can create a global loader.
// create pass data  to pass data
export const LoaderContext = createContext();

//the provider allows consuming the components to subscribe to context changes
export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <Modal transparent visible={isLoading}>
          <View style={loaderContextStyles.loaderContainer}>
            <ActivityIndicator
              size={loaderContextStyles.activityIndicator.size}
              color={loaderContextStyles.activityIndicator.color}
            />
          </View>
        </Modal>
      )}
      {children}
    </LoaderContext.Provider>
  );
};
