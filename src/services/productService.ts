import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosInstance/axiosBaseQuery";
import type { IQueryParameter } from "../types/queryParameter";
import { buildParams } from "../utils/queryHelpers";
import type { IPagedResults } from "../types/paginate";
import type { IProduct, IProductFilters } from "../types/product";
import { TagTypes } from "../constants/TagTypes";

export const productService = createApi({
  reducerPath: "productService",
  tagTypes: [TagTypes.PRODUCTS],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    fetchProducts: builder.query<IPagedResults<IProduct>, IQueryParameter<IProductFilters>>({
      query: (args) => ({
        url: "/products",
        method: "get",
        params: buildParams(args),
      }),
      transformErrorResponse: (error) => {
        console.error("Fetch products failed with error: ", error);
        return error;
      },
      providesTags: (result) => {
        const rows = result?.data ?? [];
        return [
          { type: TagTypes.PRODUCTS, id: "LIST" },
          ...rows.map((x) => ({ type: TagTypes.PRODUCTS, id: x.id })),
        ];
      },
    }),
  }),
});

export const { useFetchProductsQuery } = productService;
