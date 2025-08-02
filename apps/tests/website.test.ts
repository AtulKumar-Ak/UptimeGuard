import {describe, it, expect, beforeAll} from 'bun:test';
import axios from 'axios';
import { BACKEND_URL } from './config';
async function createUser():Promise<{id: string, token: string}>{
    const username=Math.random().toString()
    const signupres=await axios.post(`${BACKEND_URL}/user/signup`,{
        username:username,
        password:"tespassword"
    })
    const signinres=await axios.post(`${BACKEND_URL}/user/signin`,{
        username:username,
        password:"tespassword"
    })
    return{
        id:signupres.data.id,
        token:signinres.data.token
    }
}
describe("website endpoints",()=>{
    let token:String
    let id:String
    beforeAll(async()=>{
        const user=await createUser();
        token=user.token
        id=user.id
    })
    it("not able to create if website url is not given",async()=>{
        try{
            const response=await axios.post(`${BACKEND_URL}/website`,{
            },{
                headers:{
                    authorization: `Bearer ${token}`
                }
            })
            expect(response.status).toBe(400);
        }
        catch(e){

        }
    })
    it("website is created if url is present",async()=>{
        const response=await axios.post(`${BACKEND_URL}/website`,{
            url:"https://goolge.com"+ Math.random().toString()
        },{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('id');
    })
    it("not able to create website if not authenticated",async()=>{
        try{
            const response=await axios.post(`${BACKEND_URL}/website`,{
                url:"https://goolge.com"
            })
            expect(response.status).toBe(403);
        }
        catch(e){

        }
    })
})
describe("fetch website",()=>{
     let token1:String
     let token2:String
     let id1:String
     let id2:String
     beforeAll(async()=>{
         const user=await createUser()
         const user1=await createUser()
         token1=user.token
         token2=user1.token
         id1=user.id
         id2=user1.id
     })
     it("is abel to fetch the website user created ",async()=>{
         const websiteres=await axios.post(`${BACKEND_URL}/website`,{
             url:"htttps://googlee.com"+ Math.random().toString()
         },{
             headers:{
                 authorization: `Bearer ${token1}`
             }
         })
         const response=await axios.get(`${BACKEND_URL}/status/${websiteres.data.id}`,{
             headers:{
                 authorization: `Bearer ${token1}`
             }
         })
         expect(response.status).toBe(200);
         expect(response.data).toHaveProperty('website');
     })
     it("cant fetch website created by other user",async()=>{
         const websiteres=await axios.post(`${BACKEND_URL}/website`,{
             url:"htttps://google.com"+ Math.random().toString()
         },{
             headers:{
                 authorization: `Bearer ${token2}`
             }
         })
         try{
             const response=await axios.get(`${BACKEND_URL}/status/${websiteres.data.id}`,{
                 headers:{
                     authorization: `Bearer ${token1}`
                 }
             })
             expect(response.status).toBe(403);
         }
         catch(e){
         }
     })
})