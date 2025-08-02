export{}
import {describe, it, expect,beforeAll} from 'bun:test';
import axios from 'axios';
import { BACKEND_URL } from './config';
const USERNAME=Math.random().toString()
describe("Signup endpoints", () => {
    it("isnt able to signup if body is incorrect", async () => {
    try {
        await axios.post(`${BACKEND_URL}/user/signup`, {
            username: USERNAME,
        });
        throw new Error("Expected request to fail but it succeeded");
    } catch (err) {
        if (axios.isAxiosError(err)) {
            expect(err.response?.status).toBe(400);
            expect(err.response?.data).toBe("Username and password are required");
        } else {
            throw err;
        }
    }
});

    it("able to signup if body is incorrect",async()=>{
            const response=await axios.post(`${BACKEND_URL}/user/signup`,{
                username:USERNAME,
                password:"testpassword"
            })
            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty('id');

    })
})

describe("Signin endpoints",() => {
        beforeAll(async () => {
        await axios.post(`${BACKEND_URL}/user/signup`, {
            username: USERNAME+ "2",
            password: "testpassword"
        });
    });
    it("isnt able to signin if body is incorrect", async () => {
    try {
        await axios.post(`${BACKEND_URL}/user/signin`, {
            username: USERNAME + "2",
            password: "atulawdefs"
        });
        throw new Error("Expected request to fail but it succeeded");
    } catch (err) {
        if (axios.isAxiosError(err)) {
            expect(err.response?.status).toBe(401);
            expect(err.response?.data).toBe("Invalid password");
        } else {
            throw err;
        }
    }
});

    it("able to signin if body is correct",async()=>{
            const response=await axios.post(`${BACKEND_URL}/user/signin`,{
                username:USERNAME+"2",
                password:"testpassword"
            })
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('token');
    })
})
