import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as style from "../../styles/Stylesheet";
import PollChart from "./PollChart";

const QuizPoll = () => {
  const [chartVisible, setChartVisible] = useState(false);
  const [Questions, setQuestions] = useState([
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
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    const currentQuestion = Questions[currentQuestionIndex];

    if (currentQuestion.type === "quiz") {
      if (option === currentQuestion.correctAnswer) {
        setSelectedOption({ option, isCorrect: true });
      } else {
        setSelectedOption({ option, isCorrect: false });
      }
    } else if (currentQuestion.type === "poll") {
      setChartVisible(true);
    }
  };

  const styles = {
    optionButton: {
      padding: 10,
      margin: 5,
      backgroundColor: "lightgray",
    },
    optionText: {
      fontSize: 14,
    },
    container: {
      marginTop: 15,
      width: "100%",
      backgroundColor: "#fff",
      marginBottom: 15,
    },
    questionText: {
      color: style.Primarycolor1,
      fontSize: 18,
      fontFamily: "space-grotesk-Medium",
      fontWeight: "bold",
    },
  };

  if (chartVisible) {
    return (
      <View>
        <PollChart pollData={Questions[0]} />
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.questionText}>
          {Questions[currentQuestionIndex].question}
        </Text>
        {Questions[currentQuestionIndex].options.map((option, optionIndex) => (
          <TouchableOpacity
            key={optionIndex}
            onPress={() => handleOptionSelect(option)}
            style={[
              styles.optionButton,
              selectedOption &&
                selectedOption.option === option && {
                  backgroundColor: selectedOption.isCorrect
                    ? style.Primarycolor1 // Correct answer color
                    : "#AA0000", // Wrong answer color
                },
            ]}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
};

export default QuizPoll;
