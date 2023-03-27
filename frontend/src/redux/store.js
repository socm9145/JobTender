import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter/counterSlice";
import homeReducer from "./home/homeSlice";
import keywordReducer from "./keyword/keywordSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
    keyword: keywordReducer,
  },
});

export default store;
