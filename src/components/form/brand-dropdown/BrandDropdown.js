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
import BackButton from "../../BackButton/BackButton"; // Make sure to import this if used
import { getAllBrands } from "../../../utils/Repo/Brands";
import { useLanguage, t } from "../../../languages/LanguageHandler";

import brandDropdownContainer from "./brandDropdownStyles";
import { getAllModels } from "../../../utils/Repo/Models";

const BrandDropdown = ({ onBrandSelect, productSelected, data, isVisible, setIsVisible, onSkip, setIsModelDropdownVisible, shouldOpenBrandDropdown, product }) => {
  const { currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(data || null);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  useEffect(() => {
    if (shouldOpenBrandDropdown) {
      setIsModalVisible(true);
    }
  }, [shouldOpenBrandDropdown]);
  useEffect(() => {
    const fetchData = async () => {
      const brandsList = await getAllBrands()
      const modelsList = await getAllModels()

      setBrands(brandsList)
      setModels(modelsList)
      setFilteredBrands(brands)

    }

    fetchData()
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      if (product) {
        const filteredBrands = filterBrandsByProduct(models, brands, product)
        setFilteredBrands(filteredBrands)
      }
    };

    if (brands && models) {
      fetchData();
    }

  }, [product, brands, models]);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setIsOpen(false);
    if (onBrandSelect) {
      onBrandSelect(brand);
    }
    setIsModelDropdownVisible(true);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = brands.filter((brand) =>
      brand.brandName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBrands(filtered);
  };

  const handleBack = () => {
    setIsModalVisible(false);
  };
  const handleSkip = () => {
    setIsModalVisible(false);
  };

  return (
    <CustomInput optionalMarginBottom={1}>
      <View style={brandDropdownContainer.labelContainer}>
        <Text style={brandDropdownContainer.formLabel}>
          {t("BrandDropdown.selectBrand", currentLanguage)}
        </Text>
        <Text style={brandDropdownContainer.optionalText}>
          ({t("AccountSettingsScreen.Optional", currentLanguage)})
        </Text>
      </View>

      <View style={brandDropdownContainer.container}>
        <TouchableOpacity
          style={[
            brandDropdownContainer.dropdownButton,
            !productSelected && brandDropdownContainer.disabled,
          ]}
          onPress={() => {
            if (productSelected) {
              setIsModalVisible(true);
            }
          }}
          disabled={!productSelected}
        >
          <Text
            style={[
              brandDropdownContainer.dropdownText,
              !selectedBrand && { color: "#8EA59E" },
            ]}
          >
            {selectedBrand?.brandName ||
              (!productSelected
                ? t("BrandDropdown.placeholder", currentLanguage)
                : "Brand")}
          </Text>

          <AntDesign
            name={isOpen ? "up" : "down"}
            style={brandDropdownContainer.arrowIcon}
          />
        </TouchableOpacity>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={brandDropdownContainer.modalContainer}>
            <View style={brandDropdownContainer.topBar}>
              <BackButton onPress={handleBack}></BackButton>

              <View style={brandDropdownContainer.searchContainer}>
                <Ionicons
                  name="search"
                  style={brandDropdownContainer.searchIcon}
                />
                <TextInput
                  style={brandDropdownContainer.input}
                  placeholderTextColor={
                    brandDropdownContainer.placeholderColor.color
                  }
                  onChangeText={handleSearch}
                  placeholder={t("DropdownScreen.Brand", currentLanguage)}
                />
              </View>

              <TouchableOpacity
                onPress={handleSkip}
                style={brandDropdownContainer.link}
              >
                <Text style={brandDropdownContainer.linkText}>Skip</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={brandDropdownContainer.dropdownList}>
              {filteredBrands.map((brand) => (
                <TouchableOpacity
                  key={brand.brandId}
                  onPress={() => {
                    handleBrandSelect(brand);
                    setIsModalVisible(false);
                  }}
                  style={brandDropdownContainer.dropdownListItem}
                >
                  <Text style={brandDropdownContainer.dropdownText}>
                    {brand.brandName}
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

export default BrandDropdown;

function filterBrandsByProduct(modelsListTest, brandsListTest, product) {
  let result = [];
  let filteredBrandsId = [];
  for (let i in modelsListTest) {
    if (modelsListTest[i].productId === product.productId && !filteredBrandsId.includes(modelsListTest[i].brandId)) {
      filteredBrandsId.push(modelsListTest[i].brandId);
    }
  }
  const newfilteredBrandsId = Array.from(new Set(filteredBrandsId));
  for (let ii in brandsListTest) {
    if (newfilteredBrandsId.includes(brandsListTest[ii].brandId)) {
      result.push(brandsListTest[ii]);
    }
  }
  return result;
}
