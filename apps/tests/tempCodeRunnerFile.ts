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
             url:"htttps://googlee.com"
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
             url:"htttps://googlee.com"
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