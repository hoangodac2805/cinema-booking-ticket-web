import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  content: <p>Mặc định</p>,
  title: "Mặc định",
  submitFunc: () => {
    alert("Xin chào");
  },
  isModalLoading: true,
};

const ModalReducer = createSlice({
  name: "ModalReducer",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.isModalOpen = true;
      state.content = action.payload.content;
      state.title = action.payload.title;
      state.isModalLoading = false;
      state.isChangeInfoLoading = false;
    },
    setModalClose: (state, action) => {
      state.isModalOpen = false;
      state.content = <p>Mặc định</p>;
      state.title = "Mặc định";
      state.submitFunc = () => {
        alert("Xin chào");
      };
    },
    setModalSubmit: (state, action) => {
      state.submitFunc = action.payload;
    },
    setIsModalLoading: (state, action) => {
      state.isModalLoading = action.payload;
    },
  },
});

export const {
  setModalClose,
  setModalSubmit,
  setModalOpen,
  setIsModalLoading,
} = ModalReducer.actions;

export default ModalReducer.reducer;
