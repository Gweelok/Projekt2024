import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Primarycolor1, Primarycolor3, styles,  styles as stylesGlobal } from "../../styles/Stylesheet";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { AntDesign } from "@expo/vector-icons";
import CustomInput from "../../componets/atoms/CustomInput 2";
import { getAllBrands } from "../../utils/Repo";


const BrandDropdown = ({ onBrandSelect, productSelected, data }) => {
    const { currentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(data ||null);
    const ITEM_HEIGHT = 35;
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
    };

    return (
        <CustomInput optionalMarginBottom={1}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[stylesGlobal.formLabel, { marginLeft: 0, marginTop: 15 }]}>
            {t("BrandDropdown.selectBrand", currentLanguage)}
          </Text>
          <Text style={[stylesGlobal.optionalText,{marginLeft: 5, marginTop: 5 }]}>
    ({t("AccountSettingsScreen.Optional", currentLanguage)})
    </Text>
    </View>

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
                <Text style={[brandDropdownContainer.dropdownText, !selectedBrand && {color: "rgba(28, 75, 61, 0.4)"}]}>
                {selectedBrand?.brandName || (!productSelected ? t("BrandDropdown.placeholder", currentLanguage) : "Brand")}
                </Text>
                <AntDesign name={isOpen ? "up" : "down"} size={30} style={styles.menuItem_arrow} />
            </TouchableOpacity>
            {isOpen && (
                <ScrollView style={[brandDropdownContainer.dropdownList]}>
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
};

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

export default BrandDropdown;
