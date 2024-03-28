import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";

import categoryDropdownContainer from "./categoryDropdownStyles";

import { useLanguage, t } from "../../../languages/LanguageHandler";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { getAllCategories } from '../../../utils/Repo/Categories';
import BackButton from "../../BackButton/BackButton";

const CategoryDropdown = ({
  onCategorySelect,
  data,
  setIsProductDropdownVisible,
  isProductDropdownVisible,
  onSkip,
  isVisible,
}) => {
  const { currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(data || null);
  const [isValidationError, setIsValidationError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesList = await getAllCategories();


        setCategories(categoriesList);
        setFilteredCategories(categoriesList);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    setIsValidationError(false);
    if (onCategorySelect) {
      onCategorySelect(category);
    }
    if (onSkip) {
      onSkip();
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = categories.filter((category) =>
      category.categoryName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleBack = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={categoryDropdownContainer.container}>
      <Text style={categoryDropdownContainer.formLabel}>
        {t("CategoryDropdown.selectCategory", currentLanguage)}
      </Text>

      <TouchableOpacity
        style={categoryDropdownContainer.dropdownButton}
        onPress={() => {
          setIsModalVisible(true);
        }}
      >
        <Text
          style={[
            categoryDropdownContainer.dropdownText,
            !selectedCategory && categoryDropdownContainer.disableText,
          ]}
        >
          {selectedCategory
            ? selectedCategory.categoryName
            : t("CategoryDropdown.placeholder", currentLanguage)}
        </Text>

        <AntDesign
          name={isOpen ? "up" : "down"}
          style={categoryDropdownContainer.arrowIcon}
        />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={categoryDropdownContainer.modalContainer}>
          <View style={categoryDropdownContainer.topBar}>
            <BackButton onPress={handleBack}></BackButton>

            <View style={categoryDropdownContainer.searchContainer}>
              <Ionicons
                name="search"
                style={categoryDropdownContainer.searchIcon}
              />
              <TextInput
                style={categoryDropdownContainer.input}
                placeholderTextColor={
                  categoryDropdownContainer.placeholderColor.color
                }
                onChangeText={handleSearch}
                placeholder={t("DropdownScreen.Category", currentLanguage)}
              />
            </View>
          </View>

          <ScrollView style={categoryDropdownContainer.dropdownList}>
            {filteredCategories.map((category) => (
              <TouchableOpacity
                key={category.categoryId}
                onPress={() => {
                  handleCategorySelect(category);
                  setIsModalVisible(false);
                }}
                style={categoryDropdownContainer.dropdownListItem}
              >
                <Text style={categoryDropdownContainer.dropdownText}>
                  {category.categoryName}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default CategoryDropdown;
