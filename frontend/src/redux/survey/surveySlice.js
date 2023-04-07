import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resultId: 0,
  wordList: [],
  wordListSize: 0,
  selectedScoresRaw: {},
  selectedScoresRedux: [],
};

export const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setWordList: (state, action) => {
      state.wordList = [];
      const tmp = action.payload;
      for (let index = 0; index < tmp.length; index++) {
        state.wordList.push(tmp[index].question);
      }
    },

    setResultId: (state, action) => {
      state.resultId = action.payload;
    },

    setClickedKeyword: (state, action) => {
      const clickedKeyword = action.payload;
      state.clickedKeyword = clickedKeyword;
    },
    setSelectedScoresRaw: (state, action) => {
      state.selectedScoresRaw = action.payload;
    },
    setSelectedScoresRedux: (state, action) => {
      state.selectedScoresRedux = action.payload;
    },
  },
});

export const {
  setWordList,
  setResultId,
  setSelectedScoresRedux,
  setSelectedScoresRaw,
} = surveySlice.actions;
// export const selectState = (state) => state.counter;
export default surveySlice.reducer;
