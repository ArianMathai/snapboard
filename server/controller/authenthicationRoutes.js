import express from "express";
import {getUserBySubString, registerGoogleUser, registerUser, userLogin} from "../service/authenthicationService.js";

export const authenticationRoutes = express.Router();
const DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"

authenticationRoutes.post("/signup",async (req,res)=>{
    const {username, password} = req.body;
    const result = await registerUser(username,password)

    if(!result.success){
        res.status(400).json({message:result.message})
    }else {
        res.status(200).json({message: "success"});
    }

});

authenticationRoutes.get("/login/get-user/:id", async (req, res) => {

    const {id} = req.params;

    const response = await fetch(DISCOVERY_URL);

    const discoveryDoc = await response.json();

    const userInfo = await fetch(discoveryDoc.userinfo_endpoint,{
        headers:{
            Authorization: "Bearer" + id
        }
    })

    const info = await userInfo.json();

    const subString = info.sub;

    const result = await getUserBySubString(subString);

    if(!result.success){
        res.status(404).send({message:"User not found."});
    } else {
        res.cookie("access_token", id,{
            httpOnly:true,
            signed:true
        })
        res.cookie("authorization",true,{
            signed:true
        })
        res.cookie("user",result.user, {
            signed:true
        });
        res.status(200).send();
    }

    res.status(200).send();

})
authenticationRoutes.post("/login", async (req, res) => {
    const {username, password} = req.body;

    try {
        const result = await userLogin(username, password);

        if (!result.success) {
            res.status(401).json({message: result.message})
        } else {
            res.cookie("token", result.token,{
                httpOnly:true,
                signed:true
            })
            res.cookie("authorization",true, {
                signed:true
            })
            res.status(200).json({message: result.message});
        }


    } catch (error){
        console.error("Error from service layer when trying to retrieve user credentials", error.message);
        res.status(500).json;
    }
})
authenticationRoutes.post("/login/access_token", async (req, res) => {

    const {access_token, username} = req.body;

    const response = await fetch(DISCOVERY_URL);

    const discoveryDoc = await response.json();

    const userInfo = await fetch(discoveryDoc.userinfo_endpoint,{
        headers:{
            Authorization: "Bearer" + access_token
        }
    })

    const info = await userInfo.json();

    const subString = info.sub;

    const result = await registerGoogleUser(subString, username);

    if(!result.success){
        res.status(400).json({message:result.message});
    } else {
        res.cookie("access_token", access_token,{
            httpOnly:true,
            signed:true
        })
        res.cookie("authorization",true,{
            signed:true
        })
        res.cookie("user", result.userId, {
            signed:true
        })
        res.status(200).json({message: result.message});
    }

})
authenticationRoutes.get("/logout", (req, res) => {

    res.clearCookie("access_token");
    res.clearCookie("authorization");
    res.clearCookie("user");
    res.clearCookie("token");

    res.status(200).send();
})

