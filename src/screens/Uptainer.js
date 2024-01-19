import { View, StyleSheet, ScrollView, Text, RefreshControl } from "react-native"
import { windowHeight, windowWidth } from "../utils/Dimensions"
import UptainerContent from "../components/Uptainer/UptainerContent"

const Uptainer = ({route}) => {
    const { location } = route.params;
    data = ['Task1', 'Task2', 'Task3', 'Task4', 'Task5', 'Task6', 'Task7', 'Task8', 'Task9', 'Task10', 'Task11', 'Task12', ];

    return (
        <View 
        style={style.container}
        >     
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <UptainerContent location={location}></UptainerContent>
                {data.map((cur) => (
                    <View>
                        <Text style={style.textTask}>
                            {cur}
                        </Text>
                    </View>))}
            
            </ScrollView>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        paddingTop: 50,
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
    },
    textTask: {
        marginTop: 40, 
        //height: 30,
        fontSize: 30,
    }
})

export default Uptainer