import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
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
      console.log(data);
      state.userData.name = data.name;
      state.userData.age = data.age;
      state.userData.gender = data.gender;
      state.userData.email = data.email;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    }
  },
});

export const { setUserData, setUserId } = keywordSlice.actions;
// export const selectState = (state) => state.counter;
export default keywordSlice.reducer;
