import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

const LogOut = () => {
  return (
    <View>
      <Text>Log Out</Text>
    </View>
  );
};

// Add prop validation
LogOut.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LogOut;
