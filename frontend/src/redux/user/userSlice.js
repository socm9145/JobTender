import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    name: "",
    age: "",
    gender: "",
    email: "",
  },
};

export const keywordSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const data = action.payload;
      state.userData.name = data.name;
      state.userData.age = data.age;
      state.userData.gender = data.gender;
      state.userData.email = data.email;
    },
  },
});

export const { setUserData } = keywordSlice.actions;
// export const selectState = (state) => state.counter;
export default keywordSlice.reducer;
