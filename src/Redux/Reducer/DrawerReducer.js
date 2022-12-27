import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenDrawer: false,
  drawerContent:'Mặc định',
  drawerTitle: "Mặc định",
};

const DrawerReducer = createSlice({
  name: "DrawerReducer",
  initialState,
  reducers: {
    setOpenDrawer: (state, action) => {
      state.isOpenDrawer = action.payload.status;
      state.drawerContent = action.payload.content;
      state.drawerTitle = action.payload.title;
    },
  },
});

export const { setOpenDrawer } = DrawerReducer.actions;

export default DrawerReducer.reducer;
