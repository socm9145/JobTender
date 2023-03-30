import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter/counterSlice";
import homeReducer from "./home/homeSlice";
import keywordReducer from "./keyword/keywordSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
    keyword: keywordReducer,
    user: userReducer,
  },
});

export default store;
