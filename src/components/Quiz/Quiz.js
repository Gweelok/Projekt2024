import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import quizStyles from "./quizStyles";
import LottieView from "lottie-react-native";

const Quiz = ({ questionData }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const animationRef = useRef(null);

  const styleButtonOnClick = (option) => {
    if (!!selectedOption) {
      if (option.isCorrect) {
        return quizStyles.correctAnswerStyle;
      } else {
        if (option === selectedOption) {
          return quizStyles.incorrectAnswerStyle;
        }
      }
    }
  };

  const styleTextOnClick = (option) => {
    if (!!selectedOption) {
      if (option.isCorrect) {
        return quizStyles.selectedOptionText;
      } else {
        if (option === selectedOption) {
          return quizStyles.selectedOptionText;
        }
      }
    }
  };

  const handlePress = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption.isCorrect) {
      animationRef.current?.play();
    }
  };

  return (
    <View style={quizStyles.container}>
      <LottieView
        ref={animationRef}
        style={quizStyles.animationStyle}
        source={require("../../../assets/animations/firework.json")}
        autoPlay={false}
        loop={false}
      />
      <Text style={quizStyles.questionText}>{questionData.question}</Text>
      {questionData.options.map((option, optionIndex) => (
        <TouchableOpacity
          key={optionIndex}
          onPress={() => handlePress(option)}
          style={[quizStyles.optionButton, styleButtonOnClick(option)]}
          disabled={selectedOption !== null}
        >
          <Text style={[quizStyles.optionText, styleTextOnClick(option)]}>
            {option.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Quiz;
