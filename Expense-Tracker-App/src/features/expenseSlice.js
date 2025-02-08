import { createSlice } from "@reduxjs/toolkit";

export  const expenseSlice = createSlice({
    name: "expense",
    initialState : {
        expenses : JSON.parse(localStorage.getItem("expenses")) || [ ], // use this general syntax to avoid any unnecessary errors
    },

    reducers : {
        addItem : (state = initialState, action) =>{//expecting object as payload
            state.expenses.unshift(action.payload) 
            
            localStorage.setItem('expenses', JSON.stringify(state.expenses))
                },

        deleteItem : (state = initialState, action ) =>{ //expecting id as payload
            console.log(action.payload);
            
            state.expenses =  state.expenses.filter(item => item.id !== action.payload)
            localStorage.setItem('expenses', JSON.stringify(state.expenses))
             // in reudux toolkit we can mutate the state directly but not in react with useState
        }
    
    }
})
export const {addItem, deleteItem} = expenseSlice.actions // to use the reducers from components
export default expenseSlice.reducer // for store 