import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import * as style from "../../styles/Stylesheet";
import PollChart from "./PollChart";
import Quiz from "./Quiz";

const QuizPoll = () => {
  const [chartVisible, setChartVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Start with the first question
  const [selectedOption, setSelectedOption] = useState(null);
  const Questions = [
    {
      question: "How many electronic devices have you bought the last year?",
      type: "poll",
      options: [
        { text: "A) 0 ", responses: 15 },
        { text: "B) 1-3 ", responses: 30 },
        { text: "C) 4-6 ", responses: 3 },
        { text: "D) 7+ ", responses: 55 },
      ],
    },
    {
      question: "What is climate change?",
      type: "quiz",
      options: [
        { text: "A) The planet's changing weather patterns", isCorrect: false },
        { text: "B) Earth's warming due to pollution", isCorrect: false },
        { text: "C) Global warming caused by human actions", isCorrect: true },
      ],
    },
  ];

  const handleOptionSelect = (option) => {
    const currentQuestion = Questions[currentQuestionIndex];

    if (currentQuestion.type === "poll") {
      // Show the chart when the poll option is pressed
      setChartVisible(true);
    }
  };

  const handleNextQuestion = () => {
    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);

    setSelectedOption(null);

    setChartVisible(false);
  };

  //current question
  const currentQuestion = Questions[currentQuestionIndex];

  return (
    <View>
      {currentQuestion.type === "quiz" ? (
        <Quiz question={currentQuestion} />
      ) : (
        <View>
          <PollChart
            pollData={currentQuestion}
            handleOptionSelect={handleOptionSelect}
            chartVisible={chartVisible}
          />
          <Button title="Next Question" onPress={handleNextQuestion} />
        </View>
      )}
    </View>
  );
};

export default QuizPoll;
