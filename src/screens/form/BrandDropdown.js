import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Primarycolor1, Primarycolor3 } from "../../styles/Stylesheet";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons";
import CustomInput from "../../componets/atoms/CustomInput 2";
import { getAllBrands } from "../../utils/Repo";


// data is used to set the initial value of the brand dropdown
const BrandDropdown = ({ onBrandSelect, productSelected, data }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(data ||null);
    const [isValidationError, setIsValidationError] = useState(false);
    const ITEM_HEIGHT = 40;
    const [brands, setBrands] = useState(brands);

    useEffect(() => {
        const fetchData = async () => {
        try {
          const brandsList = await getAllBrands();
        setBrands(brandsList);
        } catch (error) {
          console.log('Error:', error);
        }
      };
      
      fetchData();// Fetch data when component mounts
    }, []);

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand);
        setIsOpen(false);
        if (onBrandSelect) {
            onBrandSelect(brand);
        }
    }

    return (
        <CustomInput showStar={true} optionalMarginBottom={1}>

        <View style={brandDropdownContainer.container}>
            <TouchableOpacity
                style={[
                  brandDropdownContainer.dropdownButton,
                  !productSelected && brandDropdownContainer.disabled
                ]}
                onPress={() => {
                    if (productSelected) {
                        setIsOpen(!isOpen);
                    }
                }}
                disabled={!productSelected}
            >
                <Text style={brandDropdownContainer.dropdownText}>
                    {selectedBrand?.brandName || (!productSelected ? t("BrandDropdown.selectBrand", currentLanguage) : "Brand")}
                </Text>
                <AntDesign
                    name={isOpen ? "caretup" : "caretdown"}
                    size={20}
                />
            </TouchableOpacity>
            {isOpen && (
                <ScrollView style={[brandDropdownContainer.dropdownList, {height: ITEM_HEIGHT * 5.5}]}>
                    {brands.map(brand => (
                        <TouchableOpacity
                            key={brand.brandId}
                            onPress={() => handleBrandSelect(brand)}
                            style={brandDropdownContainer.dropdownListItem}
                        >
                            <Text style={brandDropdownContainer.dropdownText}>{brand.brandName}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
     </CustomInput>
    );
}

// Brand dropdown styles
const brandDropdownContainer = {
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

export default BrandDropdown;
