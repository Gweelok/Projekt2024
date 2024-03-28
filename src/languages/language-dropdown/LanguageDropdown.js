import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import languageDropdownStyles from "./languageDropdownStyle";
import { useLanguage, t } from "../LanguageHandler";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const LanguageDropdown = () => {
    const { currentLanguage, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const navigation = useNavigation();
    const languageOptions = [
        { label: "English", value: "en" },
        { label: "Danish", value: "da" },
        // Add more language options as needed
    ];

    const handleLanguageSelect = (language) => {
        setLanguage(language);
        setIsOpen(false);
    };

    return (
        <View style={languageDropdownStyles.parentContainer}>
            <View style={languageDropdownStyles.container}>
                <TouchableOpacity
                    style={languageDropdownStyles.dropdownButton}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <FontAwesome name="globe" style={languageDropdownStyles.globeIcon} />
                    <Text style={languageDropdownStyles.dropdownText}>
                        {languageOptions.find((option) => option.value === currentLanguage)
                            ?.label || "Select Language"}
                    </Text>
                    <AntDesign name={isOpen ? "up" : "down"} style={languageDropdownStyles.arrowIcon} />
                </TouchableOpacity>

                {isOpen && (
                    <ScrollView style={languageDropdownStyles.dropdownList}>
                        {languageOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                onPress={() => handleLanguageSelect(option.value)}
                                style={languageDropdownStyles.dropdownListItem}
                            >
                                <Text style={languageDropdownStyles.dropdownText}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>
        </View>
    );
};

export default LanguageDropdown;
