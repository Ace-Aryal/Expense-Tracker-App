import { configureStore } from '@reduxjs/toolkit';
import balanceSlice from './balanceSlice';
import expenseSlice from './expenseSlice';
import authSlice from "./authSlice"
import chartDataSlice from "./chartDataSlice"
export const store = configureStore({
  reducer: { // all the slices are combined here amd key is used to access the state in the component using useSelector
    balance: balanceSlice  ,
    credentials: authSlice,
    expense : expenseSlice,
    chartData : chartDataSlice,
    
  },
});
