import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

/*
    This button is created for buttons that i used to navigate. 
    The styling can be passed as a prop which makes this component 
    reusable all over the app.

    @path = the navigation path 
    @text = the text that will be displayed in button
    @param = param for passing props if needed

    (Optional)
    @callback = pass function to button that will be executed before navigating
*/

const NavgationButton = (({ disabled ,path, text, param, buttonStyle, textStyle, callback }) => {
    //access the navigation prop of the parent screen
    const navigation = useNavigation();
    
    function handlePress() {
        if (callback) {
            callback();
        }
        navigation.navigate(path, { param })
    }

    return (
        <TouchableOpacity disabled={disabled} onPress={() => handlePress()} style={buttonStyle}>
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    )
});

export default NavgationButton;