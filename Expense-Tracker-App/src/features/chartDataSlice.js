import { createSlice } from "@reduxjs/toolkit";
import { parseISO, format } from "date-fns";
import { useSelector } from "react-redux";
import { useEffect } from "react";
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
        constructor(date, amount ,id , dataBuildingId = []) {
          (this.date = date), 
          (this.amount = Number(amount)), 
          (this.id = id ),
          (this.dataBuildingIds =  dataBuildingId)
          ;
        }

        toPlainObject(){ // to make classes serializable
          return {
            date : this.date ,
            amount : this.amount,
            id : this.id,
            dataBuildingIds : this.dataBuildingIds
          }
        }

        
      }

      //action.payload is either 7 or 30
      const expensesData = JSON.parse(localStorage.getItem("expenses")) || [];
      
      console.log("expensedata",expensesData);
      
      // this variale temporarily stores the data either of 7 days or 30 days ,
        const helperDataStorer = expensesData.filter((expense) => { // filter only returns if condn is true but mp always returns sth
          console.log("expense", expense.date);
          const expenseDateMS = Date.parse(expense.date)
        
         
         
          
          if ((Date.now() - expenseDateMS) / 86400000< action.payload) {
            console.log(expense);
            
            return expense;
          }
          
        });
  console.log("helper data storer", helperDataStorer);
  
      helperDataStorer.map((expense, index) => {  // 1st outer loop 
        let dailyAmount = 0;
        let date = "";
        let isOnState = false;

        helperDataStorer.map((item, index) => { // 2nd outer loop
          // these two loops calculate daily amount for a day 
          if (item.date === expense.date) {
            date = item.date;
            dailyAmount += Number(item.amount);
          }
        });

          if (action.payload === 7) { // for 7 day graoh
            
            state.datas.weekData.map((item, index) => {
              const formattedDate = format(parseISO(expense.date), "MMM-d"); // date format like Apr-9
             

              
              if (item.date === formattedDate) { // if datas  have same date seting to state,
              
                
                console.log("im inside 2nd 7");
                
                state.datas.weekData[index].amount = Number(dailyAmount);
                console.log("expense id", expense.id);
                
                if (!state.datas.weekData[index].dataBuildingIds.includes(expense.id)) {
                  state.datas.weekData[index].dataBuildingIds.push(expense.id)
                }
               
                isOnState = true
              }
            });

            
          }

          if (action.payload === 30) {// same but for 30 day
              state.datas.monthData.map((item, index) => {
              const formattedDate = format(parseISO(expense.date), "MMM-d");
              if (item.date === formattedDate) {

                state.datas.monthData[index].amount = Number(dailyAmount);
                if (!state.datas.monthData[index].dataBuildingIds.includes(expense.id)) {
                  state.datas.monthData[index].dataBuildingIds.push(expense.id) // not pushing the existing expenses for unique
                }
                isOnState = true 
              }
            });
          }

          if(isOnState) return  // if is on state not adding new date just updating as above
                // proceeding for unique date

        // YY-MM-DD format
          const id = Date.parse(date)
         
        const formattedDate = format(parseISO(date), "MMM-d"); // Outputs: Feb-16

        if (action.payload === 7) {
          const DailyExpensesTotal = new DailyExpensesTotals(formattedDate, dailyAmount ,id , [expense.id])
          state.datas.weekData = [ DailyExpensesTotal.toPlainObject(),...state.datas.weekData]
        }
        if (action.payload === 30) {
          const DailyExpensesTotal = new DailyExpensesTotals(formattedDate, dailyAmount ,id , [expense.id])
          state.datas.monthData= [
            DailyExpensesTotal.toPlainObject(),...state.datas.monthData
          ];
        }
      });

       // to delete outdated items
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
     
      
      
      state.datas.weekData.sort((a,b)=> a.id - b.id) // sorting acc to date
      state.datas.monthData.sort((a,b)=> a.id - b.id)
      
    },
    handleDataDelete : (state, action) =>{ // action.payload = {id,amt}
        const {id , deleteAmount} = action.payload
      
      
          state.datas.monthData.map((data,index) => {
           
            if(data.dataBuildingIds.includes(id)) {
             console.log("reached here");
             
              data.amount -= deleteAmount
              console.log("reduced amt");
              
              data.dataBuildingIds = data.dataBuildingIds.filter(data=> data !== id)
            }
            if(state.datas.monthData[index].dataBuildingIds.length === 0) {
              console.log("deleting");
              
              state.datas.monthData = state.datas.monthData.filter(data=> state.datas.monthData.indexOf(data) !== index )
            }
          })

          state.datas.weekData.map((data,index) => {
            if(data.dataBuildingIds.includes(id)) {
              data.amount -= deleteAmount
              data.dataBuildingIds = data.dataBuildingIds.filter(data=> data !== id)
            
              
            }
            if(state.datas.weekData[index].dataBuildingIds.length===0) {
              console.log("deleting state");
              
              state.datas.weekData = state.datas.weekData.filter(data=> state.datas.weekData.indexOf(data) !== index)
            }
          })
    } ,

  

  },
});
export const { createDatasFromExpenseData ,handleDataDelete } = chartSlice.actions;
export default chartSlice.reducer;
