import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

const MySettings = () => {
  return (
    <View>
      <Text>My Settings</Text>
    </View>
  );
};

// Add prop validation
MySettings.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MySettings;
