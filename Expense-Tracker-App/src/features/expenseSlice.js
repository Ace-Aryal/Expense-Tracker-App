import { createSlice, current } from "@reduxjs/toolkit";

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
    documentID: null,
    expenses: [], // use this general syntax to avoid any unnecessary errors
    totals: {
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
    balance: {
      dailyBalance: 0,
      weeklyBalance: 0,
      monthlyBalance: 0,
      quaterlyBalance: 0,
      yearlyBalance: 0,
    },
    budget: {
      monthlyBudget: 0,
      dailyBudget: 0,
    },
    catagoryExpenseData: [
      { name: "Food", value: 0, color: "indigo" },
      { name: "Transport", value: 0, color: "indigo" },
      { name: "Lodging", value: 0, color: "indigo" },
      { name: "Gadgets", value: 0, color: "indigo" },
      { name: "Fees", value: 0, color: "indigo" },
      { name: "Bills", value: 0, color: "indigo" },
      { name: "Miscellanous", value: 0, color: "indigo" },
      { name: "Others", value: 0, color: "indigo" },
    ],
  },

  reducers: {
    setDatas: (state, action) => {
      state.documentID = action.payload.documentID
      state.expenses = action.payload.expenses
      state.totals = action.payload.totals
      state.budget = action.payload.budget
      state.balance = action.payload.balance
    },

    addItem: (state = initialState, action) => {
      //expecting object as payload

      state.expenses = [...state.expenses, action.payload].sort( // sort acc to date
        (a, b) =>
          Number(b.date.split("-").join("")) -
          Number(a.date.split("-").join(""))
      )

    },

    deleteItem: (state = initialState, action) => {
      //expecting id as payload

      const updatedExpense = state.expenses.filter(
        (item) => item.id !== action.payload
      );

      state.expenses = updatedExpense;

      // in reudux toolkit we can mutate the state directly but not in react with useState
    },

    updateItems: (state = initialState, action) => {
      state.expenses = state.expenses.map((expense) => {
        if (expense.id !== action.payload.id) {
          return expense;
        }
        return action.payload;
      });
    },

    calculateTotal: (state, action) => {
      const now = new Date();
      const weekStart = startOfWeek(now); //
      const weekStartMS = new Date(weekStart).getTime();
      const monthStart = startOfMonth(now);
      const monthStartMS = new Date(monthStart).getTime();
      const yearStart = startOfYear(now);
      const yearStartMS = new Date(yearStart).getTime();

      // total: state. total :)

      state.expenses.map((expense) => {
        const expenseDateMS = Date.parse(expense.date);
        const expenselife = Math.floor((Date.now() - expenseDateMS) / 86400000);

        if (expense.isMapped) {
          // updates the total if the totals are outdated
          if (expenselife > 1 && expense.addedDateFrame.addedToDay) {
            state.totals.todaytotal -= expense.amount
            expense.addedDateFrame.addedToDay = false
          };
          if (expenselife > 7 && expense.addedDateFrame.addedToWeek) {
            state.totals.weekTotal -= expense.amount
            expense.addedDateFrame.addedToWeek = false
          };
          if (expenselife > 30 && expense.addedDateFrame.addedToMonth) {
            state.totals.monthTotal -= expense.amount
            expense.addedDateFrame.addedToMonth = false
          };
          if (expenselife > 90 && expense.addedDateFrame.addedToQuarter) {
            state.totals.threeMonthTotal -= expense.amount
            expense.addedDateFrame.addedToQuarter = false
          };
          if (expenselife > 365 && expense.addedDateFrame.adedToYear) {
            state.totals.oneYearTotal -= expense.amount
            expense.addedDateFrame.adedToYear = false
          };
          if (
            expense.addedDateFrame.addedToCalenderWeek &&
            expenseDateMS < weekStartMS
          ) {
            state.totals.thisWeekTotal -= expense.amount
            expense.addedDateFrame.addedToCalenderWeek = false
          };
          if (
            expense.addedDateFrame.addedToCalenderMonth &&
            expenseDateMS < monthStartMS
          ) {
            state.totals.thisMonthTotal -= expense.amount
            expense.addedDateFrame.addedToCalenderMonth = false
          };
          if (
            expense.addedDateFrame.addedToCalenderYear &&
            expenseDateMS < yearStartMS
          ) {
            state.totals.thisYearTotal -= expense.amount
            expense.addedDateFrame.addedToCalenderYear = false;
          };


          return;
        }

        if (expenseDateMS > weekStartMS) {
          expense.addedDateFrame.addedToCalenderWeek = true;
          state.totals.thisWeekTotal += Number(expense.amount);
        }
        if (expenseDateMS > monthStartMS) {
          expense.addedDateFrame.addedToCalenderMonth = true;
          state.totals.thisMonthTotal += Number(expense.amount);
        }
        if (expenseDateMS > yearStartMS) {
          expense.addedDateFrame.addedToCalenderYear = true;
          state.totals.thisYearTotal += Number(expense.amount);
        }
        if (expenselife < 1) {
          expense.addedDateFrame.addedToDay = true;
          state.totals.todaytotal += Number(expense.amount);
        }
        if (expenselife < 7) {
          expense.addedDateFrame.addedToWeek = true;
          state.totals.weekTotal += Number(expense.amount);
        }
        if (expenselife < 30) {
          expense.addedDateFrame.addedToMonth = true;
          state.totals.monthTotal += Number(expense.amount);
        }
        if (expenselife < 90) {
          expense.addedDateFrame.addedToQuarter = true;
          state.totals.threeMonthTotal += Number(expense.amount);
        }
        if (expenselife < 365) {
          expense.addedDateFrame.adedToYear = true;
          state.totals.oneYearTotal += Number(expense.amount);
        }
        state.totals.allTimeTotal += Number(expense.amount);

        expense.isMapped = true; // flags if totals are calculated or not using the expense

      });
    },

    updateTotal: (state, action) => {
      const now = new Date();
      const weekStart = startOfWeek(now); //
      const weekStartMS = new Date(weekStart).getTime();
      const monthStart = startOfMonth(now);
      const monthStartMS = new Date(monthStart).getTime();
      const yearStart = startOfYear(now);
      const yearStartMS = new Date(yearStart).getTime();
      //expecting object containing id of expense an adjust amount

      const expenseDateMS = Date.parse(action.payload.date);
      const expenseLife = (Date.now() - expenseDateMS) / 86_400_000; // in days


      state.totals.allTimeTotal += action.payload.adjustAmount;
      if (expenseLife < 365) {
        state.totals.oneYearTotal += action.payload.adjustAmount;
      }
      if (expenseLife < 90) {
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
      if (expenseDateMS > weekStartMS) {
        state.totals.thisWeekTotal += action.payload.adjustAmount;
      }
      if (expenseDateMS > monthStartMS) {
        state.totals.thisMonthTotal += action.payload.adjustAmount;
      }
      if (expenseDateMS > yearStartMS) {
        state.totals.thisYearTotal += action.payload.adjustAmount;
      }

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


    },

    setBudget: (state, action) => {
      state.budget.monthlyBudget = action.payload;
      state.budget.dailyBudget = Math.floor(action.payload / 30);
      state.budget.weeklyBudget = Math.floor((action.payload / 30) * 7);
      state.budget.quaterBudget = Math.floor(action.payload * 3);
      state.budget.yearBudget = Math.floor((action.payload * 365) / 30);
    },

    createExpensesAccToCatagory: (state, action) => {

      state.catagoryExpenseData = [
        { name: "Food", value: 0, color: "indigo" },
        { name: "Transport", value: 0, color: "gray" },
        { name: "Lodging", value: 0, color: "red" },
        { name: "Gadgets", value: 0, color: "grape" },
        { name: "Fees", value: 0, color: "cyan" },
        { name: "Bills", value: 0, color: "teal" },
        { name: "Miscellanous", value: 0, color: "limw" },
        { name: "Others", value: 0, color: "orange" },
      ]

      const helperDataStorer = state.expenses.filter(
        (expense) => {
          const expenseDateMS = Date.parse(expense.date)


          if ((Date.now() - expenseDateMS) / 86400000 < action.payload) {



            return expense
          }
        }
      );
      ;

      helperDataStorer.forEach((expense) => {
        state.catagoryExpenseData.forEach((item) => {

          if (expense.category.toLowerCase() === item.name.toLowerCase()) {


            item.value += Number(expense.amount)
          }
        });
      });
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
  createExpensesAccToCatagory,
  setDatas
} = expenseSlice.actions; // to use the reducers from components
export default expenseSlice.reducer; // for store
