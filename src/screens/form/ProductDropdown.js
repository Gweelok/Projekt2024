import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from "react-native";
import { Primarycolor1, Primarycolor3, styles, styles as stylesGlobal } from "../../styles/Stylesheet";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { getAllProducts } from "../../utils/Repo";
import BackButton from "../../componets/BackButton"; // Make sure to import the BackButton component

const ProductDropdown = ({ onProductSelect, data, setIsBrandDropdownVisible, isBrandDropdownVisible , onSkip, isVisible, }) => {
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
            try {
                const productsList = await getAllProducts();
                setProducts(productsList);
                setFilteredProducts(productsList);
            } catch (error) {
                console.log("Error:", error);
            }
        };

        fetchData();
    }, []);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setIsOpen(false);
        setIsValidationError(false);
        if (onProductSelect) {
            onProductSelect(product);
        }
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

    return (
        <View style={productDropdownContainer.container}>
            <Text style={[stylesGlobal.formLabel, { marginLeft: 0, marginTop: 15 }]}>
                {t("ProductDropdown.selectProduct", currentLanguage)}
            </Text>
            <TouchableOpacity
                style={productDropdownContainer.dropdownButton}
                onPress={() => {
                    setIsModalVisible(true);
                }}
            >
                <Text style={[productDropdownContainer.dropdownText, !selectedProduct && { color: "#8EA59E" }]}>
                    {selectedProduct ? selectedProduct.productName : t("ProductDropdown.placeholder", currentLanguage)}
                </Text>
                <AntDesign name={isOpen ? "up" : "down"} size={20} style={styles.menuItem_arrow} />
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={[productDropdownContainer.modalContainer, { height: '100%', width: '100%'}]}>
                    <View style={productDropdownContainer.topBar}>
                        <BackButton onPress={handleBack} />
                        <View style={productDropdownContainer.searchContainer}>
                            <Ionicons name="search" size={20} color={Primarycolor1} />
                            <TextInput
                                style={productDropdownContainer.input}
                                placeholderTextColor={Primarycolor1}
                                onChangeText={handleSearch}
                                placeholder={t('DropdownScreen.Product',currentLanguage)}
                            />
                        </View>

                    </View>
                    <ScrollView style={productDropdownContainer.dropdownList}>
                        {filteredProducts.map((product) => (
                            <TouchableOpacity
                                key={product.productId}
                                onPress={() => {
                                    handleProductSelect(product);
                                    setIsModalVisible(false);
                                }}
                                style={productDropdownContainer.dropdownListItem}
                            >
                                <Text style={productDropdownContainer.dropdownText}>{product.productName}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

const productDropdownContainer = {
    container: {
        flex: 1,
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
    modalContainer: {
        backgroundColor: "white",
        flex: 1,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 1,
        width: "80%",
        paddingLeft: 10,
    },
    input: {
        height: 40,
        width: "85%",
        marginLeft: 10,
    },
};

export default ProductDropdown;
