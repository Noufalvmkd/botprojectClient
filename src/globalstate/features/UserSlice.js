import { createSlice } from '@reduxjs/toolkit'

const initialState ={
  isUserAuth : false,
  userData :{},
}
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
        state.isUserAuth = true;
        state.userData = action.payload;
    },
    clearUser: (state)=>{
      state.isUserAuth =false,
      state.userData ={};
    }
  },
})

export const { saveUser , clearUser  } = UserSlice.actions

export default UserSlice.reducer