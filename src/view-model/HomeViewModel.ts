import questionSlice, { DifficultyLevel } from "@/redux/questionSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useLazyGetListQuestionsQuery } from "@/services/question_api";
import { useGetListCategoryQuery } from "@/services/trivia_category_api";
import { TriviaCategories } from "@/services/types";
import { useEffect, useMemo } from "react";

const HomeViewModel = () => {
  const { data = [], isLoading, isFetching } = useGetListCategoryQuery();
  const dispatch = useAppDispatch();
  const [
    getListQuestion,
    {
      data: listQuestion = [],
      isFetching: isFetchingQuestion,
      isLoading: isLoadingQuestion,
    },
  ] = useLazyGetListQuestionsQuery();
  const { difficultyLevels, selectedDifficult, selectedCategory } =
    useAppSelector((state: RootState) => state.question);
  const onChangeValueCategory = (value: TriviaCategories | null) => {
    dispatch(questionSlice.actions.onSetSelectedCategory(value));
  };
  const onChangeValueDifficult = (value: DifficultyLevel | null) => {
    dispatch(questionSlice.actions.onSetSelectedDifficult(value));
  };
  const onCreateQuestion = () => {
    if (selectedCategory && selectedDifficult) {
      getListQuestion({
        amount: 5,
        category: selectedCategory?.id,
        difficulty: selectedDifficult?.value,
        type: "multiple",
      });
    }
  };
  const disabled = useMemo(() => {
    return (
      !selectedCategory ||
      !selectedDifficult ||
      isLoadingQuestion ||
      isFetchingQuestion
    );
  }, [
    selectedCategory,
    selectedDifficult,
    isLoadingQuestion,
    isFetchingQuestion,
  ]);
  useEffect(() => {
    return () => {
      dispatch(questionSlice.actions.onSetSelectedCategory(null));
      dispatch(questionSlice.actions.onSetSelectedDifficult(null));
    };
  }, []);
  return {
    data,
    isFetching,
    isLoading,
    difficultyLevels,
    onChangeValueCategory,
    onChangeValueDifficult,
    onCreateQuestion,
    disabled,
    selectedDifficult,
    selectedCategory,
    listQuestion,
    isFetchingQuestion,
    isLoadingQuestion,
  };
};

export default HomeViewModel;
