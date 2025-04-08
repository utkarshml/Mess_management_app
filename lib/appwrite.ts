import { MessOwner } from '@/types/custom';
import { Client, Account, Databases, ID, Query , Storage, AppwriteException } from 'appwrite';


const APPWRITE_DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const APPWRITE_PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID; 
const APPWRITE_MEAL_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_MEAL_COLLECTION_ID;
const APPWRITE_STUDENT_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_STUDENT_COLLECTION_ID;
const APPWRITE_ATTENDANCE_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_ATTENDANCE_COLLECTION_ID;
const APPWRITE_MESS_OWNER_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_MESS_OWNER_COLLECTION_ID;
const APPWRITE_WALLET_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_WALLET_COLLECTION_ID;
const APPWRITE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const APPWRITE_BUCKET_ID = process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID;

export default class AppwriteAuth {
    private client: Client;
    private account: Account;
    private databases: Databases;
    private databaseId: string;
    private mealCollectionId: string;
    private studentCollectionId: string;
    private attendanceCollectionId: string;
    private messOwnerCollectionId: string;
    private walletCollectionId: string;
    private bucketId: string;
    private storage : Storage;


    constructor() {
        // Initialize the Appwrite client

        this.client = new Client()
            .setEndpoint(APPWRITE_ENDPOINT as string)
            .setProject(APPWRITE_PROJECT_ID as string);
        

        // Initialize the Account service
        this.databaseId = APPWRITE_DATABASE_ID as string;
        this.mealCollectionId = APPWRITE_MEAL_COLLECTION_ID as string;
        this.attendanceCollectionId = APPWRITE_ATTENDANCE_COLLECTION_ID as string;
        this.studentCollectionId = APPWRITE_STUDENT_COLLECTION_ID as string;
        this.messOwnerCollectionId = APPWRITE_MESS_OWNER_COLLECTION_ID as string;
        this.walletCollectionId = APPWRITE_WALLET_COLLECTION_ID as string;
        this.bucketId = APPWRITE_BUCKET_ID as string;
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    /**
     * Logs in a user with email and password.
     * @param email - The user's email address.
     * @param password - The user's password.
     * @returns A Promise that resolves to the session data or rejects with an error.
     */
    async login(email: string, password: string): Promise<any> {
        try{
            const response = await this.account.createEmailPasswordSession(email, password);
            return response;
        }catch(error){
            throw error;
        }
    }

    /**
     * Logs out the current user by deleting all sessions.
     * @returns A Promise that resolves when the logout is complete or rejects with an error.
     */
    async logout(): Promise<void> {
        try {
            await this.account.deleteSessions();
            console.log('Logout successful');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Gets the current user's information.
     * @returns A Promise that resolves to the user data or rejects with an error.
     */
    async getCurrentUser(): Promise<any> {
        try {
            const user =  await this.account.get();
            return user;
        } catch (error ) {
            console.log(error)
            throw error;
        }
    }
    async setMeal(messOwnerId : string, meal_type: "breakfast" | "lunch" | "snacks" | "dinner", start_time: Date, end_time: Date, price: number , description: string = '') {
        try {
            // Add the user details to the database
            const result = await this.databases.createDocument(
                this.databaseId, // Database ID
                this.mealCollectionId, // Collection ID
                ID.unique(), // Generate a unique ID for the document
                {
                    messOwner : messOwnerId, meal_type, start_time, end_time,description , price
                }
            );
            return result; // Return the created document
        } catch (error) {
            throw error; // Re-throw the error for handling by the caller
        }
    }

    async getMeals(messOwnerId: string) {
        
        if (!messOwnerId) {
            throw new Error("messOwnerId is required for the query.");
        }
        try {
            const result = await this.databases.listDocuments(
                this.databaseId, // Database ID
                this.mealCollectionId, // Collection ID
                [
                    Query.equal("messOwner", messOwnerId),
                    // Query.greaterThanEqual("end_time", new Date().toISOString())

                ])
            return result;
        } catch (error) {
            throw error; // Re-throw the error for handling by the caller
        }

    }
    async getMealById(mealId: string) {
        try {
            const result = await this.databases.getDocument(
                this.databaseId, // Database ID
                this.mealCollectionId, // Collection ID
                mealId // Document ID
            )
            return result;
        } catch (error) {
            throw error; // Re-throw the error for handling by the caller
        }
    }

    async getStudent(email_id: string) {
        try {
            const result = await this.databases.listDocuments(
                this.databaseId, // Database ID
                this.studentCollectionId, // Collection ID
                [
                    Query.equal("email", email_id)
                ])
            return result;
        } catch (error) {

            throw error; // Re-throw the error for handling by the caller
        }
    }
    async getMessOwner(email_id: string) {
        try {
            const result = await this.databases.listDocuments(
                this.databaseId, // Database ID
                this.messOwnerCollectionId, // Collection ID
                [
                    Query.equal("email", email_id)
                ])
            return result;
        } catch (error) {
            throw error; // Re-throw the error for handling by the caller
        }
    }
async uploadImage(file: File): Promise<any> {
    try {
        const result = await this.storage.createFile(
            this.bucketId, // Bucket ID
            ID.unique(), // Generate a unique ID for the file
            file // File object to be uploaded
        );
        return result; // Return the uploaded file details
    } catch (error) {
        const err = error as AppwriteException
        console.log(err.message)
        throw error; // Re-throw the error for handling by the caller
    }
}
async updateProfile(userId: string, updatedData: Partial<MessOwner>): Promise<any> {
    try {
        const result = await this.databases.updateDocument(
            this.databaseId, // Database ID
            this.messOwnerCollectionId, // Collection ID
            userId, // Document ID (user ID)
            updatedData // Data to update
        );
        return result; // Return the updated document details
    } catch (error) {
        console.log("Error updating profile:", error);
        throw error; // Re-throw the error for handling by the caller
    }
}

    async getAttendance(mealId: string) {
        try {
            const result = await this.databases.listDocuments(
                this.databaseId, // Database ID
                this.attendanceCollectionId, // Collection ID
                [
                    Query.equal("meals", mealId),
                ])
            return result; // Return the attendance
        } catch (error) {
            console.log("Error fetching attendance:", error);
            throw error; // Re-throw the error for handling by the caller
        }
    }
    async getMealsByMessOwnerAndDate(messOwnerId: string, date: Date) {
        try {
            const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const result = await this.databases.listDocuments(
                this.databaseId, // Database ID
                this.mealCollectionId, // Collection ID
                [
                    Query.equal("messOwner", messOwnerId),
                    Query.greaterThanEqual("start_time", startDate.toISOString()),
                ])
            return result; // Return the meals
        } catch (error) {
            console.log("Error fetching meals:", error);
            throw error; // Re-throw the error for handling by the caller
        }
    }

}
