import {createSlice} from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name : "auth",
    initialState : {
        email : "admin@gmail.com",
        password : "admin"
    },
    reducers : {
        changePassword : (state , action) =>{
            state.password = action.payload
        }
    }
})