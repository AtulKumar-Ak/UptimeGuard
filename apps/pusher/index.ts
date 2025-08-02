import PrismaClient from "db/client"
import {xbulkAdd} from "rediss/client";
async function main(){
    let website=await PrismaClient.website.findMany({
        select:{
            id:true,
            url:true
        }
    })
    console.log(website.length);
    await xbulkAdd(website.map(w=>({
        id:w.id,
        url:w.url
    })))
}
setInterval(()=>{
    main();
},3*1000*60);
main()
