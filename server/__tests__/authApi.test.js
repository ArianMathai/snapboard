import request from "supertest";
import express, {response} from "express";
import {authenticationRoutes} from "../controller/authenthicationRoutes.js";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(authenticationRoutes);
app.use(bodyParser.json())
app.use("/api/authentication", authenticationRoutes);

//When signing in with invalid credentials.
describe("Authentication API", () => {
    it("should send a 401 when trying to sign in with invalid credentials", async () => {
        const mockInvalidUser = {
            username: "nonexistentuser",
            password: "invalidpassword",
        };

        const response = await request(app)
            .post("/api/authentication/login")
            .set("Content-Type", "application/json")
            .send(mockInvalidUser)

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message","Login Failed.");
    });
});

describe("Authentication API", () =>{
    it("Should return a 200 when trying to log in with valid credentials", async () => {
        const user = {
            username: process.env.VALID_USERNAME,
            password: process.env.VALID_PASSWORD
        }

        const response = await request(app)
            .post("/api/authentication/login")
            .set("Content-Type","application/json")
            .send(user)

        expect(response.status).toBe(200);

    });
});