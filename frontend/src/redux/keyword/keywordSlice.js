import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedKeyword: null,
};

export const keywordSlice = createSlice({
  name: "keyword",
  initialState,
  reducers: {
    setSelectedKeyword: (state, action) => {
      state.selectedKeyword = action.payload;
    },
  },
});

export const { setSelectedKeyword } = keywordSlice.actions;
// export const selectState = (state) => state.counter;
export default keywordSlice.reducer;
