import request from "supertest";
import express from "express";
import {authenticationRoutes} from "../controller/authenthicationRoutes.js";
import bodyParser from "body-parser";

const app = express();
app.use(authenticationRoutes);
app.use(bodyParser.json())
app.use("/api/authentication", authenticationRoutes);

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
    });
});