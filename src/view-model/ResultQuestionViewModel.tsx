import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CardQuestion from "@/pages/home/components/CardQuestion";
import { ResultQuestion } from "@/services/types";

const ResultQuestionViewModel = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const data = useMemo<ResultQuestion[]>(
    () => state?.data ?? ([] as ResultQuestion[]),
    [state],
  );
  const renderListQuestion = useMemo(
    () => (data?.length
      ? data?.map((item) => (
        <CardQuestion key={item?.id} item={item} isCheckResult />
      ))
      : ""),
    [data],
  );
  const correctAnswer = useMemo(
    () => (data?.length
      ? data?.filter((item) => item?.selectedAnswer === item?.correct_answer)
      : []
    )?.length,
    [data],
  );
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
