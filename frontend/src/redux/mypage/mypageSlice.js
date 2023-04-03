import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: [],
    reHistory: [],
};

export const mypageSlice = createSlice({
  name: "mypage",
  initialState,
  reducers: {
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setReHistory: (state, action) => {
      state.reHistory.push(action.payload);
    },
    initHistory: (state) => {
      state.reHistory = [];
    }
  },
});

export const { setHistory, setReHistory, initHistory } = mypageSlice.actions;
// export const selectState = (state) => state.counter;
export default mypageSlice.reducer;
