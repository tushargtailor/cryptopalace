import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    }
  );
  return response.data;
});

export const searchCoinByQuery = createAsyncThunk(
  "coins/searchByQuery",
  async (query, { rejectWithValue }) => {
    try {
      // 1) resolve coin id from query (name/symbol/id)
      const searchRes = await axios.get(
        "https://api.coingecko.com/api/v3/search",
        { params: { query } }
      );
      const match = searchRes.data?.coins?.[0];
      if (!match?.id) {
        return rejectWithValue("No matching coin found");
      }

      // 2) fetch market data for that id
      const marketsRes = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            ids: match.id,
            order: "market_cap_desc",
            per_page: 1,
            page: 1,
            sparkline: false,
          },
        }
      );

      if (!marketsRes.data?.[0]) {
        return rejectWithValue("Coin market data not found");
      }
      return marketsRes.data[0];
    } catch (err) {
      return rejectWithValue(err?.message || "Search failed");
    }
  }
);

const coinSlice = createSlice({
  name: "coins",
  initialState: {
    list: [],
    status: "idle",
    error: null,
    // NEW: scoped search state
    search: {
      status: "idle",
      result: null,
      error: null,
    },
  },
  reducers: {
    // optional: clear search
    clearCoinSearch: (state) => {
      state.search = { status: "idle", result: null, error: null };
    },
  },
  extraReducers: (builder) => {
    builder
      // existing list
      .addCase(fetchCoins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // search flow
      .addCase(searchCoinByQuery.pending, (state) => {
        state.search.status = "loading";
        state.search.result = null;
        state.search.error = null;
      })
      .addCase(searchCoinByQuery.fulfilled, (state, action) => {
        state.search.status = "succeeded";
        state.search.result = action.payload;
      })
      .addCase(searchCoinByQuery.rejected, (state, action) => {
        state.search.status = "failed";
        state.search.error =
          action.payload || action.error?.message || "Search failed";
      });
  },
});

export const { clearCoinSearch } = coinSlice.actions;
export default coinSlice.reducer;
