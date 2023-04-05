import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  reHistory: [],
  top3: null,
  bottom3: null,
  top3CompanyId: [],
  chart2: {},
  chart2_1: {},
  chart2_2: {},
  chart2_3: {},
  chart3: [],
  chart4: {},
  chart5: {},
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
      // 딕셔너리 내림차순으로 정렬 / jeonghun
      state.bottom3 = data.bottom;
      state.top3 = data.top;
      state.top3CompanyId = [];
      for (let key in data.top) {
        state.top3CompanyId.push(key);
      }
    },

    setChart2: (state, action) => {
      state.chart2 = action.payload;
    },
    setChart2_1: (state, action) => {
      state.chart2_1 = action.payload;
    },
    setChart2_2: (state, action) => {
      state.chart2_2 = action.payload;
    },
    setChart2_3: (state, action) => {
      state.chart2_3 = action.payload;
    },
    setChart3: (state, action) => {
      state.chart3 = action.payload;
    },
    setChart4: (state, action) => {
      state.chart4 = action.payload;
    },
    setChart5: (state, action) => {
      state.chart5 = action.payload;
    },
  },
});

export const {
  setHistory,
  setReHistory,
  initHistory,
  setKeywordSurveyResult,
  setChart2,
  setChart2_1,
  setChart2_2,
  setChart2_3,
  setChart3,
  setChart4,
  setChart5,
} = resultSlice.actions;
// export const selectState = (state) => state.counter;
export default resultSlice.reducer;
