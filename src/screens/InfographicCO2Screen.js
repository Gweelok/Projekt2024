import React from "react";
import { View, Text } from "react-native";
import { styles, Backgroundstyle } from "../styles/Stylesheet";
import { useLanguage, t } from "../Languages/LanguageHandler"; 

const InfographicCO2Screen = ({ navigation }) => {
    return (
      <View style={[Backgroundstyle.message_Screens]}>
        <View style={Backgroundstyle.interactive_screens}>
          <BackButton onPress={navigation.goBack} style={Buttons.backButton} />
          <Text style={styles.Header_Primarycolor1}> Info page </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginTop: 250,
            marginBottom: 250,
          }}
        >
          <Text
            style={{
              color: Primarycolor3,
              fontSize: 20,
              margin: 20,
              textAlign: "center",
            }}
          >
            {t("thankYouScreen.header", currentLanguage)}
          </Text>
        </View>
      </View>
    );
};

export default InfographicCO2Screen;
