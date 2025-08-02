import { createClient } from "redis";
const client = await createClient()
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();
type websiteEvent={id:string,url:string}
type MessageType={
    id: string;
    message:{
        url:string,
        id:string
    }
}
const STREAM_NAME = 'betteruptime:website';
async function xAdd({
    id,
    url
}:websiteEvent){
    await client.xAdd(
        'betteruptime:website','*',{
            id,
            url
        }
    )
}
export async function xbulkAdd(websites:websiteEvent[]){
    for(let i=0;i<websites.length;i++){
        await xAdd({
                id:websites[i]!.id,
                url:websites[i]!.url
            }
        )
    }
}
export async function xReadGroup(consumerGroup:string,workerId:string): Promise<MessageType[] | undefined> {
    const res=await client.xReadGroup(
        consumerGroup,workerId,{
            key:STREAM_NAME,
            id: '>'
        },{
            COUNT: 5,
        }
    )
//@ts-ignore
    let messages: MessageType[] | undefined = res?.[0]?.messages;
    return messages;
}
async function xAck(consumerGroup:string,eventId:string){
        await client.xAck(STREAM_NAME, consumerGroup,eventId)    
}
export async function xAckBulk(consumerGroup: string, eventIds: string[]) {
    eventIds.map(eventId => xAck(consumerGroup, eventId))
}
