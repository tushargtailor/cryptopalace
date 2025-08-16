import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "./slices/coinSlice";
import filterReducer from "./slices/filterSlice";
import autoRefreshMiddleware from "./middleware/autoRefreshMiddleware";

export default configureStore({
  reducer: {
    coins: coinReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(autoRefreshMiddleware),
});
