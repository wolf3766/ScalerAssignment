import { Request,Response } from "express"
import { response } from "../helpers/response"
import { StatusCodes} from "http-status-codes";
import { Ibooking, IbookingResponse } from "../models/booking.model";
import { fetchBookings, insertCabBooking } from "../services/cab_booking_services";
import { fetchCabById } from "../services/cab_services";
import { dijkastra } from "../helpers/dijkastra";

export const createCabBooking=async(
    req:Request,
    res:Response
)=>{
    try{
        var cabBook:Ibooking=req.body;
        console.log(cabBook)
        const cab=(await fetchCabById(cabBook.cabId.toString()));
        if(!cab){
            console.error("select a valid cab");
            return response
                .setError(StatusCodes.BAD_REQUEST,"select a valid cab",{})
                .send(res);
        }
        if(cabBook.source>8 || cabBook.destination>8){
            console.error("pass a valid destination and source");
            return response
                .setError(StatusCodes.BAD_REQUEST,"range for source and destination is 0-8",{})
                .send(res)
            }
         cabBook.time=dijkastra(cabBook.source,cabBook.destination);
         cabBook.fareofbooking=cabBook.time*cab.price
        console.log(cabBook)
        const BookingId=(
            await insertCabBooking({
                ...cabBook,
                
            } as Ibooking)
        ).insertedId;
        return response
            .setSuccess(
                true,
                StatusCodes.CREATED,
                {BookingId:String(BookingId)},
                "Booking done Successfully"
            ).send(res);
    }catch(error:any){
        console.log(error);
        return response.setError(StatusCodes.BAD_REQUEST,error,{}).send(res);
    }
}

export const fetchAllBooking=async(
    req:Request,
    res:Response
)=>{
    try{
    const Bookings=(await fetchBookings());  
    return response
        .setSuccess(true,StatusCodes.OK,Bookings,"all available Bookings")
        .send(res);
    }catch(error:any){
        console.log(error);
        return response.setError(StatusCodes.BAD_REQUEST,error,{}).send(res);
    }
}
