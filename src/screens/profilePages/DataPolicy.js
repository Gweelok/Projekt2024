import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

const DataPolicy = () => {
  return (
    <View>
      <Text>Data policy</Text>
    </View>
  );
};

// Add prop validation
DataPolicy.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DataPolicy;
