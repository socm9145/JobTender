import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userData: {
    name: "",
    age: "",
    gender: "",
    createDate: "",
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
      let date = data.accessInfo.createDate.split("T")[0];
      date = date.replaceAll("-", ".");
      state.userData.createDate = date;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserData, setUserId } = keywordSlice.actions;
// export const selectState = (state) => state.counter;
export default keywordSlice.reducer;
