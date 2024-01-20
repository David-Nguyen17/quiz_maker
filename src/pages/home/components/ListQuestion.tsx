import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import AppButton from "@/components/AppButton";
import { ResultQuestion } from "@/services/types";
import ListQuestionViewModel from "@/view-model/ListQuestionViewModel";

export interface IListQuestionProps {
  data: ResultQuestion[] | undefined;
}

function ListQuestion(props: IListQuestionProps) {
  const { data } = props;
  const { isShowButtonSubmit, onNavigateResult, renderListQuestion } =
    ListQuestionViewModel({ data });
  return (
    <Box>
      <Stack spacing={4}>{renderListQuestion}</Stack>
      {isShowButtonSubmit ? (
        <AppButton
          title="Submit"
          onClick={onNavigateResult}
          component="div"
          isSelected
          sx={{ width: "80%", marginTop: 8, minWidth: 300 }}
        />
      ) : null}
    </Box>
  );
}

export default ListQuestion;
