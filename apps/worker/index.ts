import axios from "axios";
import PrismaClient from "db/client";
import {xReadGroup,xAckBulk} from "rediss/client";
const REGION_ID= process.env.REGION_ID||"";
const WORKER_ID= process.env.WORKER_ID||"";
if(!REGION_ID || !WORKER_ID) {
    throw new Error("REGION_ID and WORKER_ID must be set");
}
async function main(){
    while(1){
        //read from redis stream
        const response= await xReadGroup(REGION_ID,WORKER_ID);
        if(!response || response.length === 0) {
            continue
        }
        let promise = response.map(({id,message})=>{
            return new Promise<void>(async (resolve, reject) => {
                const url=message.url;
                const websiteId=message.id;
                const startTime=Date.now();
                axios.get(url)
                    .then(async() => {
                        const endTime = Date.now();
                        await PrismaClient.websiteTick.create({
                            data:{
                                responseTime: endTime - startTime,
                                status: "UP",
                                websiteId: websiteId,
                                regionId: REGION_ID, 
                            }
                        })
                        resolve()
                    })
                    .catch(async()=>{
                        const endTime = Date.now();
                        await PrismaClient.websiteTick.create({
                            data:{
                                responseTime: endTime - startTime,
                                status: "DOWN",
                                websiteId: websiteId,
                                regionId: REGION_ID, 
                            }
                        })
                        resolve()
                    })
            })
        })
        await Promise.all(promise);
        console.log(promise.length);
        //process the website and store the result in db
        //it should be routed through a queue in a build in db request

        //ack back to the queue that this event has been processed
        xAckBulk(REGION_ID,response.map(({id})=>id));
    }
}

main()