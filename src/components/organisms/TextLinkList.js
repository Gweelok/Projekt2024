import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import TextLink from "../molecules/TextLink";
import Spacer from "../atoms/Spacer";

const TextLinkList = ({ textValue, location }) => {
    const navigation = useNavigation();
    handlePress=()=>{
        console.log('pressed')
        console.log(location)       
        navigation.navigate("Uptainer", { location: location });        
    };
    return (
        <View style={style.container}>

            <TextLink textValue={textValue.overview}></TextLink>

            <Spacer height={25}></Spacer>

            <TextLink textValue={textValue.items}></TextLink>

            <Spacer height={25}></Spacer>

            <TouchableOpacity
            onPress={handlePress}
            >
            <TextLink textValue={textValue.condition}></TextLink>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        marginTop: 40,
        width: "75%"
    },
    textMargin: {
        marginBottom: 20
    }
})

export default TextLinkList 