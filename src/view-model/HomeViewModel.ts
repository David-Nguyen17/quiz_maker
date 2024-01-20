import questionSlice, { DifficultyLevel } from "@/redux/questionSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useLazyGetListQuestionsQuery } from "@/services/question_api";
import { useGetListCategoryQuery } from "@/services/trivia_category_api";
import { TriviaCategories } from "@/services/types";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const HomeViewModel = () => {
  const {
    data = [],
    isLoading,
    isFetching,
    isError: isErrorCategory,
  } = useGetListCategoryQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const category_id = searchParams.get("category_id");
  const difficult = searchParams.get("difficult");
  const dispatch = useAppDispatch();
  const [
    getListQuestion,
    {
      isFetching: isFetchingQuestion,
      isLoading: isLoadingQuestion,
      isError: isErrorQuestion,
      currentData = [],
    },
  ] = useLazyGetListQuestionsQuery();
  console.log("error", isErrorQuestion, currentData);
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
      setSearchParams(
        `?category_id=${selectedCategory?.id}&difficult=${selectedDifficult?.value}`,
        { replace: true }
      );
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
    console.log("ren-render 1", category_id, selectedCategory);
    if (
      category_id &&
      data?.length &&
      parseFloat(category_id) !== selectedCategory?.id
    ) {
      console.log("ren-render 2", selectedCategory);
      const find = data?.find((item) => item?.id === parseFloat(category_id));
      dispatch(questionSlice.actions.onSetSelectedCategory(find ?? null));
    }
    if (difficult && data?.length && difficult !== selectedDifficult?.value) {
      const find = difficultyLevels?.find((item) => item?.value === difficult);
      dispatch(questionSlice.actions.onSetSelectedDifficult(find ?? null));
    }
  }, [category_id, data, difficult]);

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
    listQuestion: currentData,
    isFetchingQuestion,
    isLoadingQuestion,
    isErrorQuestion,
    isErrorCategory,
  };
};

export default HomeViewModel;
