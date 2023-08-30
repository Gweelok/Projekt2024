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
import { Primarycolor1 } from "../../styles/Stylesheet";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
          style={UploadImageStyle.UploadImageContainer}
        >
          <View style={UploadImageStyle.UploadDescription}>
            <Ionicons name="images-outline" size={30} color={Primarycolor1} />

            <Text style={UploadImageStyle.uploadText}>
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
            style={UploadImageStyle.cancelIcon}
          />
          <Image source={{ uri: image }} style={UploadImageStyle.imageSize} />
        </View>
      )}
    </View>
  );
};

export default ImageUpload;

const UploadImageStyle = StyleSheet.create({
  UploadImageContainer: {
    padding: windowHeight / 12,
    // backgroundColor: "red",
    borderWidth: 3,
    borderColor: Primarycolor1,
    height: windowHeight / 4.5,
  },
  UploadDescription: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  imageSize: {
    padding: 50,
    // backgroundColor: "red",
    borderWidth: 3,
    borderColor: Primarycolor1,
    height: windowHeight / 4.5,
  },
  cancelIcon: {
    position: "absolute",
    zIndex: 999,
    // top: 20,
  },
  uploadText: {
    marginLeft: 10,
    color: Primarycolor1,
    fontWeight: "700",
    fontSize: 17,
  },
});
