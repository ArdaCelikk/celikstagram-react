import { createSlice } from '@reduxjs/toolkit'


export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    loading: false
  },
  reducers: {
    setPosts: (state,action) =>{
        state.posts = action.payload
        state.loading = true
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPosts } = postSlice.actions

export default postSlice.reducer