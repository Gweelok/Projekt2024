import React from "react";
import { View, Text } from "react-native";

import styles from "./errorBannerStyles"

const ErrorBanner = ({ message }) => {
    return (
        <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{message}</Text>
        </View>
    );
};

export default ErrorBanner;