import { TouchableOpacity, View, StyleSheet, ScrollView, Text, RefreshControl } from "react-native"
import { windowHeight, windowWidth } from "../../utils/Dimensions"
//import UptainerContent from "../components/Uptainer/UptainerContent"
import { Primarycolor1, styles, Buttons } from "../../styles/styleSheet"
import { useState } from "react"
import {createUptainerTaskAnswers} from "../../utils/Repo"

const UptainerTaskList = ({ location }) => {

    const dataTest = ['is the Uptainer undamaged?', 'is the Uptainer clean?', 'is the Uptainer organized?', ];
    const [formvalid, setForm] = useState(true)
    const [newData, setData] = useState(dataTest.map((task) => newTask = {
        name: task,
        pressedYes: false,
        pressedNo: false,
    }))

    handlePressYes=(cur)=>{       
        cur.pressedYes = true
        cur.pressedNo = false
        const result = [...newData]
        setData(result)
        setForm(checkNumberAnswers(result))        
    };
    handlePressNo=(cur)=>{        
        cur.pressedYes = false
        cur.pressedNo = true
        const result = [...newData]
        setData(result)
        setForm(checkNumberAnswers(result))        
    };
    handlePressConfirm=()=>{
        const answersToDatabase = createTaskAnswersData(newData, location.uptainerId)
        console.log(answersToDatabase)
        createUptainerTaskAnswers(answersToDatabase)
        const result = newData.map((task) =>  newTask = {
            name: task.name,
            pressedYes: false,
            pressedNo: false,
        
        })
        setData(result)
    };
    return (
        <View>
            <ScrollView
            showsVerticalScrollIndicator={false}
            style={{height: windowHeight*0.8}}
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
            <TouchableOpacity
                disabled={formvalid}
                onPress={() => handlePressConfirm()}
                style={Buttons.main_button}>
                    <Text style={Buttons.main_buttonText}>Task solved</Text>
            </TouchableOpacity>
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

//function for checking number of answers
function checkNumberAnswers(tasks) {
    let numberAnswers = 0
    for (let index in tasks) {
        if ((tasks[index].pressedYes) || (tasks[index].pressedNo)) {
            numberAnswers += 1
        }
    }
    if (numberAnswers == tasks.length) {
        return false
    }
    else {
        return true
    }
}

//function for creating data about answers for database
function createTaskAnswersData (data, uptainerId) {    
    const now = new Date();
    const answers = data.map((task) => answer = {
        task: task.name,
        answer: checkAnswer(task)
    })
    const result = {
        uptainerId: uptainerId,
        date: now.toLocaleString(),
        taskAnswers: answers,
    };
    return result
}

//function for returm YES/NO
function checkAnswer (task) {
    if (task.pressedYes) {
        return "YES"
    }
    if (task.pressedNo) {
        return "NO"
    }
}