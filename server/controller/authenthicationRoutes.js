import express from "express";
import {registerUser, userLogin} from "../service/authenthicationService.js";

export const authenticationRoutes = express.Router();

authenticationRoutes.post("/signup",async (req,res)=>{
    const {username, password} = req.body;
    const result = await registerUser(username,password)

    if(!result.success){
        res.status(400).json({message:result.message})
    }else {
        res.status(200).json({message: "success"});
    }

});

authenticationRoutes.post("/login", async (req, res) => {
    const {username, password} = req.body;

    try {
        const result = await userLogin(username, password);

        if (!result.success) {
            res.status(401).json({message: result.message})
        } else {
            res.cookie("token", result.token,{
                httpOnly:true
            })
            res.cookie("authorization",true)
            res.status(200).json({message: result.message});
        }


    } catch (error){
        console.error("Error from service layer when trying to retrieve user credentials", error.message);
        res.status(500).json;
    }
})
