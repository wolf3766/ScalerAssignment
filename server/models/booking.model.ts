import { ObjectId } from "mongodb"

export interface Ibooking {
    email:string,
    source:number,
    destination:number,
    cabId:ObjectId,
    time:number,
    fareofbooking:number
}

export interface IbookingResponse{
    email:string,
    source:number,
    destination:number,
    carnumber:string,
    drivername:string,
    fareofbooking:number,
    time:number
}