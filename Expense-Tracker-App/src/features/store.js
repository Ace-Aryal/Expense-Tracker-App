import { configureStore } from '@reduxjs/toolkit';
import balanceSlice from './balanceSlice';
import expenseSlice from './expenseSlice';
import authSlice from "./authSlice"
export const store = configureStore({
  reducer: {
    balance: balanceSlice  ,
    credentials: authSlice,
    expense : expenseSlice
  },
});
