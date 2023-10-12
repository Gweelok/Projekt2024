import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Primarycolor1, Primarycolor3, styles,  styles as stylesGlobal } from "../../styles/Stylesheet";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons";

const ConditionDropdown = ({ onConditionSelect, data }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState(data);
    const [isValidationError, setIsValidationError] = useState(false);
    const ITEM_HEIGHT = 39;
    //we dont have this data is the database, dont think we need it, wait for task
    const conditions = ["As new", "Good but used", "Worn but working", "Smaller defects", "Broken"];

    const handleConditionSelect = (condition) => {
        setSelectedCondition(condition);
        setIsOpen(false);
        setIsValidationError(false);
        if (onConditionSelect) {
            onConditionSelect(condition);
        }
    };

    return (
        <View style={conditionDropdownContainer.container}>
            <Text style={[stylesGlobal.formLabel, { marginLeft: 0, marginTop:15 }]}>
                {t("ConditionDropdown.selectCondition", currentLanguage)}
            </Text>
            <TouchableOpacity
                style={[
                    conditionDropdownContainer.dropdownButton,
                ]}
                onPress={() => {
                    setIsOpen(!isOpen);
                    if (!selectedCondition) {
                        setIsValidationError(true);
                    }
                }}
            >
                <Text style={[conditionDropdownContainer.dropdownText, !selectedCondition && {color: "rgba(28, 75, 61, 0.4)"}]}>
                    {selectedCondition || t("ConditionDropdown.placeholder", currentLanguage)}
                </Text>
                <AntDesign name={isOpen ? "up" : "down"} size={30} style={styles.menuItem_arrow} />
            </TouchableOpacity>

            {isOpen && (
                <ScrollView style={[conditionDropdownContainer.dropdownList, ]}>
                    {conditions.map(condition => (
                        <TouchableOpacity
                            key={condition}
                            onPress={() => handleConditionSelect(condition)}
                            style={conditionDropdownContainer.dropdownListItem}
                        >
                            <Text style={conditionDropdownContainer.dropdownText}>{condition}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            {isValidationError && !selectedCondition && (
                <Text style={conditionDropdownContainer.validationErrorText}></Text>
            )}
        </View>
    );
};

const conditionDropdownContainer = {
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

export default ConditionDropdown;
