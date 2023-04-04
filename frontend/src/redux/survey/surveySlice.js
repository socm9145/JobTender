import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resultId: 0,
  wordList: [],
  wordListSize: 0,
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
        console.log(state.wordList)
    },

    setResultId: (state, action) => {
        state.resultId = action.payload;
    },
    
    setClickedKeyword: (state, action) => {
      const clickedKeyword = action.payload;
      state.clickedKeyword = clickedKeyword;
    },
  },
});

export const { setWordList, setResultId } = surveySlice.actions;
// export const selectState = (state) => state.counter;
export default surveySlice.reducer;
