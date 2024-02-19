// SharedContext.js
import React, { createContext, useState } from 'react';

const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
  const [isSolved, setIsSolved] = useState({
    overview: false,
    reportedItems: false,
    uptainerCondition: false,
  });

  const dataTest = ['is the Uptainer undamaged?', 'is the Uptainer clean?', 'is the Uptainer organized?',];

  const uptainerTaskList = dataTest.map((task) => newTask = {
    name: task,
    pressedYes: false,
    pressedNo: false,
});


  const handleOverviewSolved = () => setIsSolved({ ...isSolved, overview: true });
  const handleReportedItemsSolved = () => setIsSolved({ ...isSolved, reportedItems: true });
  const handleUptainerConditionSolved = () => setIsSolved({ ...isSolved, uptainerCondition: true });


  return (
    <TaskContext.Provider value={{ isSolved, uptainerTaskList, setIsSolved }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskContextProvider };
