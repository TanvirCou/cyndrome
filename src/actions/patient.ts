"use server"
import { users } from "@/lib/appwrite.config";
import { ID } from "node-appwrite";

export const CreateUser = async(user: CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(), // userId
            user.email, // email (optional)
            user.phoneNumber, // phone (optional)
            undefined, // password (optional)
            user.fullName // name (optional)
        );
    
        return newUser;
    } catch (error) {
        // Todo: Need to add case for error
        console.log(error);
        
    }
}