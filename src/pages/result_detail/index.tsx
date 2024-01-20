import AppButton from "@/components/AppButton";
import ResultQuestionViewModel from "@/view-model/ResultQuestionViewModel";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
const ResultQuestionDetailPage = () => {
  const {
    handleBackgroundColor,
    onCreateQuiz,
    renderListQuestion,
    correctAnswer,
    data,
  } = ResultQuestionViewModel();
  return (
    <Box className="container">
      <Stack spacing={4}>
        {data?.length ? (
          <Stack spacing={4}>
            <Box sx={{ textAlign: "center" }}>RESULTS</Box>
            {renderListQuestion}
            <Box
              sx={{
                textAlign: "center",
                backgroundColor: handleBackgroundColor(),
              }}
            >
              You scored {correctAnswer} out of {data?.length}
            </Box>
          </Stack>
        ) : null}
        <AppButton
          title="Create a new quiz"
          onClick={onCreateQuiz}
          component={"div"}
          isSelected
          sx={{ width: "80%", marginTop: 4, minWidth: 300 }}
        />
      </Stack>
    </Box>
  );
};

export default ResultQuestionDetailPage;
