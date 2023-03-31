import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: [],
};

export const mypageSlice = createSlice({
  name: "mypage",
  initialState,
  reducers: {
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { setHistory } = mypageSlice.actions;
// export const selectState = (state) => state.counter;
export default mypageSlice.reducer;
