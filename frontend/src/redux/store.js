import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter/counterSlice";
import homeReducer from "./home/homeSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
  },
});

export default store;
