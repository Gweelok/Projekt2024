import * as Location from "expo-location";
import { BarCodeScanner } from "expo-barcode-scanner";

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
  getQRCamera: async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync()
    if (status != "granted") {
      throw ("")
    }
  }
}