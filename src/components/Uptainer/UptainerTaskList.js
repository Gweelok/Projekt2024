import { TouchableOpacity, View, StyleSheet, ScrollView, Text } from "react-native"

import { windowHeight } from "../../utils/Dimensions"
import { Primarycolor1, styles } from "../../styles/styleSheet"

const UptainerTaskList = ({ newData, setData }) => {

    handlePressYes = (cur) => {
        cur.pressedYes = true
        cur.pressedNo = false
        const result = [...newData]
        setData(result)
    };

    handlePressNo = (cur) => {
        cur.pressedYes = false
        cur.pressedNo = true
        const result = [...newData]
        setData(result)
    };

    return (
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ height: windowHeight * 0.8 }}
            >
                {newData.map((cur) => (
                    <View style={styleLocal.row}>

                        <View style={styleLocal.textBox}>
                            <Text style={styles.article_text}>
                                {cur.name}
                            </Text>
                        </View>

                        <View style={styleLocal.row}>
                            <TouchableOpacity
                                onPress={() => handlePressYes(cur)}
                                style={[styleLocal.buttons,
                                cur.pressedYes === true
                                    ? styleLocal.buttonPressedY
                                    : '']}>
                                <Text style={[styles.article_text,
                                cur.pressedYes === true
                                    ? styleLocal.textPressed
                                    : '']}>Y</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handlePressNo(cur)}
                                style={[styleLocal.buttons,
                                cur.pressedNo === true
                                    ? styleLocal.buttonPressedN
                                    : '']}>
                                <Text style={[styles.article_text,
                                cur.pressedNo === true
                                    ? styleLocal.textPressed
                                    : '']}>N</Text>
                            </TouchableOpacity>
                        </View>

                    </View>))}

            </ScrollView>

        </View>
    )
}

const styleLocal = StyleSheet.create({
    textBox: {
        justifyContent: 'center',
        alignItems: "center",
    },
    buttons: {
        justifyContent: 'center',
        alignItems: "center",
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 20,
        borderWidth: 3,
        borderColor: Primarycolor1,
        width: 30,
        height: 30,
    },
    buttonPressedY: {
        backgroundColor: Primarycolor1,
    }
    ,
    buttonPressedN: {
        backgroundColor: "#8b0000",
        borderColor: "#8b0000",
    },
    textPressed: {
        color: "white"
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    }
})

export default UptainerTaskList