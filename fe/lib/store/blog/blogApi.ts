import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes:["blog"],
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
      invalidatesTags:["blog"]
    }),

    getUserBlogs: builder.query<any , any>({
      query: () => `/getBlogs`,
      providesTags:["blog"]
    }),

    getCategories: builder.query<any , any>({
      query: () => `/getCategories`,
    }),

    getSingleBlog: builder.query<any , any>({
      query: (name) => `/getBlog/${name}`,
      providesTags:["blog"]
    }),

    getUpdateBlog: builder.query<any , any>({
      query: (name) => `/getUpdateBlog/${name}`,
      providesTags:["blog"]

    }),

    updateBlog: builder.mutation<any , any>({
      query: (body) =>({ 
       url: `/updateBlog`,
       method:"POST",
       body:body
      }),
      invalidatesTags:["blog"]
    }),

    deleteBlog: builder.mutation<any , any>({
      query: (body) =>({ 
       url: `/deleteBlog/${body.id}`,
       method:"DELETE",
      }),
      invalidatesTags:["blog"]
    }),

    getCategoryBlogs : builder.query<any,any>({
      query:(category) => `/getCategoryBlogs/${category}`
    }),

  }),
})


export const { useAddBlogMutation,useGetUserBlogsQuery,useGetCategoriesQuery,useGetSingleBlogQuery,useGetCategoryBlogsQuery ,useGetUpdateBlogQuery ,useUpdateBlogMutation,useDeleteBlogMutation} = blogApi

