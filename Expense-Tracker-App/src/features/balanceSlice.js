import { createSlice } from "@reduxjs/toolkit";

export const balanceSlice = createSlice({
    name : "balance",
    initialState : {
        balance : 0
    },
    reducers : {
        updateBalance : (state,action) =>{
            state.balance = action.payload
        }
    }

})