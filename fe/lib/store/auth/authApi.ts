import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginModel, SignupModel } from './model'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000"+"/auth"  }),
  endpoints: (builder) => ({
    login: builder.mutation<any , LoginModel>({
      query: (body) =>({ 
       url: `/login`,
       method:"POST",
       body:body
    }),
    }),

    signup: builder.mutation<any , SignupModel>({
        query: (body) =>({ 
         url: `/signup`,
         method:"POST",
         body:body
      }),
      }),
  }),
})


export const { useLoginMutation,useSignupMutation } = authApi

