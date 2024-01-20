import { createSlice } from "@reduxjs/toolkit";
export type DifficultType = "Easy" | "Medium" | "Hard";
export type DifficultValue = "easy" | "medium" | "hard";
export type DifficultyLevel = {
  id: number;
  name: DifficultType;
  value: DifficultValue;
};

interface CategoryState {
  difficulty_levels: DifficultyLevel[];
}

const initialState: CategoryState = {
  difficulty_levels: [
    { id: 1, name: "Easy", value: "easy" },
    { id: 2, name: "Medium", value: "medium" },
    { id: 3, name: "Hard", value: "hard" },
  ],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
});

export default categorySlice;
