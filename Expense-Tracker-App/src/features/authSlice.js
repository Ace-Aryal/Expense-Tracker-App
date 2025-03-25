import { createSlice, current } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: "credentials",
    initialState: {
        currentUser: {
            username: "Admin",
            email: ""
        },
        credentialsList: JSON.parse(localStorage.getItem("accounts")) || [
        ]
    },
    reducers: {
        createAccount: (state, action) => {
            state.credentialsList.push(action.payload)
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        }

    }
})

export const { createAccount, setCurrentUser } = authSlice.actions
export default authSlice.reducer