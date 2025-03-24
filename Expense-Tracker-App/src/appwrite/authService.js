// Auth for Our App

// this appwrite auth can be used for any project just copy and paste but read docs for latest services 

import conf from "./conf";

import { Client, Account, ID } from "appwrite"; // ID gives unique id

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwritreURL)
            .setProject(conf.appwritreProjectID);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, username }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                username
            ); // this parameter structure is defined in the docmentation
            console.log(userAccount);

            if (!userAccount) {


                return
            }
            console.log("acc", userAccount);


            return userAccount



        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {

        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {

            return await this.account.get()
        } catch (error) {
            throw error

        }


    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService;
