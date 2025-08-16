import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login/LoginSlice'

export const store = configureStore({
  reducer: {
    isLoggedin: loginReducer
  },
})