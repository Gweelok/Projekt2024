import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";

const navigationBarStyles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: indexStyles.metrics.container.navbar.bottom,
    right: indexStyles.metrics.container.navbar.right,
    left: indexStyles.metrics.container.navbar.left,
    elevation: indexStyles.metrics.container.navbar.elevation,
    height: indexStyles.metrics.container.navbar.height,
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: indexStyles.colorPalette.Primarycolor2,
    borderWidth: indexStyles.metrics.container.navbar.borderWidth,
  },
  badgeContainer: {
    position: "absolute",
    right: indexStyles.metrics.container.navbarBadge.right,
    top: indexStyles.metrics.container.navbarBadge.top,
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    borderRadius: indexStyles.metrics.container.navbarBadge.borderRadius,
    width: indexStyles.metrics.container.navbarBadge.width,
    height: indexStyles.metrics.container.navbarBadge.height,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: indexStyles.colorPalette.Primarycolor3,
    fontSize: indexStyles.typography.fontSize.body8,
    fontWeight: indexStyles.typography.fontWeight.bold,
  },
  icon: {
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.metrics.icon.navbar.size,
  },
  iconContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default navigationBarStyles;
