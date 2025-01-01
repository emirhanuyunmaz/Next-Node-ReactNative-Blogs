import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'

export const adminApi = createApi({
  reducerPath: 'adminApi',
  tagTypes:["blog","user","category","image"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000"+"/admin" , headers:{
      access_token:getCookie("access_token") as string
    }}),
  endpoints: (builder) => ({
    
    homeCarouselImageAdd: builder.mutation<any , any>({
      query: (body) =>({ 
       url: `/homeCarouselAddImage`,
       method:"POST",
       body:body
      }),
      invalidatesTags:["image"]
    }),

    homeCarouselImageUpdate: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/homeCarouselUpdateImage`,
         method:"POST",
         body:body
        }),
        invalidatesTags:["image"]
    }),

    homeCarouselImageDelete: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/homeCarouselDeleteImage`,
         method:"POST",
         body:body
        }),
        invalidatesTags:["image"]
    }),

    homeCarouselGetImage: builder.query<any , any>({
      query: () => `/homeCarouselGetImage`,
      providesTags:["image"]
    }),

    homePageGetInfo: builder.query<any , any>({
        query: () => `/homeInfo`,
    }),

    homeInfoUpdate: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/homeInfoUpdate`,
         method:"POST",
         body:body
        }),
    }),

    getAllUser: builder.query<any , any>({
        query: () => `/getUserList`,
        providesTags:["user"]
    }),

    getSingleUser: builder.query<any , any>({
        query: (id) => `/getSingleUser/${id}`,
        providesTags:["user"]
    }),

    updateUser: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/updateUser/${body.id}`,
         method:"POST",
         body:body
        }),
        invalidatesTags:["user"]
    }),

    updateUserProfileImage: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/updateUserProfileImage/${body.id}`,
         method:"POST",
         body:body
        }),
        invalidatesTags:["user"]
    }),

    addUser: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/addUser`,
         method:"POST",
         body:body
        }),
        invalidatesTags:["user"]
    }),

    deleteUser: builder.mutation<any , any>({
        query: (id) =>({ 
         url: `/deleteUser/${id}`,
         method:"POST",
        }),
        invalidatesTags:["user"]
    }),

    getAllBlogs: builder.query<any , any>({
        query: () => `/getBlogList`,
        providesTags:["blog"]
    }),

    getSingleBlog: builder.query<any , any>({
        query: (id:String) => `/getSingleBlog/${id}`,
        providesTags:["blog"]
    }),

    deleteBlog: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/deleteBlog`,
         method:"POST",
         body:body
        }),
        invalidatesTags:["blog"]
    }),

    updateBlog: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/updateBlog`,
         method:"POST",
         body:body
        }),
        invalidatesTags:["blog"]
    }),

    updateBlogImage: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/updateBlogImage`,
         method:"POST",
         body:body
        }),
        invalidatesTags:["blog"]
    }),

    addCategory: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/addCategory`,
         method:"POST",
         body:body
        }),
        invalidatesTags:["category"]
    }),

    updateCategory: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/updateCategory`,
         method:"POST",
         body:body
        }),
        invalidatesTags:["category"]
    }),

    deleteCategory: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/deleteCategory`,
         method:"DELETE",
         body:body
        }),
        invalidatesTags:["category"]
    }),

    getCategory: builder.query<any , any>({
        query: () => `/getCategories`,
        providesTags:["category"]
    }),

    getFooterData: builder.query<any , any>({
        query: () => `/getFooterData`,
    }),

    updateFooter: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/updateFooter`,
         method:"POST",
         body:body
        }),
    }),

    getAboutData: builder.query<any , any>({
        query: () => `/getAboutData`,
    }),

    updateAbout: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/updateAboutData`,
         method:"POST",
         body:body
        }),
    }),

    updateAboutImage: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/updateAboutImage`,
         method:"POST",
         body:body
        }),
    }),

    getContact: builder.query<any , any>({
        query: () => `/getContact`,
    }),

    updateContact: builder.mutation<any , any>({
        query: (body) =>({ 
         url: `/updateContact`,
         method:"POST",
         body:body
        }),
    }),

  }),
})


export const { useGetCategoryQuery,useHomeCarouselImageAddMutation,useHomeCarouselGetImageQuery,useHomeCarouselImageUpdateMutation,useHomeCarouselImageDeleteMutation,useHomePageGetInfoQuery,useHomeInfoUpdateMutation,useGetAllUserQuery,useGetSingleUserQuery,useGetAllBlogsQuery ,useAddCategoryMutation ,useDeleteCategoryMutation , useUpdateFooterMutation ,useGetFooterDataQuery ,useUpdateCategoryMutation , useUpdateBlogMutation,useGetSingleBlogQuery,useUpdateBlogImageMutation , useDeleteBlogMutation ,useGetAboutDataQuery,useUpdateAboutMutation,useUpdateAboutImageMutation,useGetContactQuery, useUpdateContactMutation ,useUpdateUserMutation ,useUpdateUserProfileImageMutation , useAddUserMutation,useDeleteUserMutation} = adminApi