import { createSlice } from "@reduxjs/toolkit";

const load = () => {
  try {
    const raw = localStorage.getItem("holdings");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};
const save = (holdings) => {
  try {
    localStorage.setItem("holdings", JSON.stringify(holdings));
  } catch {}
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    holdings: load(), // { coinId: amount }
  },
  reducers: {
    addHolding: (state, action) => {
      const { coinId, amount } = action.payload;
      state.holdings[coinId] = (state.holdings[coinId] || 0) + amount;
      save(state.holdings);
    },
    updateHolding: (state, action) => {
      const { coinId, amount } = action.payload;
      if (amount <= 0) {
        delete state.holdings[coinId];
      } else {
        state.holdings[coinId] = amount;
      }
      save(state.holdings);
    },
    removeHolding: (state, action) => {
      delete state.holdings[action.payload];
      save(state.holdings);
    },
  },
});

export const { addHolding, updateHolding, removeHolding } =
  portfolioSlice.actions;
export default portfolioSlice.reducer;
