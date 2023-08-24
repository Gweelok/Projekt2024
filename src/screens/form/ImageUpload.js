import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import { Primarycolor1, UploadImage } from "../../styles/Stylesheet";

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const { currentLanguage } = useLanguage(); // Move the hook inside the functional component

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //   allowsEditing: true,
      //   aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      if (result.assets[0]?.type != "video") {
        setImage(result.assets[0].uri);
      }
    }
  };

  // This function will be called when we want to store the selected image on firebase or database
  const uploadImageToDatabase = async () => {};

  return (
    <View>
      {!image ? (
        <TouchableOpacity
          onPress={pickImage}
          style={UploadImage.UploadImageContainer}
        >
          <View style={UploadImage.UploadDescription}>
            <Ionicons name="images-outline" size={30} color={Primarycolor1} />

            <Text style={UploadImage.uploadText}>
              {t("UpdroppForm.uploadText", currentLanguage)}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View>
          <Ionicons
            onPress={() => {
              setImage(null);
            }}
            name="close-outline"
            size={30}
            color="white"
            style={UploadImage.cancelIcon}
          />
          <Image source={{ uri: image }} style={UploadImage.imageSize} />
        </View>
      )}
    </View>
  );
};

export default ImageUpload;
