import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000"+"/user" ,headers:{
    access_token:getCookie("access_token") as string
  } }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<any , any>({
        query: () => `/userProfile/`,
    }),

    updateUserProfile: builder.mutation<any , any>({
      query: (body) =>({ 
       url: `/updateProfile`,
       method:"POST",
       body:body
      }),
    }),

  }),
})


export const { useGetUserProfileQuery,useUpdateUserProfileMutation} = userApi