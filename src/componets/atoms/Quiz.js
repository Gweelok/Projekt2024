import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as style from "../../styles/Stylesheet";

const Quiz = ({ question, handleOptionSelect, selectedOption }) => {
  const styles = {
    container: {
      width: "100%",
      height: 280,
      backgroundColor: style.Primarycolor2,
      marginBottom: 15,
      marginTop: 10,
    },
    questionText: {
      color: style.Primarycolor1,
      fontSize: 18,
      fontFamily: "space-grotesk-Medium",
      fontWeight: "bold",
      marginTop: 13,
      marginBottom: 20,
      textAlign: "left",
      marginLeft: 15,
    },
    optionButton: {
      padding: 7,
      margin: 8,
      backgroundColor: style.Primarycolor3,
      borderColor: style.Primarycolor1,
      borderWidth: 2,
      justifyContent: "center",
    },
    optionText: {
      fontSize: 14,
      fontFamily: "space-grotesk-Medium",
      color: style.Primarycolor1,
      marginLeft: 5,
    },
    selectedOptionText: {
      color: style.Primarycolor3,
    },
    correctAnswerStyle: {
      borderColor: style.Primarycolor1, // Correct answer color
      backgroundColor: style.Primarycolor1, // Correct answer color
    },
    incorrectAnswerStyle: {
      borderColor: "#AA0000", // Incorrect answer color
      backgroundColor: "#AA0000",
    },
  };

  const handlePress = (selectedOption) => {
    handleOptionSelect(selectedOption);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question}</Text>
      {question.options.map((option, optionIndex) => (
        <TouchableOpacity
          key={optionIndex}
          onPress={() => handlePress(option)}
          style={[
            styles.optionButton,
            selectedOption &&
              selectedOption.option === option &&
              (selectedOption.isCorrect
                ? styles.correctAnswerStyle
                : styles.incorrectAnswerStyle),
          ]}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption &&
                selectedOption.option === option &&
                styles.selectedOptionText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Quiz;