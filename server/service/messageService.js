import {fetchMessages, postUserMessage} from "../repository/messageDataAccess.js";
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

        console.log("username: " + user.username)

        const isPosted = await postUserMessage(message, timeToDelete, user.username);

        if (!isPosted.acknowledged) {
            return {success: false, message: "Failed to post message"}
        }
        return {success: true, message: "Posted message"}

    } catch (error) {
        throw error;
    }
}

export async function getAllMessages(){
    try {
        const messages = await fetchMessages();
        const messagesToReturn = [];


        if(messages.length === 0){
            return {success:false, message:"No messages posted.", messages:messages}
        }

        for(let i = 0; i < messages.length; i++){
            if(messages[i].time === "forever"){
                messagesToReturn.push(messages[i]);
            }

            if(parseInt(messages[i].time) > Date.now()){
                messagesToReturn.push(messages[i]);
            }
        }

        return {success:true, message:"Retrieved messages", messages:messagesToReturn};

    }catch (error){
        throw error;
    }
}