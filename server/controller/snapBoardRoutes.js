import express from "express";
import {addMessage, getAllMessages} from "../service/messageService.js";

export const snapBoardRoutes = express.Router();

snapBoardRoutes.post("/postmessage", async (req, res) => {
    const {message, time} = req.body;
    const userId = req.user._id;


    try {
        const result = await addMessage(message, time, userId);

        if (!result.success){
            res.status(400).json({message: result.message})
        } else {
            res.status(200).json({message:"Posted message to SnapBoard."})
        }

    } catch (error){
        console.error("Failed to post message to server", error.message);
        res.status(500).json({message:"Failed to post message."})
    }
})

snapBoardRoutes.get("/getAllMessages", async (req,res) =>{

    try {
        const result = await getAllMessages();

        if(!result.success){
            res.status(400).json({success:result.success, message:result.message, messages:result.message})
        } else {
            res.status(200).json({success:result.success, message:result.message, messages:result.messages});
        }


    }catch (error){
        console.error("Failed to retrieve messages from server");
        res.status(500).json({message:"Failed to retrieve messages"})
    }

})