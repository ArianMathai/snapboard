import {
    getGoogleUserBySubString,
    getGoogleUserByUsername, getGoogleUsernameBasedOnId,
    getUserByUsername,
    getUserCredentials,
    postGoogleUserBasedOnSubString,
    postUser
} from "../repository/userDataAccess.js";
import {verifyPassword,hashPassword} from "../utils/sha256.js";
import jwt from "jsonwebtoken";

export async function registerUser(username, password){
    try{
        const isAlreadyUser = await getUserByUsername(username);

        if(isAlreadyUser){
            return {success:false,message:"Choose another username"};
        }

        const userObject = await postUser(username, hashPassword(password));

        if(!userObject.acknowledged){
            console.log("failed to post user")
            return {success:false,message:"Failed to post user to database"};
        }
        return {success:true,message:""};
    }
    catch (error){
        throw error;
    }
}

export async function registerGoogleUser(subString, username){
    try {

        const isAlreadyUser = await getUserByUsername(username);
        const isGoogleUser = await getGoogleUserByUsername(username);

        if(isAlreadyUser || isGoogleUser){
            return {success:false,message:"Choose another username"};
        }

        const userObject = await postGoogleUserBasedOnSubString(subString,username);

        const userId = await getGoogleUsernameBasedOnId(userObject.insertedId);


        if(!userObject.acknowledged){
            console.log("failed to post user")
            return {success:false,message:"Failed to post user to database"};
        }

        return {success:true,message:"Created google user",userId:userId};

    } catch (error){
        throw error;
    }
}

export async function userLogin(username, password){
    try {

        const user = await getUserByUsername(username);

        if(!user){
            return {success:false,message:"Login Failed."};
        }

        const isVerified = verifyPassword(password,user.password);

        const id = user._id;

        if (!isVerified){
            return {success:false,message:"Login failed"};
        }

        const token = jwt.sign(user,process.env.MY_SECRET,{ expiresIn: "1h"});

        return {success:true, message: "Successful login", id:id,token:token};
    } catch (error){
        throw error;
    }
}

export async function getUserBySubString(sub){

    try {

        const userObject = await getGoogleUserBySubString(sub);

        if(!userObject){
            return {success:false,message:"Login Failed.",user:userObject};
        }

        return {success:true,message:"Google user found.",user:userObject};

    }catch (error){
        throw error;
    }

}