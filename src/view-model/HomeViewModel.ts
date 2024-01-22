import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import questionSlice, { DifficultyLevel } from "@/redux/questionSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useLazyGetListQuestionsQuery } from "@/services/question_api";
import {
  useGetListCategoryQuery,
  useLazyGetListCategoryQuery,
} from "@/services/trivia_category_api";
import { TriviaCategories } from "@/types/types";

const HomeViewModel = () => {
  const {
    data = [],
    isLoading,
    isFetching,
    isError: isErrorCategory,
  } = useGetListCategoryQuery();
  const [getListCategoryQuery] = useLazyGetListCategoryQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id");
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
  const disabled = useMemo(
    () =>
      !selectedCategory ||
      !selectedDifficult ||
      isLoadingQuestion ||
      isFetchingQuestion,
    [selectedCategory, selectedDifficult, isLoadingQuestion, isFetchingQuestion]
  );
  const onRetryGetCategory = () => {
    if (isErrorCategory) {
      getListCategoryQuery();
    }
  };
  const onHandleDefaultCategory = () => {
    if (
      categoryId &&
      data?.length &&
      parseFloat(categoryId) !== selectedCategory?.id
    ) {
      const find = data?.find((item) => item?.id === parseFloat(categoryId));
      dispatch(questionSlice.actions.onSetSelectedCategory(find ?? null));
    }
  };
  const onHandleDefaultDifficult = () => {
    if (difficult && data?.length && difficult !== selectedDifficult?.value) {
      const find = difficultyLevels?.find((item) => item?.value === difficult);
      dispatch(questionSlice.actions.onSetSelectedDifficult(find ?? null));
    }
  };
  useEffect(() => {
    onHandleDefaultCategory();
    onHandleDefaultDifficult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, data, difficult]);
  useEffect(
    () => () => {
      dispatch(questionSlice.actions.onSetSelectedDifficult(null));
      dispatch(questionSlice.actions.onSetSelectedCategory(null));
    },
    [dispatch]
  );
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
    onRetryGetCategory,
  };
};

export default HomeViewModel;
