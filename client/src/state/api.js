import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASEURL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `/general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "/client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "/client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ currentPage, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { currentPage, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "/client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "/sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins:build.query({
      query:() => '/management/admins',
      providesTags:['Admins']
    })
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useLazyGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery
} = api;
