import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000"+"/blog"  }),
  endpoints: (builder) => ({
    
    login: builder.mutation<any , any>({
      query: (body) =>({ 
       url: `/login`,
       method:"POST",
       body:body
    }),
    }),

    signup: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/signup`,
         method:"POST",
         body:body
      }),
      }),
  }),
})


export const { useLoginMutation,useSignupMutation } = blogApi

