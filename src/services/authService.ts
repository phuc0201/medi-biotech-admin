import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosInstance/axiosBaseQuery";
import type { IPagedResults } from "../types/paginate";

export const authService = createApi({
  reducerPath: "authService",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/signin",
        method: "POST",
        data: body,
      }),
      transformResponse: (response: IPagedResults<any>) => response?.data || {},
      transformErrorResponse: (error) => {
        console.error(error);
      },
    }),
  }),
});
