import { createSlice } from '@reduxjs/toolkit'


export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    comments: [],
    loading: false
  },
  reducers: {
    setPosts: (state,action) =>{
        state.posts = action.payload
        state.loading = true
    },
    deletePost: (state, action) => {
      const postIdToDelete = action.payload.id;
      state.posts = state.posts.filter((post) => post.id !== postIdToDelete);
    },
    setComments: (state, action)=>{
      state.comments = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPosts, setComments, deletePost } = postSlice.actions



export default postSlice.reducer