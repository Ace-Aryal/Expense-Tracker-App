import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
export const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: JSON.parse(localStorage.getItem("expenses")) || [], // use this general syntax to avoid any unnecessary errors
  },

  reducers: {
    addItem: (state = initialState, action) => {
      //expecting object as payload
      state.expenses.unshift(action.payload);

      localStorage.setItem("expenses", JSON.stringify(state.expenses));
    },

    deleteItem: (state = initialState, action) => {
      //expecting id as payload
      console.log(action.payload);

      state.expenses = state.expenses.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
      // in reudux toolkit we can mutate the state directly but not in react with useState
    },

    updateItems: (state = initialState, action) => {
      state.expenses = state.expenses.map((expense) => {
        if (expense.id !== action.payload.id) {
          return expense;
        }
        return action.payload;
      });
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
      console.log(state.expenses);
    },

    calculateTotal: (state, action) => {
      // action.payload is 1 /7 / 30 /90 / 365 / "alltime" , usestate and 
    //   const [totalObj, setTotalObj] = useState({
    //     todaytotal: 0,
    //     weekTotal: 0,
    //     monthTotal: 0,
    //     threeMonthTotal: 0,
    //     oneYearTotal: 0,
    //     allTimeTotal: 0,
    //   });   // total: state. total :)

      state.expenses.map((expense) => {
        const expenselife = Math.floor((Date.now() - expense.id) * 86400000);
        switch (true) {
          case expenselife < 1:
            setTotalObj((prevVal) => {
              return {
                ...prevVal,
                todaytotal: todaytotal + expense.amount,
              };
            });
        
          case expenselife < 7:
            setTotalObj((prevVal) => {
              return {
                ...prevVal,
                weekTotal: weekTotal + expense.amount,
              };
            });
      

          case expenselife < 30:
            setTotalObj((prevVal) => {
              return {
                ...prevVal,
                monthTotal: monthTotal + expense.amount,
              };
            });
   

          case expenselife < 90:
            setTotalObj((prevVal) => {
              return {
                ...prevVal,
                threeMonthTottal: (todaytotal + expense.amount),
              };
            });
         
          case expenselife < 365:
            setTotalObj((prevVal) => {
              return {
                ...prevVal,
                oneYearTotal: (oneYearTotal + expense.amount),
              };
            });
           

          default:
            setTotalObj((prevVal) => {
              return {
                ...prevVal,
                allTimeTotal: (allTimeTotal + expense.amount),
              };
            });
            break;
        }
      });
    },
  },
});
export const { addItem, deleteItem, updateItems ,calculateTotal } = expenseSlice.actions; // to use the reducers from components
export default expenseSlice.reducer; // for store
