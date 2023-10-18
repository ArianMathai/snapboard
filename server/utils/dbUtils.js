import {MongoClient} from "mongodb";
import * as dotenv from 'dotenv'

dotenv.config();

let cachedDB;

const uri = process.env.MONGODB;

export async function connectToDatabase(){
    if(cachedDB){
        return cachedDB;
    }
    try {
        const client = await MongoClient.connect(uri);
        const db = await client.db("messageApp");

        cachedDB = db;
        return db;
    } catch (error){
        throw error;
    }
}

