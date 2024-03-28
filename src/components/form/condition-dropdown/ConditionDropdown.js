import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { styles, styles as stylesGlobal } from "../../../styles/Stylesheet";
import conditionDropdownContainer from "./conditionDropdownStyles";

import BackButton from "../../BackButton/BackButton"; // Make sure to import this if used
import { t, useLanguage } from "../../../languages/LanguageHandler";

const ConditionDropdown = ({ onConditionSelect, data, isVisible }) => {
  const { currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(data);
  const [isValidationError, setIsValidationError] = useState(false);
  const [conditions, setConditions] = useState([
    "As new",
    "Good but used",
    "Worn but working",
    "Smaller defects",
    "Broken",
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredConditions, setFilteredConditions] = useState(conditions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch conditions data here, if available
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    setIsModalVisible(isVisible);
  }, [isVisible]);

  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition);
    setIsOpen(false);
    setIsValidationError(false);
    if (onConditionSelect) {
      onConditionSelect(condition);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = conditions.filter((condition) =>
      condition.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredConditions(filtered);
  };

  const handleBack = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={conditionDropdownContainer.container}>
      <Text style={conditionDropdownContainer.formLabel}>
        {t("ConditionDropdown.selectCondition", currentLanguage)}
      </Text>
      <TouchableOpacity
        style={conditionDropdownContainer.dropdownButton}
        onPress={() => {
          setIsModalVisible(true);
        }}
      >
        <Text
          style={[
            conditionDropdownContainer.dropdownText,
            !selectedCondition && conditionDropdownContainer.disableText,
          ]}
        >
          {selectedCondition ||
            t("ConditionDropdown.placeholder", currentLanguage)}
        </Text>
        <AntDesign
          name={isOpen ? "up" : "down"}
          style={conditionDropdownContainer.arrowIcon}
        />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={conditionDropdownContainer.modalContainer}>
          <View style={conditionDropdownContainer.topBar}>
            <BackButton onPress={handleBack}></BackButton>

            <View style={conditionDropdownContainer.searchContainer}>
              {/** TEXT SHOULD HAVE COLOR AND FONT */}
              <Text style={conditionDropdownContainer.input}>
                {t("DropdownScreen.Condition", currentLanguage)}
              </Text>
            </View>
          </View>

          <ScrollView style={conditionDropdownContainer.dropdownList}>
            {filteredConditions.map((condition) => (
              <TouchableOpacity
                key={condition}
                onPress={() => {
                  handleConditionSelect(condition);
                  setIsModalVisible(false);
                }}
                style={conditionDropdownContainer.dropdownListItem}
              >
                <Text style={conditionDropdownContainer.dropdownText}>
                  {condition}
                </Text>
              </TouchableOpacity>
            ))}
            <Text style={conditionDropdownContainer.bottomDescription}>
              {t("DropdownScreen.Text", currentLanguage)}
            </Text>
          </ScrollView>
        </View>
      </Modal>

      {isValidationError && !selectedCondition && (
        <Text style={conditionDropdownContainer.validationErrorText}>
          Validation error message here
        </Text>
      )}
    </View>
  );
};

export default ConditionDropdown;
