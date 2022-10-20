import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchPizzasList = createAsyncThunk(
  'pizza/fetchPizzasList',
  async(params) => {
    const { 
      sortBy,
      order,
      category,
      search,
      currentPage } = params;
    const res = await axios
    .get(
    `https://631e2e919f946df7dc3f42c6.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
  );
  return res.data;
});

const initialState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzasList.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzasList.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzasList.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  }
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;