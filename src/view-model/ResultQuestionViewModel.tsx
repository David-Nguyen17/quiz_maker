import CardQuestion from "@/pages/home/components/CardQuestion";
import { ResultQuestion } from "@/services/types";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultQuestionViewModel = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const data = useMemo<ResultQuestion[]>(
    () => state?.data ?? ([] as ResultQuestion[]),
    [state]
  );
  const renderListQuestion = useMemo(() => {
    return data?.length
      ? data?.map((item) => {
          return (
            <CardQuestion key={item?.id} item={item} isCheckResult={true} />
          );
        })
      : "";
  }, [data]);
  const correctAnswer = useMemo(() => {
    return (
      data?.length
        ? data?.filter((item) => item?.selectedAnswer === item?.correct_answer)
        : []
    )?.length;
  }, [data]);
  const handleBackgroundColor = () => {
    if (correctAnswer === 0 || correctAnswer === 1) {
      return "red";
    }
    if (correctAnswer === 2 || correctAnswer === 3) {
      return "yellow";
    }
    if (correctAnswer === 4 || correctAnswer === 5) {
      return "green";
    }
    return "transparent";
  };
  const onCreateQuiz = () => {
    navigate("/");
  };
  return {
    handleBackgroundColor,
    renderListQuestion,
    onCreateQuiz,
    correctAnswer,
    data,
  };
};

export default ResultQuestionViewModel;
