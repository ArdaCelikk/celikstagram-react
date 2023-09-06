import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import postSlice from './postSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postSlice,
  },
})