import { View } from "react-native"
import { useState, useEffect } from "react"

import UptainerInfo from "./UptainerInfo"
import UptainerTaskList from "./UptainerTaskList"
import NavigationButton from "../atoms/NavigationButton"

import { createUptainerTaskAnswers } from "../../utils/Repo"
import { Buttons } from "../../styles/styleSheet"

const UptainerContent = ({ location }) => {
    const solvedButtonText = 'Task Solved';
    const navigationPath = 'ServiceAdminMain';
    const dataTest = ['is the Uptainer undamaged?', 'is the Uptainer clean?', 'is the Uptainer organized?',];

    const [isSolved, setIsSolved] = useState(false);
    const [newData, setData] = useState(dataTest.map((task) => newTask = {
        name: task,
        pressedYes: false,
        pressedNo: false,
    }))

    //function for creating data about answers for database
    async function createTaskAnswersData(data, uptainerId) {
        const now = new Date().toLocaleString();
        
        const taskAnswers = data.map(task => ({
            task: task.name,
            answer: task.pressedYes ? "YES" : (task.pressedNo ? "NO" : null)
        }));
    
        return {
            uptainerId: uptainerId,
            date: now,
            taskAnswers: taskAnswers
        };
    }
    

    useEffect(() => {
        const allTasksSolved = newData.every(task => task.pressedYes || task.pressedNo);
        setIsSolved(allTasksSolved);
    })

    async function handleConfirm() {
        const answersToDatabase = await createTaskAnswersData(newData, location.uptainerId)
        console.log(answersToDatabase)
        createUptainerTaskAnswers(answersToDatabase)
    };

    return (
        <View>
            <UptainerInfo location={location}></UptainerInfo>

            <UptainerTaskList location={location} newData={newData} setData={setData}></UptainerTaskList>

            <NavigationButton
                path={navigationPath}
                text={solvedButtonText}
                location={location}
                buttonStyle={Buttons.main_button}
                textStyle={Buttons.main_buttonText}
                callback={handleConfirm}
            />
        </View>
    )
}


export default UptainerContent