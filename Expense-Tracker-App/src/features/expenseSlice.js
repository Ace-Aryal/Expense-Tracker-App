import { createSlice } from "@reduxjs/toolkit";

export  const expenseSlice = createSlice({
    name: "expense",
    initialState :  [{
            id: 1,
            expense: "Grocery",
            amount: 200,
            date: "2021-09-01",
            category: "Food"
        },
        {
            id: 2,
            expense: "Rent",
            amount: 2000,
            date: "2021-09-01",
            category: "Home"
        
    } ],

    reducers : {
        addItem : (state = initialState, action) =>{ //expecting object as payload
            state.push(action.payload)
            
            
        },
        deleteItem : (state, action ) =>{ //expecting id as payload
            state =  action.payload 
        }
    }
})
export const {addItem, deleteItem} = expenseSlice.actions
export default expenseSlice.reducer