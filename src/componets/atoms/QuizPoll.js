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
        "A) The planet's changing weather patterns",
        "B) Earth's warming due to pollution",
        "C) Global warming caused by human actions",
      ],
      correctAnswer: "C) Global warming caused by human actions",
    },
  ];

  const handleOptionSelect = (option) => {
    const currentQuestion = Questions[currentQuestionIndex];

    if (currentQuestion.type === "quiz") {
      const isCorrect = currentQuestion.correctAnswer === option; // Check if the selected option is the correct answer
      setSelectedOption({ option, isCorrect });
    } else if (currentQuestion.type === "poll") {
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
        <Quiz
          question={currentQuestion}
          handleOptionSelect={handleOptionSelect}
          selectedOption={selectedOption}
        />
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
