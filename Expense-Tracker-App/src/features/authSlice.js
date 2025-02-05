import {createSlice} from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name : "credentials",
    initialState : {
        credentialsList:[{
        email : "admin@gmail.com",
        password : "admin"
    }]},
    reducers : {
        changePassword : (state , action) =>{
            state.password = action.payload
        }
    }
})

export const {changePassword} = authSlice.actions
export default authSlice.reducer