import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

/*
    This button is created for buttons that i used to navigate. 
    The styling can be passed as a prop which makes this component 
    reusable all over the app.

    @path = the navigation path 
    @text = the text that will be displayed in button
    @location = param for passing location props if needed
*/

const NavgationButton = (({ path, text, location, buttonStyle, textStyle }) => {
    //access the navigation prop of the parent screen
    const navigation = useNavigation();
    
    function handelPress() {
        console.log(path)
        console.log(location)
        navigation.navigate(path, { location })
    }

    return (
        <TouchableOpacity onPress={() => handelPress()} style={buttonStyle}>
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    )
});

export default NavgationButton;