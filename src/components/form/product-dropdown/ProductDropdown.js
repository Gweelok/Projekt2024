import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";

import productDropdownStyles from "./productDropdownStyles";

import { useLanguage, t } from "../../../languages/LanguageHandler";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { getAllProducts } from "../../../utils/Repo/Products";
import BackButton from "../../BackButton/BackButton"; // Make sure to import the BackButton component

const ProductDropdown = ({
  onProductSelect,
  categorySelected,
  data,
  setIsBrandDropdownVisible,
  isBrandDropdownVisible,
  onSkip,
  isVisible,
  category,
}) => {
  const { currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(data || null);
  const [isValidationError, setIsValidationError] = useState(false);
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    setIsModalVisible(isVisible);
  }, [isVisible]);


  useEffect(() => {
    const fetchData = async () => {
      const productsList = await getAllProducts()

      setProducts(productsList)
      setFilteredProducts(products)
    }

    fetchData()
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (category) {
          const filteredProducts = filterProductsByCategory(products, category)
          setFilteredProducts(filteredProducts);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    if (products) {
      fetchData();
    }

  }, [category, products]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsOpen(false);
    setIsValidationError(false);
    if (onProductSelect) {
      onProductSelect(product);
    }
    setIsBrandDropdownVisible(true);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleBack = () => {
    setIsModalVisible(false);
  };
  const handleSkip = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={productDropdownStyles.container}>
      <Text style={productDropdownStyles.dropDownLabel}>
        {" "}
        {t("ProductDropdown.selectProduct", currentLanguage)}{" "}
      </Text>

      <TouchableOpacity
        style={[
          productDropdownStyles.dropdownButton,
          !categorySelected && productDropdownStyles.disabled,
        ]}
        onPress={() => {
          if (categorySelected) {
            setIsModalVisible(true);
          }
        }}
        disabled={!categorySelected}
      >
        <Text
          style={[
            productDropdownStyles.dropdownText,
            !selectedProduct && productDropdownStyles.disabledColor,
          ]}
        >
          {selectedProduct
            ? selectedProduct.productName
            : t("ProductDropdown.placeholder", currentLanguage)}
        </Text>

        <AntDesign
          name={isOpen ? "up" : "down"}
          style={productDropdownStyles.downIcon}
        />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={productDropdownStyles.modalContainer}>
          <View style={productDropdownStyles.topBar}>
            <BackButton onPress={handleBack} />

            <View style={productDropdownStyles.searchContainer}>
              <Ionicons
                name="search"
                style={productDropdownStyles.searchIcon}
              />
              <TextInput
                style={[productDropdownStyles.input]}
                placeholderTextColor={
                  productDropdownStyles.placeholderColor.color
                }
                onChangeText={handleSearch}
                placeholder={t("DropdownScreen.Product", currentLanguage)}
              />
            </View>

            <TouchableOpacity
              onPress={handleSkip}
              style={productDropdownStyles.link}
            >
              <Text style={productDropdownStyles.linkText}>Skip</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={productDropdownStyles.dropdownList}>
            {filteredProducts.map((product) => (
              <TouchableOpacity
                key={product.productId}
                onPress={() => {
                  handleProductSelect(product);
                  setIsModalVisible(false);
                }}
                style={productDropdownStyles.dropdownListItem}
              >
                <Text style={productDropdownStyles.dropdownText}>
                  {product.productName}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ProductDropdown;

function filterProductsByCategory(productList, category) {
  const result = [];
  for (let i in productList) {
    if (productList[i].categoryId === category.categoryId) {
      result.push(productList[i]);
    }
  }
  return result;
}
