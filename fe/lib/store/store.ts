import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth/authApi'
import { userApi } from './user/userApi'

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]:authApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware
    ])
    
  })


// Infer the type of store
// export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']