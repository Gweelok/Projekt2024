import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

const ContactUs = () => {
  return (
    <View>
      <Text>Contact Us</Text>
    </View>
  );
};

// Add prop validation
ContactUs.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ContactUs;
