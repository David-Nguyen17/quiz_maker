import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import AppButton from "@/components/AppButton";
import Loading from "@/components/Loading";
import HomeViewModel from "@/view-model/HomeViewModel";
import ListQuestion from "./components/ListQuestion";

function HomePage() {
  const {
    data,
    difficultyLevels,
    disabled,
    isFetching,
    isLoading,
    onChangeValueCategory,
    onChangeValueDifficult,
    onCreateQuestion,
    selectedCategory,
    selectedDifficult,
    listQuestion,
    isFetchingQuestion,
    isLoadingQuestion,
    isErrorQuestion,
    onRetryGetCategory,
  } = HomeViewModel();
  const handleRenderBody = () => {
    if (isLoadingQuestion || isFetchingQuestion) return <Loading />;
    if (isErrorQuestion) {
      return <Box>Something when wrong with server (Too many requests)</Box>;
    }
    return <ListQuestion data={listQuestion} />;
  };
  return (
    <Box component="div" className="container">
      <Box className="header">QUIZ MAKER</Box>
      <Box sx={{ display: "flex", mb: 4, gap: 2 }}>
        <Autocomplete
          disablePortal
          id="categorySelect"
          value={selectedCategory}
          options={data ?? []}
          onOpen={onRetryGetCategory}
          onChange={(_, newValue) => onChangeValueCategory(newValue)}
          getOptionLabel={(option) => option?.name ?? ""}
          getOptionKey={(option) => option?.id}
          sx={{ width: 500 }}
          noOptionsText="No Category"
          loading={isLoading || isFetching}
          loadingText={<div>Loading...</div>}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField {...params} label="Select a category" />
          )}
        />
        <Autocomplete
          disablePortal
          id="difficultySelect"
          options={difficultyLevels ?? []}
          value={selectedDifficult}
          getOptionLabel={(option) => option?.name ?? ""}
          getOptionKey={(option) => option?.id}
          sx={{ width: 500 }}
          onChange={(_, newValue) => onChangeValueDifficult(newValue)}
          loading={isLoading || isFetching}
          loadingText={<div>Loading...</div>}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField {...params} label="Select difficulty" />
          )}
        />
        <AppButton
          variant="outlined"
          id="createBtn"
          title="Create"
          disabled={disabled}
          onClick={onCreateQuestion}
        />
      </Box>
      {handleRenderBody()}
    </Box>
  );
}

export default HomePage;
