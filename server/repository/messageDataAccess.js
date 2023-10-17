import {connectToDatabase} from "../utils/dbUtils.js";

export async function postUserMessage(message, time, user) {
    try {

        const db = await connectToDatabase();
        const collection = db.collection("snapboard");
        return await collection.insertOne({message: message, time: time, user: user});

    } catch (error) {
        throw error;
    }
}

export async function fetchMessages(){
    try {
        const db = await connectToDatabase();
        const collection = db.collection("snapboard");
        return await collection.find({}).toArray();

    }catch (error){
        throw error;
    }
}
