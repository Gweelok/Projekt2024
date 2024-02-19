// SharedContext.js
import React, { createContext, useState } from 'react';

const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
  const [isSolved, setIsSolved] = useState({
    overview: false,
    reportedItems: false,
    uptainerCondition: false,
  });

  const handleOverviewSolved = () => setIsSolved({ ...isSolved, overview: true });
  const handleReportedItemsSolved = () => setIsSolved({ ...isSolved, reportedItems: true });
  const handleUptainerConditionSolved = () => setIsSolved({ ...isSolved, uptainerCondition: true });


  return (
    <TaskContext.Provider value={{ isSolved, setIsSolved }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskContextProvider };
