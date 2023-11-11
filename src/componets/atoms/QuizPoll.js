import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";
import * as style from "../../styles/Stylesheet";
import PollChart from "./PollChart";

const QuizPoll = () => {
  const [Questions, setQuestions] = useState([
    {
      question: "How many electronic devices have you bought the last year?",
      type: "poll",
      options: [
        "A) 0 ",
        "B) 1-3",
        "C) 4-6",
        "D) 7+",
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
      // Handle poll selection
      // You can record the user's response or simulate data for testing
    }
  };

  // Mock poll data for testing
  const mockPollData = {
    "A) 0": 10,       // Simulate 10 responses for option A
    "B) 1-3": 20,     // Simulate 20 responses for option B
    "C) 4-6": 15,     // Simulate 15 responses for option C
    "D) 7+": 5,       // Simulate 5 responses for option D
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
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {/* Render the PollChart component */}
      {Questions[currentQuestionIndex].type === "poll" && (
        <PollChart pollData={mockPollData} />
      )}
    </View>
  );
};

export default QuizPoll;