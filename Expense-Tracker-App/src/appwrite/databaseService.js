// for appwrite database , uploading files and custom queries

import conf from "./conf";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Services {
    client = new Client();
    database;
    storage; // bucket

    constructor() {
        this.client
            .setEndpoint(conf.appwritreURL)
            .setProject(conf.appwritreProjectID);
        this.storage = new Storage(this.client);
        this.database = new Databases(this.client);
    }


    // note in most of the methods we are returning file and  post we we can use them when needed
    async createUserDocument(email) {
        console.log("id", email);

        try {
            const response = await this.database.createDocument(conf.appwritreDatabaseID, conf.appwritreCollectionID, ID.unique(), {

                email,
                expenses: "[]",
                totals: JSON.stringify({
                    todaytotal: 0,
                    weekTotal: 0,
                    monthTotal: 0,
                    threeMonthTotal: 0,
                    oneYearTotal: 0,
                    allTimeTotal: 0,
                    thisWeekTotal: 0,
                    thisMonthTotal: 0,
                    thisYearTotal: 0
                }),
                balance: JSON.stringify({
                    dailyBalance: 0,
                    weeklyBalance: 0,
                    monthlyBalance: 0,
                    quaterlyBalance: 0,
                    yearlyBalance: 0,
                },),

                budget: JSON.stringify({
                    monthlyBudget: 0,
                    dailyBudget: 0,
                })
            })
            console.log(response);
            return response


        }

        catch (error) {
            console.error(error);

        }
    }

    async updateUserDocument({ email, expenses, totals, balance, budget, documentID }) {
        try {
            console.log(documentID);

            const response = await this.database.updateDocument(
                conf.appwritreDatabaseID,
                conf.appwritreCollectionID,
                documentID, {

                email,
                expenses: JSON.stringify(expenses),
                totals: JSON.stringify(totals),
                balance: JSON.stringify(balance),
                budget: JSON.stringify(budget)
            }
            )

        } catch (error) {
            console.error(error);

        }
    }

    async deleteUserDocument(email) { // delete the userDocument if user deletes its account(after we add delete account feature)
        try {
            await this.database.deleteDocument(
                conf.appwritreDatabaseID,
                conf.appwritreCollectionID,
                email
            )
            return true
        } catch (error) {
            console.error(error);

        }
    }




    async getuserDocument({ email }) {


        try {
            return this.database.listDocuments(
                conf.appwritreDatabaseID,
                conf.appwritreCollectionID,
                [Query.equal("email", email)]
                // note : queries can also be written here in  array
            )
        } catch (error) {
            console.error(error)
        }
    }







}

const appWriteService = new Services()

export default appWriteService