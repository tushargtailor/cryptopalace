import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "./slices/coinSlice";
import filterReducer from "./slices/filterSlice";

export default configureStore({
  reducer: {
    coins: coinReducer,
    filter: filterReducer,
  },
});
