import * as Location from "expo-location";

export const Permissions = {
  getLocation: async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status == "granted") {
      const loc = await Location.getCurrentPositionAsync({})
      return loc.coords
    } else {
      throw ("")
    }
  }
}