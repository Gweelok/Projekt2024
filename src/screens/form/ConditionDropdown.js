import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Primarycolor1, Primarycolor3 } from "../../styles/Stylesheet";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons";

const ConditionDropdown = ({ onConditionSelect }) => {
  const { currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [isValidationError, setIsValidationError] = useState(false);
  const ITEM_HEIGHT = 39;

  // Dummy products, replace with actual data
  const products = [
    "Mint Condition",
    "Good Condition",
    "Fair Condition",
    "Poor Condition",
    "Broken",
  ];

  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition);
    setIsOpen(false);
    setIsValidationError(false);
    if (onConditionSelect) {
      onConditionSelect(condition);
    }
  };

  return (
    <View style={conditionDropdownContainer.container}>
      {/* <TouchableOpacity
        style={[conditionDropdownContainer.dropdownButton]}
        onPress={() => {
          setIsOpen(!isOpen);
          if (!selectedCondition) {
            setIsValidationError(true);
          }
        }}>
        <Text style={conditionDropdownContainer.dropdownText}>
          {selectedCondition ||
            t("ConditionDropdown.selectCondition", currentLanguage)}
        </Text>
        <AntDesign name={isOpen ? "caretup" : "caretdown"} size={20} />
      </TouchableOpacity>

      {isOpen && (
        <View style={conditionDropdownContainer.dropdownList}>
          {products.map((product) => (
            <TouchableOpacity
              key={product}
              onPress={() => handleConditionSelect(product)}
              style={conditionDropdownContainer.dropdownListItem}>
              <Text style={conditionDropdownContainer.dropdownText}>
                {product}
              </Text>
            </TouchableOpacity>
            {isOpen && (
                <ScrollView style={[conditionDropdownContainer.dropdownList, {height: ITEM_HEIGHT * 5.5}]}>
                    {products.map(product => (
                        <TouchableOpacity
                            key={product}
                            onPress={() => handleConditionSelect(product)}
                            style={conditionDropdownContainer.dropdownListItem}
                        >
                            <Text style={conditionDropdownContainer.dropdownText}>{product}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            {isValidationError && !selectedCondition &&
                <Text style={conditionDropdownContainer.validationErrorText}>This field is required</Text>
            }
        </View>
      )}

      {isValidationError && !selectedCondition && (
        <Text style={conditionDropdownContainer.validationErrorText}></Text>
      )} */}
    </View>
  );
};

const conditionDropdownContainer = {
  container: {
    flexDirection: "column",
  },
  validationErrorText: {
    color: "red",
  },
  dropdownText: {
    fontFamily: "space-grotesk",
    fontSize: 16,
    marginRight: 5,
  },
  dropdownButton: {
    borderWidth: 3,
    borderColor: Primarycolor1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  dropdownList: {
    borderWidth: 3,
    borderColor: Primarycolor1,
  },
  dropdownListItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Primarycolor1,
    backgroundColor: Primarycolor3,
  },
};

export default ConditionDropdown;
