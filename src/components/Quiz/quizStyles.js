import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";

const quizStyles = StyleSheet.create({
  container: {
    width: indexStyles.metrics.container.quiz.width,
    height: indexStyles.metrics.container.quiz.height,
    backgroundColor: indexStyles.colorPalette.Primarycolor2,
    marginBottom: indexStyles.metrics.container.quiz.marginBottom,
    marginTop: indexStyles.metrics.container.quiz.marginTop,
    paddingBottom: indexStyles.metrics.container.quiz.paddingBottom,
  },
  questionText: {
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body7,
    fontFamily: indexStyles.typography.fontFamily.primaryMedium,
    fontWeight: indexStyles.typography.fontWeight.bold,
    marginTop: indexStyles.metrics.text.quizQuestion.marginTop,
    marginBottom: indexStyles.metrics.text.quizQuestion.marginBottom,
    textAlign: "left",
    marginLeft: indexStyles.metrics.text.quizQuestion.marginLeft,
  },
  optionButton: {
    padding: indexStyles.metrics.button.quizAnswer.padding,
    marginLeft: indexStyles.metrics.button.quizAnswer.marginLeft,
    marginRight: indexStyles.metrics.button.quizAnswer.marginRight,
    marginBottom: indexStyles.metrics.button.quizAnswer.marginBottom,
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    borderWidth: indexStyles.metrics.button.quizAnswer.borderWidth,
    justifyContent: "center",
  },
  optionText: {
    fontSize: indexStyles.typography.fontSize.body3,
    fontFamily: indexStyles.typography.fontFamily.primaryMedium,
    color: indexStyles.colorPalette.Primarycolor1,
    marginLeft: indexStyles.metrics.text.quizAnswer.marginLeft,
  },
  selectedOptionText: {
    color: indexStyles.colorPalette.Primarycolor3,
  },
  correctAnswerStyle: {
    borderColor: indexStyles.colorPalette.Primarycolor1,
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
  },
  incorrectAnswerStyle: {
    borderColor: indexStyles.colorPalette.errorRed,
    backgroundColor: indexStyles.colorPalette.errorRed,
  },
  animationStyle: {
    position: "absolute",
    flex: 1,
    pointerEvents: "none",
    zIndex: indexStyles.metrics.animation.quiz.zIndex,
  },
});

export default quizStyles;
