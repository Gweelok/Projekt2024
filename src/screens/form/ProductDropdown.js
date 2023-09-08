import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Primarycolor1, Primarycolor3 } from "../../styles/Stylesheet";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons";

const ProductDropdown = ({ onProductSelect, categorySelected }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isValidationError, setIsValidationError] = useState(false);

    // Dummy products, replace with actual data
    const products = ["iPhone", "Samsung TV", "Dell Laptop", "Wall Clock", "iPad"];

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setIsOpen(false);
        setIsValidationError(false);
        if (onProductSelect) {
            onProductSelect(product);
        }
    };

  return (
    <View style={productDropdownContainer.container}>
      <TouchableOpacity
        style={[
          productDropdownContainer.dropdownButton,
          !categorySelected && productDropdownContainer.disabled,
        ]}
        onPress={() => {
          if (categorySelected) {
            setIsOpen(!isOpen);
            if (!selectedProduct) {
              setIsValidationError(true);
            }
          }
        }}
        disabled={!categorySelected}>
        <Text style={productDropdownContainer.dropdownText}>
          {selectedProduct ||
            (!categorySelected
              ? t("ProductDropdown.selectProduct", currentLanguage)
              : "Product")}
        </Text>
        <AntDesign name={isOpen ? "caretup" : "caretdown"} size={20} />
      </TouchableOpacity>

      {isOpen && (
        <View style={productDropdownContainer.dropdownList}>
          {products.map((product) => (
            <TouchableOpacity
              key={product}
              onPress={() => handleProductSelect(product)}
              style={productDropdownContainer.dropdownListItem}>
              <Text style={productDropdownContainer.dropdownText}>
                {product}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
    );
}

const productDropdownContainer = {
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
    backgroundColor: "#f0f0f0",
  },
};

export default ProductDropdown;
