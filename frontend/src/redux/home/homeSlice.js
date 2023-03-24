import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMethod: true,
  buttonAble: true,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setselectedMethod: (state) => {
      console.log(state.selectedMethod);
      state.selectedMethod = !state.selectedMethod;
      console.log(state.selectedMethod);
    },
    setButtonAble: (state, action) => {
      state.buttonAble = action.payload;
    },
  },
});

export const { setselectedMethod, setButtonAble } = homeSlice.actions;
// export const selectState = (state) => state.counter;
export default homeSlice.reducer;
