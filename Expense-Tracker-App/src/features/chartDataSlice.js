import { createSlice } from "@reduxjs/toolkit";
import { parseISO, format } from "date-fns";
export const chartSlice = createSlice({
  name: "chartData",
  initialState: {
    datas: {
      weekData: [],
      monthData: [],
    },
  },
  reducers: {
    createDatasFromExpenseData: (state, action) => {
      class DailyExpensesTotals {
        constructor(date, amount ,id) {
          (this.date = date), 
          (this.amount = Number(amount)), 
          (this.id = id )
          ;
        }
      }

      //action.payload is either 7 or 30
      const expensesData = JSON.parse(localStorage.getItem("expenses")) || [];

      // this variale temporarily stores the data either of 7 days or 30 days ,
      const helperDataStorer = expensesData.map((expense) => {
        if ((Date.now() - expense.id) / 86400000 < action.payload) {
          return expense;
        }
      });

      helperDataStorer.map((expense, index) => {
        let dailyAmount = 0;
        let date = "";
        let isOnState = false;

        helperDataStorer.map((item, index) => {
          if (item.date === expense.date) {
            date = item.date;
            dailyAmount += Number(item.amount);
          }
        });

          if (action.payload === 7) {
            
            state.datas.weekData.map((item, index) => {
              const formattedDate = format(parseISO(expense.date), "MMM-d");
              console.log(item.date,formattedDate);

              
              if (item.date === formattedDate) {
              
                
                console.log("im inside 2nd 7");
                
                state.datas.weekData[index].amount = Number(dailyAmount);
                isOnState = true
              }
            });

            
          }

          if (action.payload === 30) {
              state.datas.monthData.map((item, index) => {
              const formattedDate = format(parseISO(expense.date), "MMM-d");
              if (item.date === formattedDate) {
                state.datas.monthData[index].amount = Number(dailyAmount);
                isOnState = true
              }
            });
          }

          if(isOnState) return
          

        // YY-MM-DD format
          const id = Date.parse(date)
         
        const formattedDate = format(parseISO(date), "MMM-d"); // Outputs: Feb-16

        if (action.payload === 7) {
          
          
          state.datas.weekData = [  new DailyExpensesTotals(formattedDate, dailyAmount ,id),...state.datas.weekData]
        }
        if (action.payload === 30) {
          state.datas.monthData= [(
            new DailyExpensesTotals(formattedDate, dailyAmount ,id)),...state.datas.monthData
          ];
        }
      });

      ( () => { // to delete outdated items
        if (action.payload == 7) {
          helperDataStorer.map((expense) => {
            const filteredArray =
              state.datas.weekData.filter(
                (item) => item.date === expense.date
              ) || [];

            if (filteredArray.length != 0) return;

            const newStateArray = state.datas.weekData.filter(
              (item) => item.date !== expense.data
            );
            state.datas.weekData = newStateArray;
            return;
          });

          if (action.payload == 30) {
            helperDataStorer.map((expense) => {
              const filteredArray =
                state.datas.weekData.filter(
                  (item) => item.date === expense.date
                ) || [];

              if (filteredArray.length != 0) return;

              const newStateArray = state.datas.monthData.filter(
                (item) => item.date !== expense.data
              );
              state.datas.monthData = newStateArray;
            });
          }
        }
      })();
      
      
      state.datas.weekData.sort((a,b)=> a.id - b.id)
    },
  },
});
export const { createDatasFromExpenseData } = chartSlice.actions;
export default chartSlice.reducer;
