import express from "express";
import {addMessage, getAllMessages, deletePost} from "../service/messageService.js";

export const snapBoardRoutes = express.Router();

snapBoardRoutes.post("/postmessage", async (req, res) => {
    const {message, time} = req.body;
    const userId = req.user._id;
    console.log("WITHIN POST :" + userId);


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

    const userId = req.user._id;




    try {
        const result = await getAllMessages(userId);

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

snapBoardRoutes.delete("/delete/:id", async (req,res) =>{
    const postId = req.params.id;

    try {
        const result = await deletePost(postId);

        if(!result.success){
            res.status(400).json({success:result.success, message:result.message})
        } else {
            res.status(200).json({success:result.success, message:result.message});
        }


    }catch (error){
        res.status(500).json({message:"Failed to delete post from server."})
    }

})