import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: "credentials",
    initialState: {
        credentialsList: JSON.parse(localStorage.getItem("accounts")) || [
        ]
    },
    reducers: {
        createAccount: (state, action) => {
            state.credentialsList.push(action.payload)
        }
    }
})

export const { createAccount } = authSlice.actions
export default authSlice.reducer