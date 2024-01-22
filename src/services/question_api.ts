import { uniqBy } from "lodash";
import { v4 as uuidv4 } from "uuid";

import {
  ParamsQuestion,
  ResponseListQuestion,
  ResultQuestion,
} from "../types/types";
import { randomOrderAnswer } from "./function";
import requestSlice from "./request";

export const questionSlice = requestSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListQuestions: builder.query<ResultQuestion[], ParamsQuestion>({
      query: (params) => ({
        url: import.meta.env.VITE_KEY_QUESTION,
        params,
      }),
      transformResponse(response: ResponseListQuestion) {
        if (response?.results?.length && response?.response_code === 0) {
          return uniqBy(response?.results, "question")?.map((item) => ({
            ...item,
            list_answer: randomOrderAnswer([
              ...(item?.incorrect_answers ?? []),
              item?.correct_answer,
            ]),
            id: uuidv4(),
            selectedAnswer: "",
          }));
        }
        return [];
      },
      transformErrorResponse() {
        return [];
      },
    }),
  }),
});

export const {
  useGetListQuestionsQuery,
  useLazyGetListQuestionsQuery,
  util: { updateQueryData, selectCachedArgsForQuery },
} = questionSlice;
