import React from "react";
import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles} from "../../styles/Stylesheet";
import menuItemsStyles from "./menuItemsStyles";

export const MenuItems = ({ msg, onPress, badge, style={} }) => {
  return (
    <View>
      <Pressable onPress={onPress}>
        <View style={[menuItemsStyles.menuItem, style]}>
          <View style={menuItemsStyles.menuItemContent}>
            <Text style={menuItemsStyles.menuItem_text}>{msg}</Text>
          </View>
          <View>
            {badge && badge > 0 && (
              <View style={menuItemsStyles.badgeContainer}>
                <Text style={menuItemsStyles.badgeText}>{badge}</Text>
              </View>
            )}
          </View>
          <View style={menuItemsStyles.Icon_container}>
            <AntDesign
              name="right"
              size={30}
              style={menuItemsStyles.menuItem_arrow}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
};
export default MenuItems;