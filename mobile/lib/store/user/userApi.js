// import {AsyncStorage} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
    reducerPath:"userApi",
    tagTypes:["user"],
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://192.168.1.22:8000/user",
        prepareHeaders:async (headers) => {
            const access_token = await AsyncStorage.getItem("access_token")
            headers.append("access_token",access_token)
            return headers
        }
        },),
    endpoints:(builder) => ({
        getUserProfile: builder.query({
            query: () => `/userProfile/`,
            providesTags:["user"],
        }),
    
        updateUserProfile: builder.mutation({
          query: (body) =>({ 
           url: `/updateProfile`,
           method:"POST",
           body:body
          }),
          invalidatesTags:["user"],
        }),
    
        updateUserProfileImage: builder.mutation({
          query: (body) =>({ 
           url: `/updateProfileImage`,
           method:"POST",
           body:body
          }),
          invalidatesTags:["user"],
        }),
    
        buyPremium: builder.mutation({
          query: () =>({ 
           url: `/buyPremium`,
           method:"POST",
          //  body:body
          }),
          // invalidatesTags:["user"],
        }),
    
        checkPayment: builder.mutation({
          query: (body) =>({ 
           url: `/checkPayment`,
           method:"POST",
           body:body
          }),
          // invalidatesTags:["user"],
        }),
    })
})

export const { useGetUserProfileQuery,useUpdateUserProfileMutation , useUpdateUserProfileImageMutation , useBuyPremiumMutation,useCheckPaymentMutation} = userApi