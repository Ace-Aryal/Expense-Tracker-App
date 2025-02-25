import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import {
  format,
  startOfWeek,
  parseISO,
  getTime,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";

export const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: JSON.parse(localStorage.getItem("expenses")) || [], // use this general syntax to avoid any unnecessary errors
    totals: JSON.parse(localStorage.getItem("totals")) || {
      todaytotal: 0,
      weekTotal: 0,
      monthTotal: 0,
      threeMonthTotal: 0,
      oneYearTotal: 0,
      allTimeTotal: 0,
      thisWeekTotal: 0,
      thisMonthTotal: 0,
      thisYearTotal: 0,
    },
    balance: JSON.parse(localStorage.getItem("balance")) || {
      dailyBalance: 0,
      weeklyBalance: 0,
      monthlyBalance: 0,
      quaterlyBalance: 0,
      yearlyBalance: 0,
    },
    budget: JSON.parse(localStorage.getItem("budget")) || {
      monthlyBudget: 0,
      dailyBudget : 0,
    },
  },

  reducers: {
    addItem: (state = initialState, action) => {
      //expecting object as payload
      
      
      
    
        return {
          ...state,
          expenses: [...state.expenses, action.payload].sort((a, b) => Number(b.date.split("-").join("")) - Number(a.date.split("-").join(""))),
        };
      
      

    },

    deleteItem: (state = initialState, action) => {
      //expecting id as payload
      console.log(action.payload);

      const updatedExpense = state.expenses.filter(
        (item) => item.id !== action.payload
      );
      
      state.expenses = updatedExpense
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
      
      const now = new Date();
      const weekStart = startOfWeek(now); //
      const weekStartMS = new Date(weekStart).getTime();
      const monthStart = startOfMonth(now);
      const monthStartMS = new Date(monthStart).getTime()
      const yearStart = startOfYear(now)
      const yearStartMS = new Date(yearStart).getTime()

      // total: state. total :)
      

      state.expenses.map((expense) => {
        const expenseDateMS = Date.parse(expense.date)
        const expenselife = Math.floor((Date.now() - expenseDateMS) / 86400000);
       
        if (expense.isMapped){
          console.log(expense);
           // updates the total if the totals are outdated
          if(expenselife > 1 && expense.addedDateFrame.addedToDay ) state.totals.todaytotal -= expense.amount
          if(expenselife > 7 && expense.addedDateFrame.addedToWeek ) state.totals.weekTotal -= expense.amount
          if(expenselife > 30 && expense.addedDateFrame.addedToMonth ) state.totals.monthTotal -= expense.amount
          if(expenselife > 120 && expense.addedDateFrame.addedToQuarter ) state.totals.threeMonthTotal -= expense.amount
          if(expenselife > 365 && expense.addedDateFrame.adedToYear ) state.totals.oneYearTotal -= expense.amount
          if( expense.addedDateFrame.addedToCalenderWeek && expenseDateMS < weekStartMS ) state.totals.thisWeekTotal -= expense.amount
          if( expense.addedDateFrame.addedToCalenderMonth && expenseDateMS < monthStartMS) state.totals.thisMonthTotal -= expense.amount
          if( expense.addedDateFrame.addedToCalenderYear && expenseDateMS < yearStartMS) state.totals.thisYearTotal -= expense.amount
          localStorage.setItem("totals", JSON.stringify(state.totals));


          return;
        } 
        if(expenseDateMS > weekStartMS) {
          expense.addedDateFrame.addedToCalenderWeek = true
          state.totals.thisWeekTotal += Number(expense.amount)}
        if (expenseDateMS > monthStartMS) {
          expense.addedDateFrame.addedToCalenderMonth = true
          state.totals.thisMonthTotal += Number(expense.amount)}
        if(expenseDateMS > yearStartMS){
          expense.addedDateFrame.addedToCalenderYear = true
          state.totals.thisYearTotal += Number(expense.amount)}
        if (expenselife < 1) {
          expense.addedDateFrame.addedToDay = true
          state.totals.todaytotal += Number(expense.amount)}
        if (expenselife < 7)  {
          expense.addedDateFrame.addedToWeek = true
          state.totals.weekTotal += Number(expense.amount)}
        if (expenselife < 30)  {
          expense.addedDateFrame.addedToMonth = true
          state.totals.monthTotal += Number(expense.amount)}
        if (expenselife < 120) {
          expense.addedDateFrame.addedToQuarter = true
          state.totals.threeMonthTotal += Number(expense.amount)}
        if (expenselife < 365)  {
          expense.addedDateFrame.adedToYear = true
          state.totals.oneYearTotal += Number(expense.amount)}
         state.totals.allTimeTotal += Number(expense.amount)


          expense.isMapped = true
        

      localStorage.setItem("totals", JSON.stringify(state.totals));
    })
  } ,

    updateTotal: (state, action) => {
      const now = new Date();
      const weekStart = startOfWeek(now); //
      const weekStartMS = new Date(weekStart).getTime();
      const monthStart = startOfMonth(now);
      const monthStartMS = new Date(monthStart).getTime()
      const yearStart = startOfYear(now)
      const yearStartMS = new Date(yearStart).getTime()
      //expecting object containing id of expense an adjust amount
      console.log("updating", state.totals);


      const expenseDateMS = Date.parse(action.payload.date)
      const expenseLife = (Date.now() - expenseDateMS) / 86_400_000; // in days
      
      console.log("expense life", expenseLife);
      
      state.totals.allTimeTotal += action.payload.adjustAmount;
      if (expenseLife < 365) {
        state.totals.oneYearTotal += action.payload.adjustAmount;
      }
      if (expenseLife < 120) {
        state.totals.threeMonthTotal += action.payload.adjustAmount;
      }
      if (expenseLife < 30) {
        state.totals.monthTotal += action.payload.adjustAmount;
      }
      if (expenseLife < 7) {
        state.totals.weekTotal += action.payload.adjustAmount;
      }
      if (expenseLife < 1) {
        state.totals.todaytotal += action.payload.adjustAmount;
      }
      if(expenseDateMS > weekStartMS) {
        state.totals.thisWeekTotal += action.payload.adjustAmount
      }
      if(expenseDateMS > monthStartMS){
        state.totals.thisMonthTotal += action.payload.adjustAmount

      }
      if(expenseDateMS > yearStartMS){
        state.totals.thisYearTotal += action.payload.adjustAmount

      }

      localStorage.setItem("totals", JSON.stringify(state.totals))

      
    },

    setBalance: (state, action) => {
      state.balance.monthlyBalance =
        state.budget.monthlyBudget - state.totals.monthTotal;
      state.balance.dailyBalance =
        state.budget.monthlyBudget / 30 - state.totals.todaytotal;
      state.balance.weeklyBalance =
        (state.budget.monthlyBudget / 30) * 7 - state.totals.weekTotal;
      state.balance.quaterlyBalance =
        state.budget.monthlyBudget * 3 - state.totals.threeMonthTotal;
      state.balance.yearlyBalance =
        (state.budget.monthlyBudget / 30) * 365 - state.totals.oneYearTotal;

      localStorage.setItem(
        "balance",
        JSON.stringify({
          dailyBalance: state.balance.dailyBalance,
          weeklyBalance: state.balance.weeklyBalance,
          monthlyBalance: state.balance.monthlyBalance,
          quaterlyBalance: state.balance.quaterlyBalance,
          yearlyBalance: state.balance.yearlyBalance,
        })
      );
    },

    setBudget: (state, action) => {
      state.budget.monthlyBudget = action.payload;
      localStorage.setItem("budget", JSON.stringify(state.budget));
    },
  },
});

export const {
  addItem,
  deleteItem,
  updateItems,
  calculateTotal,
  setBalance,
  setBudget,
  updateTotal,
} = expenseSlice.actions; // to use the reducers from components
export default expenseSlice.reducer; // for store
