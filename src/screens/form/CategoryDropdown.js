import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native"; 
import { styles, dropdownStyles } from "../../styles/Stylesheet"; 
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons"; 

const CategoryDropdown = ({ onCategorySelect }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isValidationError, setIsValidationError] = useState(false);

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
        <View style={{ ...styles.container, flexDirection: "column" }}>
            <TouchableOpacity 
                style={dropdownStyles.dropdownContainer}
                onPress={() => {
                    setIsOpen(!isOpen);
                    if (!selectedCategory) {
                        setIsValidationError(true);
                    }
                }}
            >
                <Text style={dropdownStyles.dropdownText}>
                    {selectedCategory ? selectedCategory : 
                    t("CategoryDropdown.selectCategory", currentLanguage)}
                </Text>
                <AntDesign 
                    name={isOpen ? "up" : "down"} 
                    size={20}
                    style={styles.menuItem_arrow}
                />
            </TouchableOpacity>

            {isOpen && (
                <View style={dropdownStyles.dropdownList}>
                    {categories.map(category => (
                        <TouchableOpacity 
                            key={category} 
                            onPress={() => handleCategorySelect(category)}
                            style={dropdownStyles.dropdownListItem}
                        >
                            <Text style={dropdownStyles.dropdownText}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

        {isValidationError && !selectedCategory && <Text style={{ color: "red" }}>This field is required</Text>}
        </View>
    );
}

export default CategoryDropdown;
