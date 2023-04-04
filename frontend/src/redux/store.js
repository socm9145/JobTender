import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter/counterSlice";
import homeReducer from "./home/homeSlice";
import keywordReducer from "./keyword/keywordSlice";
import userReducer from "./user/userSlice";
import mypageReducer from "./mypage/mypageSlice";
import surveyReducer from "./survey/surveySlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
    keyword: keywordReducer,
    user: userReducer,
    mypage: mypageReducer,
    survey: surveyReducer,
  },
});

export default store;
