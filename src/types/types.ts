import { DifficultType, DifficultValue } from "@/redux/questionSlice";

export type TriviaCategories = {
  id: number;
  name: string;
};
export type ResultQuestion = {
  type: string;
  difficulty: DifficultType;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  list_answer: string[];
  id: string;
  selectedAnswer: string;
};
export interface ResponseListCategory {
  trivia_categories: TriviaCategories[];
}

export interface ResponseListQuestion {
  response_code: number;
  results: ResultQuestion[];
}
export type ParamsQuestion = {
  amount: number;
  category: number;
  difficulty: DifficultValue;
  type: "multiple";
};
