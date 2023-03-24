import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickedKeyword: null,
  clickedRank: null,
  selectedKeyword: [null, null, null],
};

export const keywordSlice = createSlice({
  name: "keyword",
  initialState,
  reducers: {
    setClickedKeyword: (state, action) => {
      const clickedKeyword = action.payload;
      state.clickedKeyword = clickedKeyword;
    },

    setClickedRank: (state, action) => {
      const clickedRank = action.payload;
      state.clickedRank = clickedRank;
    },

    setSelectedKeyword: (state, action) => {
      const rank = action.payload[0];
      const keyword = action.payload[1];
      state.selectedKeyword[rank] = keyword;
    },
  },
});

export const { setClickedKeyword, setClickedRank, setSelectedKeyword } =
  keywordSlice.actions;
// export const selectState = (state) => state.counter;
export default keywordSlice.reducer;
