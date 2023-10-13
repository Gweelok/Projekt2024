import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Primarycolor3, Primarycolor1 } from "../styles/Stylesheet";
import { useLanguage, t } from "../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons"; // Use Ionicons for iOS

const LanguageDropdown = () => {
    const { currentLanguage, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languageOptions = [
        { label: "English", value: "en" },
        { label: "Danish", value: "da" },
    // Add more language options as needed
];

const handleLanguageSelect = (language) => {
    setLanguage(language);
    setIsOpen(false); // Close the dropdown
};

const iconStyle = {
    name: Platform.OS === 'ios' ? 'ios-globe' : 'md-globe', // Platform-specific icon name
    size: 24,
    color: Primarycolor1,
};

const dropdownButtonStyle = {
    ...styles.dropdownButton,
};

const dropdownListStyle = {
    ...styles.dropdownList,
    position: 'absolute', // Set position to absolute
    zIndex: 999, // Set a higher z-index to appear on top
    marginTop:40,
};

return (
    <View style={styles.parentContainer}>
        <View style={styles.container}>
            <TouchableOpacity
                style={dropdownButtonStyle}
                onPress={() => setIsOpen(!isOpen)}
            >
                <Ionicons name={iconStyle.name} size={iconStyle.size} color={iconStyle.color} />
                <Text style={styles.dropdownText}>
                    {languageOptions.find((option) => option.value === currentLanguage)
                        ?.label || "Select Language"}
                </Text>
                <AntDesign name={isOpen ? "caretup" : "caretdown"} size={20} />
            </TouchableOpacity>

            {isOpen && (
                <ScrollView style={dropdownListStyle}>
                    {languageOptions.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            onPress={() => handleLanguageSelect(option.value)}
                            style={styles.dropdownListItem}
                        >
                            <Text style={styles.dropdownText}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    </View>
);
};

const styles = {
    parentContainer: {
        width: "100%",
        position: "relative",
    },
    container: {
        flexDirection: "column",
        position: "relative",
    },
    dropdownText: {
        fontFamily: "space-grotesk",
        fontSize: 16,
        marginRight: "50%",
    },
    dropdownButton: {
        borderWidth: 3,
        borderColor: Primarycolor1,
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
    },
    dropdownList: {
        borderWidth: 3,
        borderColor: Primarycolor1,
        width: "100%",
        maxHeight: 150,
        overflowY: "auto",
        alignContent: "center",
    },
    dropdownListItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Primarycolor1,
        backgroundColor: Primarycolor3,
    },
};

export default LanguageDropdown;
