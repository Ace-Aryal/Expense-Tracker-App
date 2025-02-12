import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
export const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: JSON.parse(localStorage.getItem("expenses")) || [], // use this general syntax to avoid any unnecessary errors
    totals : {
      todaytotal: 0,
      weekTotal: 0,
      monthTotal: 0,
      threeMonthTotal: 0,
      oneYearTotal: 0,
      allTimeTotal: 0,
    },
    balance : {
      dailyBalance : 0,
      weeklyBalance :0,
      monthlyBalance :0,
      quaterlyBAlance : 0,
      yearlyBalance : 0,


    }
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
  
    // total: state. total :)

      state.expenses.map((expense) => {
        const expenselife = Math.floor((Date.now() - expense.id) * 86400000);
        switch (true) {
          case expenselife < 1: {
            state.totals = {
                ...prevVal,
                todaytotal: todaytotal + expense.amount,
            }
              };
          
        
          case expenselife < 7:{
            state.totals = {
                ...prevVal,
                weekTotal: weekTotal + expense.amount,
            }
              };
        
      

          case expenselife < 30:
           {
              state.totals = { ...prevVal,
                monthTotal: monthTotal + expense.amount,
              }
              };
       
   

          case expenselife < 90:
            
              {state.totals = {  ...prevVal,
                threeMonthTottal: (todaytotal + expense.amount),
                }
              };
        
         
          case expenselife < 365:  { state.totals =  {
                ...prevVal,
                oneYearTotal: (oneYearTotal + expense.amount),
              };
           
            }

          default: {
            state.totals = {
                ...prevVal,
                allTimeTotal: (allTimeTotal + expense.amount),
              };
            }
            break;
        }
    
    })
  },

  setBalance : (state, action ) => {
      state.balance.monthlyBalance = action.payload - state.totals.monthTotal
      state.balance.dailyBalance = action.payload / 30 - state.totals.todaytotal
      state.balance.weeklyBalance = action.payload /30 * 7 - state.totals.weekTotal
      state.balance.quaterlyBAlance = action.payload * 3 - state.totals.threeMonthTotal
      state.balance.annualBAlance = action.payload / 30 *365 - state.totals.oneYearTotal
  }
},
});
export const { addItem, deleteItem, updateItems ,calculateTotal ,setBalance } = expenseSlice.actions; // to use the reducers from components
export default expenseSlice.reducer; // for store
