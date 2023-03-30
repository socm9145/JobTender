import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickedKeyword: null,
  clickedRank: null,
  selectedKeyword: [null, null, null],
  wordList: [
    "안정",
    "질서",
    "관습",
    "공헌",
    "박애",
    "자율",
    "도전",
    "재미",
    "성취",
    "권력",
  ],
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
      const keyword = () => {
        if (action.payload[1] === null) {
          return null;
        } else {
          return action.payload[1];
        }
      };
      state.selectedKeyword[rank] = keyword();
    },
  },
});

export const { setClickedKeyword, setClickedRank, setSelectedKeyword } =
  keywordSlice.actions;
// export const selectState = (state) => state.counter;
export default keywordSlice.reducer;