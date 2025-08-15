import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  topCount: 10,
  priceChange: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setTopCount(state, action) {
      state.topCount = action.payload; // 10 or 50
    },
    setPriceChange(state, action) {
      state.priceChange = action.payload; // 'all', 'positive', 'negative'
    },
    resetFilters(state) {
      state.search = "";
      state.topCount = 10;
      state.priceChange = "all";
    },
  },
});

export const { setSearch, setTopCount, setPriceChange, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
