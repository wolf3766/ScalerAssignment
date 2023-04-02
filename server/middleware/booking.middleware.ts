import {Request,Response,NextFunction } from "express";
import { response } from "../helpers/response";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

export async function bookingMiddleware(
    req:Request,
    res:Response,
    next:NextFunction
){
    try{
        const schema=Joi.object().keys({
            email:Joi.string().required(),
            source:Joi.number().required(),
            destination:Joi.number().required(),
            cabId:Joi.string().required()
        });
        req.body=await schema.validateAsync(req.body);
        return next();
    }catch(error: any){
        return response.setError(StatusCodes.BAD_REQUEST,error,{}).send(res);
    }
} 