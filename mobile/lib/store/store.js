import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth/authApi'
import { userApi } from './user/userApi'
import { blogApi } from './blog/blogApi'
// import { adminApi } from './admin/adminApi'

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]:authApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [blogApi.reducerPath]:blogApi.reducer,

    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      blogApi.middleware,
    ])
    
  })

