import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.22:8000/auth"  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) =>({ 
        url: `/login`,
        method:"POST",
        body:body
        }),
    }),

    signup: builder.mutation({
        query: (body) =>({ 
         url: `/signup`,
         method:"POST",
         body:body
        }),
      }),

    resetPassword: builder.mutation({
      query: (body) =>({ 
        url: `/resetPassword`,
        method:"POST",
        body:body
      }),
    }),

    resetPasswordControl: builder.mutation({
      query: (body) =>({ 
        url: `/resetPasswordControl`,
        method:"POST",
        body:body
      }),
    }),

  }),
})


export const { useLoginMutation,useSignupMutation,useResetPasswordMutation,useResetPasswordControlMutation } = authApi

