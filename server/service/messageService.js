import {fetchMessages, postUserMessage, deletePostById} from "../repository/messageDataAccess.js";
import {getUserById} from "../repository/userDataAccess.js";

export async function addMessage(message, time, id) {


        let timeToDelete = "";

        if (time!== "forever"){
            parseInt(time);
            time = time * 1000 * 60;
        }

        if (time !== "forever") {
            const newTime = Date.now() + parseInt(time);
            timeToDelete = newTime.toString()
        } else {
            timeToDelete = time;
        }

    try {

        const user = await getUserById(id);

        const isPosted = await postUserMessage(message, timeToDelete, user.username);

        if (!isPosted.acknowledged) {
            return {success: false, message: "Failed to post message"}
        }
        return {success: true, message: "Posted message"}

    } catch (error) {
        throw error;
    }
}

export async function deletePost(id){

    try {

        const isDeleted = await deletePostById(id);

        if(!isDeleted.acknowledged){
            return {success: false, message: "Failed to delete post"}
        }

        return {success: true, message: "Posted deleted"}

    } catch (error){
        throw error;
    }
}

export async function getAllMessages(id){

    try {
        const user = await getUserById(id);

        const messages = await fetchMessages();
        const messagesToReturn = [];


        if(messages.length === 0){
            return {success:false, message:"No messages posted.", messages:messages}
        }

        for (let i = 0; i < messages.length; i++) {
            if (messages[i].time === "forever" || (parseInt(messages[i].time) > Date.now())) {
                messagesToReturn.push({
                    ...messages[i],
                    canDelete: messages[i].user === user.username
                });
            }
        }

        return {success:true, message:"Retrieved messages", messages:messagesToReturn};

    }catch (error){
        throw error;
    }
}