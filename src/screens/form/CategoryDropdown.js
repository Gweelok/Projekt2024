import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native"; 
import { categoryDropdownContainer } from "../../styles/Stylesheet"; 
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons"; 

const CategoryDropdown = ({ onCategorySelect }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isValidationError, setIsValidationError] = useState(false);

    // Add firebase logic here, instead of dummy data
    const categories = ["Electronics", "Phones", "TV's", "Computers", "Clocks"];

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
                <View style={categoryDropdownContainer.dropdownList}>
                    {categories.map(category => (
                        <TouchableOpacity 
                            key={category} 
                            onPress={() => handleCategorySelect(category)}
                            style={categoryDropdownContainer.dropdownListItem}
                        >
                            <Text style={categoryDropdownContainer.dropdownText}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {isValidationError && !selectedCategory && 
                <Text style={categoryDropdownContainer.validationErrorText}>This field is required</Text>
            }
        </View>
    );
}

export default CategoryDropdown;
