import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import isEqual from "react-fast-compare";

import AppButton from "@/components/AppButton";
import { convertEntities } from "@/services/function";
import { ResultQuestion } from "@/services/types";
import CardQuestionViewModel from "@/view-model/CardQuestionViewModel";

export interface ICardQuestionProps {
  item: ResultQuestion;
  isCheckResult: boolean;
}

const CardQuestion = React.memo(
  (props: ICardQuestionProps) => {
    const { item, isCheckResult } = props;
    const { onSelectAnswer, handleIsError, handleIsSelected } =
      CardQuestionViewModel({ isCheckResult, item });
    return (
      <Stack spacing={1}>
        <Typography>{convertEntities(item?.question)}</Typography>
        <Stack direction="row" spacing={2}>
          {item?.list_answer?.map((answer) => (
            <AppButton
              onClick={() => {
                if (!isCheckResult) {
                  onSelectAnswer(item, answer);
                }
              }}
              isSelected={handleIsSelected(answer)}
              title={convertEntities(answer)}
              isError={handleIsError(answer)}
              key={answer}
            />
          ))}
        </Stack>
      </Stack>
    );
  },
  (oldProps, nextProps) => isEqual(oldProps.item, nextProps?.item),
);

export default CardQuestion;
