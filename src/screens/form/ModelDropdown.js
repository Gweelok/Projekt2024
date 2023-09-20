import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Primarycolor1, Primarycolor3 } from "../../styles/Stylesheet";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons";
import CustomInput from "../../componets/atoms/CustomInput";
import { getAllModels } from "../../utils/Repo";
//import { models } from "../../utils/SeedData";


// data is used to set the initial value of the model dropdown
const ModelDropdown = ({ onModelSelect, brandSelected, data }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState(data||null);
    const ITEM_HEIGHT = 31;
    //const models = ["iPhone 14", "Playstation 3", "Nokia 6600", "Samsung s22"];

    const [isValidationError, setIsValidationError] = useState(false);
    const [models, setModels] = useState(models);

    useEffect(() => {
        const fetchData = async () => {
        try {
          const modelsList = await getAllModels();
          console.log('modelsList:', modelsList);
        setModels(modelsList);
        } catch (error) {
          console.log('Error:', error);
        }
      };
      
      fetchData();// Fetch data when component mounts
    }, []);

    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setIsOpen(false);
        if (onModelSelect) {
            onModelSelect(model);
        }
    }

    return (
        <CustomInput showStar={true} optionalMarginBottom>

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
                    {selectedModel?.modelName || (!brandSelected ? t("ModelDropdown.selectModel", currentLanguage) : "Model")}
                </Text>
                <AntDesign
                    name={isOpen ? "caretup" : "caretdown"}
                    size={20}
                />
            </TouchableOpacity>

            {isOpen && (
                <ScrollView style={[modelDropdownContainer.dropdownList, {height: ITEM_HEIGHT * 5.5}]}>
                    {models.map(model => (
                        <TouchableOpacity
                            key={model.modelId}
                            onPress={() => handleModelSelect(model)}
                            style={modelDropdownContainer.dropdownListItem}
                        >
                            <Text style={modelDropdownContainer.dropdownText}>{model.modelName}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
        </CustomInput>
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
