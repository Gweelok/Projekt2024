import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Buttons } from "../../styles/Stylesheet";
import { t, useLanguage } from "../../languages/LanguageHandler";
import { Ionicons } from "@expo/vector-icons";
import draftCardStyles from "./draftCardStyles";

const DraftCard = ({
  props,
  navigation,
  onPress,
  onCancelPress,
  onDraftPress,
}) => {
  const { currentLanguage, setLanguage } = useLanguage();
  console.log("propsss", props);
  //below we used the props params to display
  return (
    <View style={draftCardStyles.container}>
      <TouchableOpacity
        style={draftCardStyles.draftBox}
        activeOpacity={draftCardStyles.draftBoxOpacity.opacity}
        onPress={onDraftPress}
      >
        <TouchableOpacity style={draftCardStyles.deleteIconContainer}>
          <Ionicons
            onPress={onCancelPress}
            name="close-outline"
            size={draftCardStyles.deleteIcon.size}
            color={draftCardStyles.deleteIcon.color}
          />
        </TouchableOpacity>

        <Image
          source={{ uri: props.imageUrl }}
          style={draftCardStyles.draftImage}
        />
        <View style={draftCardStyles.draftContent}>
          <Text style={draftCardStyles.product}>
            {props.product?.productName}
          </Text>
          <View style={draftCardStyles.brandModelContainer}>
            <Text
              style={draftCardStyles.brand}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.brand?.brandName}
              {props.model?.modelName ? "," : ""}
            </Text>
            {props.model?.modelName && (
              <Text
                style={draftCardStyles.model}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {props.model?.modelName}
              </Text>
            )}
          </View>
          <Text style={draftCardStyles.descriptionItemCondition}>
            {props.itemcondition}
          </Text>
          <Text style={draftCardStyles.description} numberOfLines={3}>
            {props.itemDescription}
          </Text>
        </View>
      </TouchableOpacity>
      <View>
        <Pressable onPress={onPress} style={draftCardStyles.scanButton}>
          <Text style={Buttons.main_buttonText}>
            {t("UpdroppForm.scanButton", currentLanguage)}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DraftCard;
