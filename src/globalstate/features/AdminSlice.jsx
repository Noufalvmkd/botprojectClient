import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdminAuth: false,
  adminData: {},
};

const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    saveAdmin: (state, action) => {
      state.isAdminAuth = !!action.payload;
      state.adminData = action.payload || {};
    },
    clearAdmin: (state) => {
      state.isAdminAuth = false;
      state.adminData = {};
    },
  },
});

export const { saveAdmin, clearAdmin } = AdminSlice.actions;

export default AdminSlice.reducer;
