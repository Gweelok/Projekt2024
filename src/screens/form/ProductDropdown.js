import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Primarycolor1, Primarycolor3, styles as stylesGlobal } from "../../styles/Stylesheet";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons";
import { getAllProducts } from "../../utils/Repo";

const ProductDropdown = ({ onProductSelect, categorySelected, data }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(data || null);
    const [isValidationError, setIsValidationError] = useState(false);
    const ITEM_HEIGHT = 39;
    const [products, setProducts] = useState(products);


    useEffect(() => {
      const fetchData = async () => {
      try {
        const productsList = await getAllProducts();
      setProducts(productsList);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    
    fetchData();// Fetch data when component mounts
  }, []);

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
            <Text style={[stylesGlobal.formLabel, { marginLeft: 0, marginTop:15 }]}>
                {t("ProductDropdown.selectProduct", currentLanguage)}
            </Text>
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
                disabled={!categorySelected}
            >
                <Text style={[productDropdownContainer.dropdownText, !selectedProduct && {color: "rgba(28, 75, 61, 0.4)"}]}>
                    {selectedProduct?.productName || (!categorySelected ? t("ProductDropdown.placeholder", currentLanguage) : "Product")}
                </Text>
                <AntDesign
                    name={isOpen ? "caretup" : "caretdown"}
                    size={20}
                />
            </TouchableOpacity>

            {isOpen && (
                <ScrollView style={productDropdownContainer.dropdownList}>
                    {products.map((product) => (
                        <TouchableOpacity
                            key={product.productId}
                            onPress={() => handleProductSelect(product)}
                            style={productDropdownContainer.dropdownListItem}
                        >
                            <Text style={productDropdownContainer.dropdownText}>{product.productName}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            {isValidationError && !selectedProduct && (
                <Text style={productDropdownContainer.validationErrorText}></Text>
            )}
        </View>
    );
};

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
