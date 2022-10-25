import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

type FetchPizzasArgs = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
};

export const fetchPizzasList = createAsyncThunk(
  'pizza/fetchPizzasList',
  async(params: FetchPizzasArgs) => {
    const { 
      sortBy,
      order,
      category,
      search,
      currentPage } = params;
    const res = await axios
    .get<Pizza[]>(
    `https://631e2e919f946df7dc3f42c6.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
  );
  return res.data as Pizza[];
});

type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
}

export interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzasList.pending, (state, _) => {
      state.status = 'loading';
      state.items = [];
    });

    builder.addCase(fetchPizzasList.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });

    builder.addCase(fetchPizzasList.rejected, (state, _) => {
      state.status = 'error';
      state.items = [];
    });
  }
  // extraReducers: {
  //   [fetchPizzasList.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzasList.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzasList.rejected]: (state, action) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // }
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;