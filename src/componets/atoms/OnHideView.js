import { View } from "react-native";

const OnHideView = ({children, hide}) => (
    <View style={hide ? {width: 0, height: 0} : null}>
        {children}
    </View>
)

export default OnHideView