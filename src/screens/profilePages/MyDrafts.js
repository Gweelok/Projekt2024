import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

const MyDrafts = () => {
  return (
    <View>
      <Text>My Drafts</Text>
    </View>
  );
};

// Add prop validation
MyDrafts.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MyDrafts;
