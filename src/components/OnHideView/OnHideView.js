import { View } from "react-native";
import onHideViewStyles from "./onHideViewStyles";

const OnHideView = ({ children, hide }) => (
  <View
    style={
      hide
        ? {
            width: onHideViewStyles.width,
            height: onHideViewStyles.height,
          }
        : null
    }
  >
    {children}
  </View>
);

export default OnHideView;
