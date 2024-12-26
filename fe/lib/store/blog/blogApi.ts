import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000"+"/blog" , headers:{
      access_token:getCookie("access_token") as string
    }}),
  endpoints: (builder) => ({
    
    addBlog: builder.mutation<any , any>({
      query: (body) =>({ 
       url: `/addBlog`,
       method:"POST",
       body:body
      }),
    }),

    getUserBlogs: builder.query<any , any>({
      query: () => `/getBlogs`,
    }),

    getCategories: builder.query<any , any>({
      query: () => `/getCategories`,
    }),

    getSingleBlog: builder.query<any , any>({
      query: (name) => `/getCategories/${name}`,
    }),

    getCategoryBlogs : builder.query<any,any>({
      query:(category) => `/getCategoryBlogs/${category}`
    }),

  }),
})


export const { useAddBlogMutation,useGetUserBlogsQuery,useGetCategoriesQuery,useGetSingleBlogQuery,useGetCategoryBlogsQuery } = blogApi

