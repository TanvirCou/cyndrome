import * as sdk from 'node-appwrite';

export const {PROJECT_ID, API_KEY, DATABASE_ID, PATIENT_COLLECTION_ID, DOCTOR_COLLECTION_ID, APPOINTMENT_COLLECTION_ID, NEXT_PROJECT_BUCKET_ID, NEXT_PROJECT_ENDPOINT} = process.env;

export const client = new sdk.Client();

client
    .setEndpoint(NEXT_PROJECT_ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!);
    
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);