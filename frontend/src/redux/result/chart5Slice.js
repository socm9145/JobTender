import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chartData: [
    { letter: "남", frequency: 0 },
    { letter: "여", frequency: 0 },
    { letter: "나", frequency: 0 },
  ],
  //
  upDownCheckF: "",
  upDownCheckM: "",
  resultF: 0,
  resultM: 0,
  //
  maleMean: 0,
  maleStd: 0,
  femaleMean: 0,
  femaleStd: 0,
  //안될 시 5로 변경
  myAverage: 0,
  clickedIdx: null,
};

export const chart5Slice = createSlice({
  name: "chart5",
  initialState,
  reducers: {
    setChartData: (state, action) => {
      state.chartData = action.payload;
    },
    setMaleMean: (state, action) => {
      state.maleMean = action.payload;
    },
    setMaleStd: (state, action) => {
      state.maleStd = action.payload;
    },
    setFemaleMean: (state, action) => {
      state.femaleMean = action.payload;
    },
    setFemaleStd: (state, action) => {
      state.femaleStd = action.payload;
    },
    setMyAverage: (state, action) => {
      state.myAverage = action.payload;
    },
    setResultF: (state, action) => {
      state.resultF = action.payload;
    },
    setResultM: (state, action) => {
      state.resultM = action.payload;
    },
    setUpDownCheckF: (state, action) => {
      state.upDownCheckF = action.payload;
    },
    setUpDownCheckM: (state, action) => {
      state.upDownCheckM = action.payload;
    },
    setClickedIdx: (state, action) => {
      state.clickedIdx = action.payload;
    },
  },
});

export const {
  setChartData,
  setMaleMean,
  setMaleStd,
  setFemaleMean,
  setFemaleStd,
  setMyAverage,
  setResultF,
  setResultM,
  setUpDownCheckF,
  setUpDownCheckM,
  setClickedIdx,
} = chart5Slice.actions;
// export const selectState = (state) => state.counter;
export default chart5Slice.reducer;
