import { Dimensions, Image, Text, TouchableOpacity, View, } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { t, useLanguage } from "../../../languages/LanguageHandler";

import uploadImageStyle from "./imageUploadStyles";

import CustomInput from "../../CustomInput/CustomInput";
import RBSheet from "react-native-raw-bottom-sheet";
import { Permissions } from "../../../utils/Permissions";

const ImageUpload = ({ onImageSelect, data }) => {
  const [image, setImage] = useState(data || null);
  const [hasPermission, setHasPermission] = useState(null);
  const imagePickerBottomSheetRef = useRef();

  useEffect(() => {
    Permissions.getCamera().then(() => {
      setHasPermission(true)
    }).catch(() => {
      setHasPermission(false)
    })
  }, []);
  const { currentLanguage } = useLanguage(); // Move the hook inside the functional component
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: true,
      //   aspect: [4, 3],
      quality: 1,
    });
    if (onImageSelect) {
      onImageSelect(result.assets[0]);
    }
    if (!result.canceled) {
      if (result.assets[0]?.type != "video") {
        setImage(result.assets[0].uri);
        imagePickerBottomSheetRef.current.close();
      }
    }
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: true,
      //   aspect: [4, 3],
      quality: 1,
    });
    if (onImageSelect) {
      onImageSelect(result.assets[0]);
    }
    if (!result.canceled) {
      if (result.assets[0]?.type != "video") {
        setImage(result.assets[0].uri);
        imagePickerBottomSheetRef.current.close();
      }
    }
  };
  return (
    <CustomInput optionalMarginBottom>

      <View style={uploadImageStyle.imageLabelContainer}>

        <Text style={uploadImageStyle.imageLabel}>
          {t("ImageUpload.chooseImage", currentLanguage)}
        </Text>

        <Text style={uploadImageStyle.optional}>
          ({t("AccountSettingsScreen.Optional", currentLanguage)})
        </Text>

      </View>

      <View>

        {!image ? (

          <TouchableOpacity
            onPress={() => {
              imagePickerBottomSheetRef.current.open();
            }}
            style={uploadImageStyle.UploadImageContainer}
          >
            
            <View style={uploadImageStyle.UploadDescription}>
              <Ionicons name="images-outline" style={uploadImageStyle.imgIcon} />

              <Text style={uploadImageStyle.uploadText}>
                {t("UpdroppForm.uploadText", currentLanguage)}
              </Text>
            </View>

          </TouchableOpacity>

        ) : (

          <View>

            <Ionicons
              onPress={() => {
                setImage(null);
                if (onImageSelect) {
                  onImageSelect(null)
                }
              }}
              name="close-outline"
              style={uploadImageStyle.cancelIcon}
            />
            <Image source={{ uri: image }} style={uploadImageStyle.imageSize} />

          </View>

        )}

      </View>

      <RBSheet
        ref={imagePickerBottomSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={uploadImageStyle.RBsheetHeight.height}
        render
        customStyles={uploadImageStyle.customStyle}
      >

        <View style={uploadImageStyle.chooseAction}>
          <Text style={uploadImageStyle.galleryBottomText}>
            {t("UpdroppForm.chooseAction", currentLanguage)}
          </Text>
        </View>

        <View style={uploadImageStyle.iconSheet}>

          <TouchableOpacity style={uploadImageStyle.iconConatiner} onPress={openCamera}>

            <Ionicons style={uploadImageStyle.icon} name="camera-outline" />

            <Text style={uploadImageStyle.actionText}>
              {t("UpdroppForm.camera", currentLanguage)}
            </Text>

          </TouchableOpacity>

          <TouchableOpacity style={uploadImageStyle.iconConatiner} onPress={pickImage}>

            <Ionicons style={uploadImageStyle.icon} name="images-outline" />

            <Text style={uploadImageStyle.actionText}>
              {t("UpdroppForm.gallery", currentLanguage)}
            </Text>

          </TouchableOpacity>

        </View>

      </RBSheet>

    </CustomInput>
  );
};

export default ImageUpload;

