import { uniqBy } from "lodash";
import { ResponseListCategory, TriviaCategories } from "../types/types";
import requestSlice from "./request";

export const triviaCategorySlice = requestSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListCategory: builder.query<TriviaCategories[], void>({
      query: () => ({
        url: import.meta.env.VITE_KEY_CATEGORY,
      }),
      transformResponse(response: ResponseListCategory) {
        return uniqBy(response?.trivia_categories ?? [], "id");
      },
      transformErrorResponse() {
        return [];
      },
    }),
  }),
});

export const { useGetListCategoryQuery, useLazyGetListCategoryQuery } =
  triviaCategorySlice;
