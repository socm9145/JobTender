import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter/counterSlice";
import homeReducer from "./home/homeSlice";
import keywordReducer from "./keyword/keywordSlice";
import userReducer from "./user/userSlice";
import mypageReducer from "./mypage/mypageSlice";
import surveyReducer from "./survey/surveySlice";
import resultReducer from "./result/resultSlice";
import chart5Reducer from "./result/chart5Slice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
    keyword: keywordReducer,
    user: userReducer,
    mypage: mypageReducer,
    survey: surveyReducer,
    result: resultReducer,
    chart5: chart5Reducer,
  },
});

export default store;
