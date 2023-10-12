import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Primarycolor1, Primarycolor3, styles, styles as stylesGlobal } from "../../styles/Stylesheet";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons";
import { getAllCategories } from "../../utils/Repo";

// data is used to set the initial value of the category dropdown
const CategoryDropdown = ({ onCategorySelect, data }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(data || null);
    const [isValidationError, setIsValidationError] = useState(false);
    const ITEM_HEIGHT = 40;
    const [categories, setCategories] = useState(categories);

    useEffect(() => {
      const fetchData = async () => {
      try {
        const categoriesList = await getAllCategories();
      setCategories(categoriesList);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    
    fetchData();// Fetch data when component mounts
  }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsOpen(false);
        setIsValidationError(false);
        if (onCategorySelect) {
            onCategorySelect(category);
        }
    };

    return (
        <View style={categoryDropdownContainer.container}>
          <Text style={[stylesGlobal.formLabel, { marginLeft: 0 }]}>
            {t("CategoryDropdown.selectCategory", currentLanguage)}
          </Text>
            <TouchableOpacity
                style={categoryDropdownContainer.dropdownButton}
                onPress={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <Text style={[categoryDropdownContainer.dropdownText, !selectedCategory && {color: "rgba(28, 75, 61, 0.4)"}]}>
                    {selectedCategory ? selectedCategory.categoryName :
                    t("CategoryDropdown.placeholder", currentLanguage)}
                </Text>
                <AntDesign name={isOpen ? "up" : "down"} size={30} style={styles.menuItem_arrow} />
            </TouchableOpacity>

            {isOpen && (
                <ScrollView style={categoryDropdownContainer.dropdownList}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.categoryId}
                            onPress={() => handleCategorySelect(category)}
                            style={categoryDropdownContainer.dropdownListItem}
                        >
                            <Text style={categoryDropdownContainer.dropdownText}>{category.categoryName}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};
// Category dropdown styles
const categoryDropdownContainer = {
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

export default CategoryDropdown;
