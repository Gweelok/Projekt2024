import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Primarycolor3, Primarycolor1 } from "../styles/Stylesheet";
import { useLanguage, t } from "../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

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
        setIsOpen(false);
    };

    return (
        <View style={styles.parentContainer}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <FontAwesome name="globe" size={24} color={Primarycolor1} />
                    <Text style={styles.dropdownText}>
                        {languageOptions.find((option) => option.value === currentLanguage)
                            ?.label || "Select Language"}
                    </Text>
                    <AntDesign name={isOpen ? "up" : "down"} size={20} />
                </TouchableOpacity>

                {isOpen && (
                    <ScrollView style={styles.dropdownList}>
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
        position: "absolute",
        top: Platform.OS === "ios" ? "100%" : (Platform.OS === "android" ? 40 : "100%"),
        left: 0,
        zIndex: 1,
        width: "100%",
        maxHeight: 150,
        overflowY: "auto",
        overflowX:"auto",
    },
    dropdownListItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Primarycolor1,
        backgroundColor: Primarycolor3,
    },
};

export default LanguageDropdown;
