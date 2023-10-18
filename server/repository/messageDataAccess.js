import {connectToDatabase} from "../utils/dbUtils.js";
import {ObjectId} from "mongodb";

export async function postUserMessage(message, time, user) {
    try {

        const db = await connectToDatabase();
        const collection = db.collection("snapboard");
        return await collection.insertOne({message: message, time: time, user: user});

    } catch (error) {
        throw error;
    }
}

export async function deletePostById(id){

    const postId = new ObjectId(id);

    try {

        const db = await connectToDatabase();
        const collection = db.collection("snapboard");
        return await collection.deleteOne({_id:postId})

    }catch (error){
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
