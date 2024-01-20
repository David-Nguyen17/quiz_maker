import { TriviaCategories } from "@/services/types";
import { createSlice } from "@reduxjs/toolkit";
export type DifficultType = "Easy" | "Medium" | "Hard";
export type DifficultValue = "easy" | "medium" | "hard";
export type DifficultyLevel = {
  id: number;
  name: DifficultType;
  value: DifficultValue;
};

interface CategoryState {
  difficultyLevels: DifficultyLevel[];
  selectedDifficult: DifficultyLevel | null;
  selectedCategory: TriviaCategories | null;
}

const initialState: CategoryState = {
  difficultyLevels: [
    { id: 1, name: "Easy", value: "easy" },
    { id: 2, name: "Medium", value: "medium" },
    { id: 3, name: "Hard", value: "hard" },
  ],
  selectedDifficult: null,
  selectedCategory: null,
};

const questionSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    onSetSelectedDifficult: (state, action) => {
      state.selectedDifficult = action.payload;
    },
    onSetSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export default questionSlice;
