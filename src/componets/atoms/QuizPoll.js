import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import * as style from "../../styles/Stylesheet";
import PollChart from "./PollChart";
import Quiz from "./Quiz";
import { useLanguage, t } from "../../Languages/LanguageHandler";

const QuizPoll = () => {
  const [chartVisible, setChartVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Start with the first question
  const [selectedOption, setSelectedOption] = useState(null);
  const { currentLanguage, setLanguage } = useLanguage();

  const Questions = [
    {
      question: t("PollQuestions.Poll1Question1", currentLanguage),
      type: "poll",
      options: [
        { text: "A) 0 ", responses: 15 },
        { text: "B) 1-3 ", responses: 30 },
        { text: "C) 4-6 ", responses: 3 },
        { text: "D) 7+ ", responses: 55 },
      ],
    },
    {
      question: t("QuizQuestions.Quiz1Question1", currentLanguage),
      type: "quiz",
      options: [
        {
          text: t("QuizQuestions.Quiz1Option1", currentLanguage),
          isCorrect: false,
        },
        {
          text: t("QuizQuestions.Quiz1Option2", currentLanguage),
          isCorrect: false,
        },
        {
          text: t("QuizQuestions.Quiz1Option3", currentLanguage),
          isCorrect: true,
        },
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
