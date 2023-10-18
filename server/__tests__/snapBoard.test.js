import request from "supertest";
import express, {response} from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import {snapBoardRoutes} from "../controller/snapBoardRoutes.js";
import {getUserById, getUserByUsername} from "../repository/userDataAccess.js"

import jwt from "jsonwebtoken";


import cookieParser from "cookie-parser";
import cookieJwtAuth from "../middleware/cookieJwtAuth.js";

dotenv.config();

const app = express();
app.use(cookieParser())
app.use(snapBoardRoutes);
app.use(bodyParser.json())
app.use("/api/snapboard", cookieJwtAuth, snapBoardRoutes);



describe("Testing SnapBoard", () =>{
    it("Should post a message to the database.", async () =>{


        const user = await getUserByUsername(process.env.VALID_USERNAME);
        console.log(user)

        const token = jwt.sign(user,process.env.MY_SECRET, {expiresIn: "1h"});

        console.log(token)

        const response = await request(app)
            .post("/api/snapboard/postmessage")
            .set('Cookie', `token=${token}`)
            .set("Content-Type", "application/json")
            .send({message:"Testish", time: "5"})


        expect(response.status).toBe(200)
        expect(response.body.message).toBe("Posted message to SnapBoard.")

    })
})



describe("Testing SnapBoard", () =>{
    it("Should return an array of messages.", async () =>{

        const user = await getUserByUsername(process.env.VALID_USERNAME);

        const token = jwt.sign(user,process.env.MY_SECRET, {expiresIn: "1h"});

        const response = await request(app)
            .get("/api/snapboard/getAllMessages")
            .set('Cookie', `token=${token}`)
            .set("Content-Type", "application/json")
            .send();

        expect(response.status).toBe(200);
        expect(response.body.messages[0]).toEqual(
            expect.objectContaining({
                    _id:expect.stringMatching(/.*?/),
                    message:expect.stringMatching(/.*?/),
                    time:expect.stringMatching(/.*?/),
                    user:expect.stringMatching(/.*?/)
                }
            )
        )
    })
})