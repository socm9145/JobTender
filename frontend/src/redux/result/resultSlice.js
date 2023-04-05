import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: [],
    reHistory: [],
    top3: null,
    bottom3: null,
};

export const resultSlice = createSlice({
    name: "result",
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
    },
    setKeywordSurveyResult: (state, action) => {
        const data = action.payload;
        state.bottom3 = data.bottom;
        state.top3 = data.top;
    },
  },
});

export const { setHistory, setReHistory, initHistory, setKeywordSurveyResult } = resultSlice.actions;
// export const selectState = (state) => state.counter;
export default resultSlice.reducer;
