import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "./slices/coinSlice";
import filterReducer from "./slices/filterSlice";
import autoRefreshMiddleware from "./middleware/autoRefreshMiddleware";
import portfolioReducer from "./slices/portfolioSlice";

export default configureStore({
  reducer: {
    coins: coinReducer,
    filter: filterReducer,
    portfolio: portfolioReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(autoRefreshMiddleware),
});
