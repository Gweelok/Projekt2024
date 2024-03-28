import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomInput from "../../CustomInput/CustomInput";
import BackButton from "../../BackButton/BackButton";

import modelDropdownStyles from "./modelDropdownStyles";

import { useLanguage, t } from "../../../languages/LanguageHandler";
import { getAllModels } from "../../../utils/Repo/Models";

const ModelDropdown = ({
  onModelSelect,
  brandSelected,
  data,
  isVisible,
  setIsConditionDropdownVisible,
  isConditionDropdownVisible,
  onSkip,
  brand,
  product,
}) => {
  const { currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(data || null);
  const [models, setModels] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredModels, setFilteredModels] = useState([]);
  useEffect(() => {
    setIsModalVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    const fetchData = async () => {
      const modelsList = await getAllModels()

      setModels(modelsList)
      setFilteredModels(models)

    }

    fetchData()
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      if (product && brand) {
        const filteredModelsByBrandAndProduct = filterModelsByBrandAndProduct(models, product, brand)
        setFilteredModels(filteredModelsByBrandAndProduct);
      }
    };

    if (models) {
      fetchData();
    }

  }, [brand, product, models]);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setIsOpen(false);
    if (onModelSelect) {
      onModelSelect(model);
    }
    // Set Condition Dropdown visibility to true when a model is selected
    setIsConditionDropdownVisible(true);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = models.filter((model) =>
      model.modelName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredModels(filtered);
  };
  const handleSkip = () => {
    setIsModalVisible(false);
    if (onSkip) {
      onSkip();
    }
    if (!isConditionDropdownVisible) {
      setIsConditionDropdownVisible(true);
    }
    if (isConditionDropdownVisible) {
      setIsConditionDropdownVisible(true);
    }
  };
  const handleBack = () => {
    setIsModalVisible(false);
  };

  return (
    <CustomInput optionalMarginBottom>
      <View style={modelDropdownStyles.dropdownLabelContainer}>
        <Text style={modelDropdownStyles.dropdownLabel}>
          {t("ModelDropdown.selectModel", currentLanguage)}
        </Text>

        <Text style={modelDropdownStyles.dropdownOptional}>
          ({t("AccountSettingsScreen.Optional", currentLanguage)})
        </Text>
      </View>

      <View style={modelDropdownStyles.container}>
        <TouchableOpacity
          style={[
            modelDropdownStyles.dropdownButton,
            !brandSelected && modelDropdownStyles.disabled,
          ]}
          onPress={() => {
            if (brandSelected) {
              setIsModalVisible(true);
            }
          }}
          disabled={!brandSelected}
        >
          <Text
            style={[
              modelDropdownStyles.dropdownText,
              !selectedModel && modelDropdownStyles.disabledText,
            ]}
          >
            {selectedModel?.modelName ||
              (!brandSelected
                ? t("ModelDropdown.placeholder", currentLanguage)
                : "Model")}
          </Text>

          <AntDesign
            name={isOpen ? "up" : "down"}
            style={modelDropdownStyles.downIcon}
          />
        </TouchableOpacity>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={modelDropdownStyles.modalContainer}>
            <View style={modelDropdownStyles.topBar}>
              <BackButton onPress={handleBack}></BackButton>

              <View style={modelDropdownStyles.searchContainer}>
                <Ionicons
                  name="search"
                  style={modelDropdownStyles.searchIcon}
                />

                <TextInput
                  style={[modelDropdownStyles.input]}
                  placeholderTextColor={
                    modelDropdownStyles.placeholderColor.color
                  }
                  onChangeText={handleSearch}
                  placeholder={t("DropdownScreen.Model", currentLanguage)}
                />
              </View>

              <TouchableOpacity
                onPress={handleSkip}
                style={modelDropdownStyles.link}
              >
                <Text style={modelDropdownStyles.linkText}>Skip</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={modelDropdownStyles.dropdownList}>
              {filteredModels.map((model) => (
                <TouchableOpacity
                  key={model.modelId}
                  onPress={() => {
                    handleModelSelect(model);
                    setIsModalVisible(false);
                  }}
                  style={modelDropdownStyles.dropdownListItem}
                >
                  <Text style={modelDropdownStyles.dropdownText}>
                    {model.modelName}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </CustomInput>
  );
};

export default ModelDropdown;

function filterModelsByBrandAndProduct(modelList, product, brand) {
  const result = [];
  for (let i in modelList) {
    if (
      modelList[i].brandId === brand.brandId &&
      modelList[i].productId === product.productId
    ) {
      result.push(modelList[i]);
    }
  }
  return result;
}
