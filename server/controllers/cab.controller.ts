import { Icab } from "../models/cab.model";
import {Request,Response} from "express"
import { response } from "../helpers/response";
import { StatusCodes } from "http-status-codes";
import { fetchCabs, insertOneCab } from "../services/cab_services";
import { fetchCabById } from "../services/cab_services";
import { removeNulls } from "../helpers/util";
import { updateCab } from "../services/cab_services";

export const createCabController=async(
    req:Request,
    res:Response
)=>{
    try{
        const cab=req.body;
        const cabId=(
            await insertOneCab({
                ...cab,
            } as Icab)
        ).insertedId
        return response
            .setSuccess(
                true,
                StatusCodes.CREATED,
                {cabId:String(cabId)},
                "Cab Created Successfully"
            ).send(res);
    }catch(error:any){
        console.log(error);
        return response.setError(StatusCodes.BAD_REQUEST,error,{}).send(res)
    }
};

export const updateCabController=async(
    req:Request,
    res:Response
)=>{
    try{
        const {carname,startTime,endTime,price,drivername,drivernumber,carnumber}=req.body;
        const {cabId}=req.params as {cabId:string};
        const cab=await fetchCabById(cabId);
        if(cab){
            const result=await updateCab(cabId,{
                $set:removeNulls({
                        price:price,
                        carname:carname,
                        startTime:startTime,
                        endTime:endTime,
                        drivername:drivername,
                        drivernumber:drivernumber,
                        carnumber:carnumber
                    })
            })
            if(result){
                return response
                    .setSuccess(
                        true,
                        StatusCodes.OK,
                        {},
                        "Cab field Updated successfully"
                    )
                    .send(res);
            }else{
                return response
                    .setError(
                        StatusCodes.INTERNAL_SERVER_ERROR,
                        "some error occured while updating cab"
                    ).send(res)
            }
        }
    }catch(error:any){
        console.log(error);
        return response.setError(StatusCodes.BAD_REQUEST,error,{}).send(res)
    }
}

export const fetchCabsController=async(
    req:Request,
    res:Response
)=>{
    try{
        const cabs:Array<Icab>=(await fetchCabs());  
        return response
            .setSuccess(true,StatusCodes.OK,cabs,"all available cabs")
            .send(res);
    }catch(error:any){
    console.error(error);
    return response
      .setError(StatusCodes.INTERNAL_SERVER_ERROR, error, {})
      .send(res);
    }
}