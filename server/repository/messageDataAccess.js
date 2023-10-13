import {MongoClient} from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGODB;
const client = new MongoClient(url);

export async function postUserMessage(message, time, user) {
    try {
        await client.connect();
        const db = await client.db("messageApp");
        const collection = db.collection("snapboard");
        return await collection.insertOne({message: message, time: time, user: user});

    } catch (error) {
        throw error;
    }
}

export async function fetchMessages(){
    try {
        await client.connect();
        const db = await client.db("messageApp");
        const collection = db.collection("snapboard");
        return await collection.find({}).toArray();

    }catch (error){
        throw error;
    }
}
