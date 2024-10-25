"use server"
import { DATABASE_ID, databases, PATIENT_COLLECTION_ID, users } from "@/lib/appwrite.config";
import { ID, Query } from "node-appwrite";

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

export const getUser = async(userID: string) => {
    try {
        const user = await users.get(userID);
        // console.log(user);
        
        return user;
    } catch (error) {
        console.log(error); 
    }
}

export const registerPatient = async(patient: RegisterUserParams) => {
    try {
        
        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            patient
          );

          return newPatient;    
    } catch (error) {
        console.log(error); 
    }
}

export const getPatient = async(userID: string) => {
    try {
        const patient = await databases.listDocuments(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            [Query.equal('userId', [userID])]
        )
        // console.log(patient);

        return patient.documents[0];
    } catch (error) {
        console.log(error); 
    }
}
