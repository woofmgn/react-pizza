import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cart from './slices/cartSlice';
import filter from './slices/filterSlice';
import pizza from './slices/pizzaSlice';


export const store = configureStore({
  reducer: {
    filter, 
    cart,
    pizza 
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; 