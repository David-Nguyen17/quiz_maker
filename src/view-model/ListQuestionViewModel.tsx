import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import CardQuestion from "@/pages/home/components/CardQuestion";
import { IListQuestionProps } from "@/pages/home/components/ListQuestion";
import { RootState, useAppSelector } from "@/redux/store";

const ListQuestionViewModel = (props: IListQuestionProps) => {
  const { data } = props;
  const navigate = useNavigate();
  const { selectedCategory, selectedDifficult } = useAppSelector(
    (state: RootState) => state.question,
  );
  const renderListQuestion = useMemo(
    () =>
      (data?.length
        ? data?.map((item) => (
          <CardQuestion key={item?.id} item={item} isCheckResult={false} />
        ))
        : ""),
    [data],
  );
  const isShowButtonSubmit = useMemo(
    () =>
      (data?.length
        ? data?.filter((item) => item?.selectedAnswer)?.length === data?.length
        : false),
    [data],
  );

  const onNavigateResult = () => {
    navigate(
      `/result?category_id=${selectedCategory?.id}&difficult=${selectedDifficult?.value}`,
      {
        state: {
          data,
        },
      },
    );
  };
  return {
    renderListQuestion,
    isShowButtonSubmit,
    onNavigateResult,
  };
};

export default ListQuestionViewModel;
