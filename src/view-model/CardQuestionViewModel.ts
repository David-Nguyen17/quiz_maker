import { ICardQuestionProps } from "@/pages/home/components/CardQuestion";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { updateQueryData } from "@/services/question_api";
import { ResultQuestion } from "@/services/types";

const CardQuestionViewModel = (props: ICardQuestionProps) => {
  const { selectedCategory, selectedDifficult } = useAppSelector(
    (state: RootState) => state.question
  );
  const dispatch = useAppDispatch();
  const { item, isCheckResult } = props;
  const onSelectAnswer = (question: ResultQuestion, answer: string) => {
    if (selectedCategory && selectedDifficult) {
      dispatch(
        updateQueryData(
          "getListQuestions",
          {
            amount: 5,
            category: selectedCategory?.id,
            difficulty: selectedDifficult?.value,
            type: "multiple",
          },
          (draftListQuestion: ResultQuestion[]) => {
            return draftListQuestion?.map((element) => {
              if (element?.id === question?.id) {
                if (element?.selectedAnswer === answer) {
                  return {
                    ...element,
                    selectedAnswer: "",
                  };
                }
                return {
                  ...element,
                  selectedAnswer: answer,
                };
              }
              return element;
            });
          }
        )
      );
    }
  };
  const handleIsSelected = (answer: string) => {
    return (
      answer === item?.selectedAnswer ||
      (item?.correct_answer === answer && isCheckResult)
    );
  };
  const handleIsError = (answer: string) => {
    return (
      isCheckResult &&
      item?.selectedAnswer === answer &&
      item?.correct_answer !== item?.selectedAnswer
    );
  };

  return {
    onSelectAnswer,
    handleIsSelected,
    handleIsError,
  };
};

export default CardQuestionViewModel;
