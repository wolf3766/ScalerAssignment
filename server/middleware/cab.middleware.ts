import { Response, NextFunction,Request } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import { response } from "../helpers/response";
import { DurationType } from "../constants/enums";


export async function cabValidator(
    req:Request,
    res:Response,
    next:NextFunction
){
    try{
        const schema=Joi.object().keys({
            drivername:Joi.string().required(),
            drivernumber:Joi.number().required(),
            carnumber:Joi.string().required(),
            carName:Joi.string().required(),
            price:Joi.number().required(),
            startTime:Joi.string().required(),
            endTime:Joi.string().required()
        });
        req.body=await schema.validateAsync(req.body);
        return next();
    }catch(error:any){
        return response.setError(StatusCodes.BAD_REQUEST,error,{}).send(res);
    }
}

export async function cabUpdateValidator(
    req:Request,
    res:Response,
    next:NextFunction
){
    try{
        const schema=Joi.object().keys({
            drivername:Joi.string().optional(),
            drivernumber:Joi.string().optional(),
            carnumber:Joi.string().optional(),
            carname:Joi.string().optional(),
            price:Joi.number().optional(),
            startTime:Joi.string().optional(),
            endTime:Joi.string().optional(),
        }) 
        req.body=await schema.validateAsync(req.body);
        return next();
    }catch(error:any){
        return response.setError(StatusCodes.BAD_REQUEST,error,{}).send(res);
    }
}
