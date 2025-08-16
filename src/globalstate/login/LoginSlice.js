import { createSlice } from '@reduxjs/toolkit'


export const loginSlice = createSlice({
  name: 'isLoggedin',
  initialState: {
    value: false,
  },
  reducers: {
    updateLoginStatus: (state, action) => {
        state.value = action.payload
    }
  },
})

export const { updateLoginStatus } = loginSlice.actions

export default loginSlice.reducer