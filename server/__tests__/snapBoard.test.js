import request from "supertest";
import express, {response} from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import {snapBoardRoutes} from "../controller/snapBoardRoutes.js";
import { getUserByUsername} from "../repository/userDataAccess.js";
import jest from "jest";

dotenv.config();

const app = express();
app.use(snapBoardRoutes);
app.use(bodyParser.json())
app.use("/api/snapboard", snapBoardRoutes);


describe("Testing SnapBoard", () =>{

    it("Should post a message to the database.", async () =>{

        const user = await getUserByUsername(process.env.VALID_USERNAME);

        const response = await request(app)
            .post("/api/snapboard/")
            .send({
                message:"test",
                time:"1",
                user,
            })

        expect(response.status).toBe(200);

    })
})



describe("Testing SnapBoard", () =>{
    it("Should return an array of messages.", async () =>{

        const response = await request(app)
            .get("/api/snapboard/getAllMessages")
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