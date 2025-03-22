import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: "credentials",
    initialState: {
        credentialsList: [{
            username: "developer",
            email: "admin@gmail.com",
            password: "admin"
        }
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