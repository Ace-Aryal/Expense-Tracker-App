import { createSlice } from "@reduxjs/toolkit";

export const balanceSlice = createSlice({
    name : "balance",
    initialState : {
        balance : 0
    },
    reducers : {
        addBalance : (state ,action) => {
            state.balance = action.payload //
        }
        ,
        updateBalance : (state,action) =>{
            state.balance = action.payload
        }
    }

})
export const {updateBalance} = balanceSlice.actions // to use the action in the component
export default balanceSlice.reducer // to store the state in the store.js file
