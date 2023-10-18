import {ObjectId} from "mongodb";
import {connectToDatabase} from "../utils/dbUtils.js";

export async function postUser(username,password){
    try {

        const db = await connectToDatabase();
        const collection = db.collection("users");
        return await collection.insertOne({username:username, password:password});

    } catch (error) {
        throw error;
    }
}

export async function getUserCredentials(username, password){
    try {

        const db = await connectToDatabase();
        const collection = db.collection("users");
        return await collection.find({username:username, password:password}).toArray();

    } catch (error){
        throw error;
    }
}

export async function getUserById(userId) {
    try {

        const db = await connectToDatabase();
        const collection = db.collection("users");


        const userIdObj = new ObjectId(userId);

        return await collection.findOne({ _id: userIdObj });

    } catch (error) {
        throw error;
    }
}
export async function getUserByUsername(username){
    try{
        const db = await connectToDatabase();
        const collection = db.collection("users");

        return await collection.findOne({username: username});

    } catch (error){
        throw error;
    }
}
