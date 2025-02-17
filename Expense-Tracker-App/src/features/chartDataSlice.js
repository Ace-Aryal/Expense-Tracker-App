import {createSlice} from "@reduxjs/toolkit"
import { parseISO, format } from 'date-fns';
export const chartSlice = createSlice({
    name : "chartData" ,
    initialState : {
       datas : {
        weekData : [],
        monthData : []
       }

    
    },
    reducers : {
        createDatasFromExpenseData : (state , action)=>{
            class DailyExpensesTotals {
                constructor(date,amount) {
                    this.date = date,
                    this.amount = amount
                }
            }


            //action.payload is either 7 or 30
           const expensesData =  JSON.parse(localStorage.getItem("expenses")) || []
            

                      // this variale temporarily stores the data either of 7 days or 30 days ,
         const helperDataStorer =  expensesData.map(expense=> {if ((Date.now()- expense.id)/86400000 < action.payload ) {
            return expense
         } })

         helperDataStorer.map(expense => {
            const sameDayExpenseArray = expensesData.filter(item=> item.date === expense.date)
            let dailyAmount = 0
            console.log("expense", expense);
            
           

            const dateString = expense.date // YY-MM-DD format
            console.log(dateString);
            

            const formattedDate = format(parseISO(dateString), "MMM-d"); // Outputs: Feb-16

           
            sameDayExpenseArray.map(expense => {
              
                
                dailyAmount += Number(expense.amount)
            })
            
            if(action.payload === 7) state.datas.weekData.push(new DailyExpensesTotals(formattedDate,dailyAmount))
            if(action.payload === 30) state.datas.monthData.push(new DailyExpensesTotals(formattedDate,dailyAmount))
            
         })
        }
    }
})
export const {createDatasFromExpenseData} = chartSlice.actions
export default chartSlice.reducer