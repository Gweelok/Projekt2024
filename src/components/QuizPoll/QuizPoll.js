import { View} from "react-native";
import PollChart from "../PollChart/PollChart";
import Quiz from "../Quiz/Quiz";

const QuizPoll = ({data}) => {

  return (
    <View>
      {data.type === "quiz" ? (
        <Quiz questionData={data} />
      ) : (
        <View>
          <PollChart pollData={data} />
        </View>
      )}
    </View>
  );
};

export default QuizPoll;
