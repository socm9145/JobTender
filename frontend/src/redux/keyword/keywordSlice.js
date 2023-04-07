import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickedKeyword: null,
  clickedRank: null,
  selectedKeyword: [null, null, null],
  resultId: null,
  keyword: {},
  wordList: [
    // {"keywordId":1,"keywordName":"안정"},
    // "질서",
    // "관습",
    // "공헌",
    // "박애",
    // "자율",
    // "도전",
    // "재미",
    // "성취",
    // "권력",
  ],
  keywordName: [],
  keywordId: [],
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
    setWordList: (state, action) => {
      const tmp = action.payload;
      // eslint-disable-next-line array-callback-return
      tmp.map((data)=>{
        state.keywordName.push(data.keywordName);
        state.keywordId.push(data.keywordId);
      })
      state.wordList = action.payload;
    },
    setResultId: (state, action) => {
      state.resultId = action.payload;
    },
    setInit: (state) => {
      state.clickedKeyword = null;
      state.clickedRank = null;
      state.selectedKeyword = [null, null, null];
      state.resultId = null;
      state.keyword = {};
      state.wordList = [];
      state.keywordName = [];
      state.keywordId = [];
    }
  },
});

export const {
  setClickedKeyword,
  setClickedRank,
  setSelectedKeyword,
  setWordList,
  setResultId,
  setInit,
} = keywordSlice.actions;
// export const selectState = (state) => state.counter;
export default keywordSlice.reducer;
