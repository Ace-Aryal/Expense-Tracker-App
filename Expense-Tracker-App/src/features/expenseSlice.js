import { createSlice } from "@reduxjs/toolkit";

export  const expenseSlice = createSlice({
    name: "expense",
    initialState : {
        expensesList : [{
        id : 1,
        quantity : 1,
        price : 100,
        total : ()=>{
         return    this.price * this.quantity
        }
    } ]},

    reducers : {
        addItem : (state, action) =>{
            state.push(action.payload)
        },
        deleteItem : (state, action ) =>{ //expecting id as payload
            state =  action.payload 
        }
    }
})
export const {addItem, deleteItem} = expenseSlice.actions
export default expenseSlice.reducer