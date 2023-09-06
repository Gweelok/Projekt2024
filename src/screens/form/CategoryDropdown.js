import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native"; 
import { Primarycolor1, Primarycolor3 } from "../../styles/Stylesheet"; 
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons"; 

const CategoryDropdown = ({ onCategorySelect }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Add firebase logic here, instead of dummy data
    const categories = ["Electronics", "Phones", "TV's", "Computers", "Clocks"];

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsOpen(false);
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
