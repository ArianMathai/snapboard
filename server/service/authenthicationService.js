import {getUserByUsername, getUserCredentials, postUser} from "../repository/userDataAccess.js";
import {verifyPassword,hashPassword} from "../utils/sha256.js";

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
    }
}

export async function userLogin(username, password){
    try {

        const user = await getUserByUsername(username);

        if(!user){
            return {success:false,message:"Not a valid username."};
        }

        const isVerified = verifyPassword(password,user.password);

        const id = user._id;
        if (!isVerified){
            return {success:false,message:"Login failed"};
        }

        return {success:true, message: "Successful login", id:id};
    } catch (error){
        throw error;
    }
}