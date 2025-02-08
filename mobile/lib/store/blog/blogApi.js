import AsyncStorage from '@react-native-async-storage/async-storage'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes:["blog"],
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://192.168.1.22:8000/blog",
    prepareHeaders:async (headers) => {
        const access_token = await AsyncStorage.getItem("access_token")
        headers.append("access_token",access_token)
        return headers
    }
    },),
  endpoints: (builder) => ({
    
    addBlog: builder.mutation({
      query: (body) =>({ 
       url: `/addBlog`,
       method:"POST",
       body:body
      }),
      invalidatesTags:["blog"]
    }),

    getUserBlogs: builder.query({
      query: () => `/getBlogs`,
      providesTags:["blog"]
    }),

    getAllBlog: builder.query({
      query: () => `/getAllBlog`,
      providesTags:["blog"]
    }),

    getCategories: builder.query({
      query: () => `/getCategories`,
    }),

    getSingleBlog: builder.query({
      query: (name) => `/getBlog/${name}`,
      providesTags:["blog"]
    }),

    getUpdateBlog: builder.query({
      query: (name) => `/getUpdateBlog/${name}`,
      providesTags:["blog"]

    }),

    updateBlog: builder.mutation({
      query: (body) =>({ 
       url: `/updateBlog`,
       method:"POST",
       body:body
      }),
      invalidatesTags:["blog"]
    }),

    updateBlogImage: builder.mutation({
      query: (body) =>({ 
       url: `/updateBlogImage/${body.id}`,
       method:"POST",
       body:body
      }),
      invalidatesTags:["blog"]
    }),

    deleteBlog: builder.mutation({
      query: (body) =>({ 
       url: `/deleteBlog/${body.id}`,
       method:"DELETE",
      }),
      invalidatesTags:["blog"]
    }),

    getCategoryBlogs : builder.query({
      query:(category) => `/getCategoryBlogs/${category}`
    }),

    getSearchBlogs : builder.query({
      query:(search) => `/searchBlog/${search}`
    }),
    

  }),
})


export const { useAddBlogMutation,useGetUserBlogsQuery,useGetAllBlogQuery,useGetCategoriesQuery,useGetSingleBlogQuery,useGetCategoryBlogsQuery ,useGetUpdateBlogQuery ,useUpdateBlogMutation,useDeleteBlogMutation,useUpdateBlogImageMutation ,useGetSearchBlogsQuery} = blogApi

