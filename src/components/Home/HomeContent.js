import { Pressable, View, Text, StyleSheet } from "react-native"
import { useState } from "react"
import { Primarycolor1, Primarycolor2 } from "../../styles/styleSheet"
import { windowWidth } from "../../utils/Dimensions"
import ServiceAdminContent from "./ServiceAdminContent"
const HomeContent = ({navigation}) => {
    const [showServiceAdmin, setShowServiceAdmin] = useState(false);

    return (
        <View style={style.container}>

            {!showServiceAdmin && (
                <View style={style.routes}>

                    <Pressable style={style.buttons}>
                        <Text style={style.buttonsText}>Admin Panel</Text>
                    </Pressable>

                    <Pressable style={style.buttons} onPress={() => setShowServiceAdmin(true)}>
                        <Text style={style.buttonsText}>Service Admin</Text>
                    </Pressable>

                </View>
            )}

            {showServiceAdmin && <ServiceAdminContent navigation={navigation}/>}
            
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,

    },
    buttons: {
        marginTop: 100,
        padding: 20,
        backgroundColor: Primarycolor2,
        width: windowWidth * 0.6

    },
    buttonsText: {
        color: Primarycolor1,
        textAlign: 'center',
        fontSize: 20
    },
    routes: {
        marginLeft: windowWidth * 0.2
    }
})

export default HomeContent