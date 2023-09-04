import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    loading: false
  },
  reducers: {
    setUserInformations: (state,action) =>{
        state.user = action.payload
        state.loading = true
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setUserInformations} = userSlice.actions

export default userSlice.reducer