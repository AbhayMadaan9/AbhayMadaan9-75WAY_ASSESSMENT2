import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const drawingApi = createApi({
  reducerPath: "drawingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (builder) => ({

    saveDrawing: builder.mutation({
      query: (body: { color: string; toolType: string; coordinates: [{x1: number; y1: number; x2: string; y2: string;}] }) => {
        return {
          url: "/savedrawing",
          method: "post",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        };
      },
    }),
    
    getDrawing: builder.query({
      query: (body: { id: string | null }) => ({
        url: `/drawing/${body.id}`, //get id
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
})
  
});

export const {
useGetDrawingQuery, useSaveDrawingMutation
} = drawingApi;