import { createSlice, current } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: "credentials",
    initialState: {
        currentUser: {
            username: "Admin",
            email: "",
            isDocumentCreated: false
        },
        credentialsList: [
        ]
    },
    reducers: {
        createAccount: (state, action) => {
            state.credentialsList.push(action.payload)
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        setIsDocumentCreated: (state, action) => {
            state.currentUser.isDocumentCreated = action.payload
        }

    }
})

export const { createAccount, setCurrentUser, setIsDocumentCreated } = authSlice.actions
export default authSlice.reducer