import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const requestSlice = createApi({
  reducerPath: "quiz_maker",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_HOST_SERVER,
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    todo: builder.query({
      query: () => "todo",
    }),
  }),
});

export default requestSlice;
