import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native"; 
import { Primarycolor1, Primarycolor3 } from "../../styles/Stylesheet"; 
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons"; 
import { categories } from "../../utils/SeedData";

const CategoryDropdown = ({ onCategorySelect }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isValidationError, setIsValidationError] = useState(false);



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
// Category dropdown styles
const categoryDropdownContainer = {
    container: {
        flexDirection: "column",
    },
    validationErrorText: {
        color: "red"
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
