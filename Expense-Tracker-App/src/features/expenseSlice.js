import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
export const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: JSON.parse(localStorage.getItem("expenses")) || [], // use this general syntax to avoid any unnecessary errors
    totals : JSON.parse(localStorage.getItem("totals"))||{
      todaytotal: 0,
      weekTotal: 0,
      monthTotal: 0,
      threeMonthTotal: 0,
      oneYearTotal: 0,
      allTimeTotal: 0,
    },
    balance : JSON.parse(localStorage.getItem("balance")) || {
      dailyBalance : 0,
      weeklyBalance :0,
      monthlyBalance :0,
      quaterlyBAlance : 0,
      yearlyBalance : 0,


    },
    budget : JSON.parse(localStorage.getItem("budget")) || {
      monthlyBudget : 0,
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
        const expenselife = Math.floor((Date.now() - expense.id) / 86400000);
        console.log(expenselife);
        
        switch (true) {
          case expenselife < 1: {
            
            state.totals = {
                ...state.totals,
                todaytotal: state.totals.todaytotal + Number(expense.amount),
            }
              };
          
        
          case expenselife < 7:{
            state.totals = {
                ...state.totals,
                weekTotal: state.totals.weekTotal + Number(expense.amount),
            }
              };
        
      

          case expenselife < 30:
           {
              state.totals = { ...state.totals,
                monthTotal: state.totals.monthTotal + Number(expense.amount),
              }
              };
       
   

          case expenselife < 90:
            
              {state.totals = {  ...state.totals,
                threeMonthTotal: (state.totals.threeMonthTotal + Number(expense.amount)),
                }
              };
        
         
          case expenselife < 365:  { state.totals =  {
                ...state.totals,
                oneYearTotal: (state.totals.oneYearTotal +Number(expense.amount)),
              };
           
            }

          default: {
            state.totals = {
                ...state.totals,
                allTimeTotal: (state.totals.allTimeTotal + Number(expense.amount)),
              };
            }
            break;
        }
        console.log(state.totals);
        
    
    })

    localStorage.setItem("totals",JSON.stringify(state.totals))
  },

  setBalance : (state, action ) => {

      state.balance.monthlyBalance =  state.budget.monthlyBudget - state.totals.monthTotal
      state.balance.dailyBalance = state.budget.monthlyBudget  / 30 - state.totals.todaytotal
      state.balance.weeklyBalance =  state.budget.monthlyBudget /30 * 7 - state.totals.weekTotal
      state.balance.quaterlyBAlance =  state.budget.monthlyBudget * 3 - state.totals.threeMonthTotal
      state.balance.annualBAlance =  state.budget.monthlyBudget / 30 *365 - state.totals.oneYearTotal

      localStorage.setItem("budget",JSON.stringify(state.budget))
      localStorage.setItem("balance" , JSON.stringify(state.balance))
  },

  setBudget : (state , action)=> {
    state.budget.monthlyBudget = action.payload
  }
},
});
export const { addItem, deleteItem, updateItems ,calculateTotal ,setBalance , setBudget} = expenseSlice.actions; // to use the reducers from components
export default expenseSlice.reducer; // for store
