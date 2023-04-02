import { Request,Response } from "express"
import { dijkastra } from "../helpers/dijkastra"
import { response } from "../helpers/response";
import { StatusCodes } from "http-status-codes";


export const shortestPath = async(
    req:Request,
    res:Response
)=>{
    try{
        const {source,destination}=req.query as any as{
            source:number,
            destination:number
        } 
        if(source>8 || destination>8){
            return response
                .setError(StatusCodes.BAD_REQUEST,"cities must be numbered from 1 to 8",{}).send(res);
        }
        const minimumTime=dijkastra(source,destination)
        return response 
            .setSuccess(
                true,
                StatusCodes.OK,
                minimumTime,
                `Minimum time to travel between ${source} and ${destination}`
            ).send(res);
    }catch(error:any){
        console.log(error);
        return response.setError(StatusCodes.BAD_REQUEST,error,{}).send(res);
    }
}