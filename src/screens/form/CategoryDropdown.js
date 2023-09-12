import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Primarycolor1, Primarycolor3 } from "../../styles/Stylesheet";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons";
import { categories } from "../../utils/SeedData";

// data is used to set the initial value of the category dropdown
const CategoryDropdown = ({ onCategorySelect, data }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(data||null);
    const [isValidationError, setIsValidationError] = useState(false);
    const ITEM_HEIGHT = 40;


    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsOpen(false);
        setIsValidationError(false);
        if (onCategorySelect) {
            onCategorySelect(category);
        }
    }

    return (
        <View style={categoryDropdownContainer.container}>
            <TouchableOpacity
                style={categoryDropdownContainer.dropdownButton}
                onPress={() => {
                    setIsOpen(!isOpen);
                    if (!selectedCategory) {
                        setIsValidationError(true);
                    }
                }}
            >
                <Text style={categoryDropdownContainer.dropdownText}>
                    {selectedCategory ? selectedCategory :
                    t("CategoryDropdown.selectCategory", currentLanguage)}
                </Text>
                <AntDesign
                    name={isOpen ? "caretup" : "caretdown"}
                    size={20}
                />
            </TouchableOpacity>

            {isOpen && (
            <ScrollView style={[categoryDropdownContainer.dropdownList, {height: ITEM_HEIGHT * 5.5}]}>
            {categories.map(category => (
                        <TouchableOpacity
                            key={category}
                            onPress={() => handleCategorySelect(category)}
                            style={categoryDropdownContainer.dropdownListItem}
                        >
                            <Text style={categoryDropdownContainer.dropdownText}>{category}</Text>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
            )}

      {isValidationError && !selectedCategory && (
        <Text style={categoryDropdownContainer.validationErrorText}></Text>
      )}
    </View>
  );
};
// Category dropdown styles
const categoryDropdownContainer = {
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
    // flexGrow: 1,
  },
  dropdownButton: {
    borderWidth: 3,
    borderColor: Primarycolor1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

export default CategoryDropdown;
