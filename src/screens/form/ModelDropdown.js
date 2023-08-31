import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native"; 
import { Primarycolor1, Primarycolor3 } from "../../styles/Stylesheet"; 
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons"; 
import { models } from "../../utils/SeedData";

const ModelDropdown = ({ onModelSelect, brandSelected }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState(null);



    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setIsOpen(false);
        if (onModelSelect) {
            onModelSelect(model);
        }
    }

    return (
        <View style={modelDropdownContainer.container}>
            <TouchableOpacity 
                style={[
                  modelDropdownContainer.dropdownButton,
                  !brandSelected && modelDropdownContainer.disabled
                ]}
                onPress={() => {
                    if (brandSelected) {
                        setIsOpen(!isOpen);
                    }
                }}
                disabled={!brandSelected}
            >
                <Text style={modelDropdownContainer.dropdownText}>
                    {selectedModel || (!brandSelected ? t("ModelDropdown.selectModel", currentLanguage) : "Model")}
                </Text>
                <AntDesign 
                    name={isOpen ? "caretup" : "caretdown"} 
                    size={20}
                />
            </TouchableOpacity>

            {isOpen && (
                <View style={modelDropdownContainer.dropdownList}>
                    {models.map(model => (
                        <TouchableOpacity 
                            key={model} 
                            onPress={() => handleModelSelect(model)}
                            style={modelDropdownContainer.dropdownListItem}
                        >
                            <Text style={modelDropdownContainer.dropdownText}>{model}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}

const modelDropdownContainer = {
    container: {
        flexDirection: "column",
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
    disabled: {
        backgroundColor: "#f0f0f0"
    }
};

export default ModelDropdown;
