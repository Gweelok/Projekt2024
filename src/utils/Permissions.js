import * as Location from "expo-location";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

export const Permissions = {
  getLocation: async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status == "granted") {
      const loc = await Location.getCurrentPositionAsync({})
      return loc.coords
    } else {
      throw ("")
    }
  },
  getCamera: async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status != "granted") {
      throw ("")
    }
  }
}