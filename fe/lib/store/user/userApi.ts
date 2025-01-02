import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes:["user"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000"+"/user" ,headers:{
    access_token:getCookie("access_token") as string
  } }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<any , any>({
        query: () => `/userProfile/`,
        providesTags:["user"],
    }),

    updateUserProfile: builder.mutation<any , any>({
      query: (body) =>({ 
       url: `/updateProfile`,
       method:"POST",
       body:body
      }),
      invalidatesTags:["user"],
    }),

    updateUserProfileImage: builder.mutation<any , any>({
      query: (body) =>({ 
       url: `/updateProfileImage`,
       method:"POST",
       body:body
      }),
      invalidatesTags:["user"],
    }),

  }),
})


export const { useGetUserProfileQuery,useUpdateUserProfileMutation , useUpdateUserProfileImageMutation} = userApi