import { Ibooking, IbookingResponse } from "../models/booking.model";
import { cachedDbConnection } from "../config/database";
import { Collections } from "../constants/enums";
import { ObjectId } from "mongodb";

export const insertCabBooking = async (booking: Ibooking) => {
    const Booked:Ibooking={
      email:booking.email,
      source:booking.source,
      destination:booking.destination,
      cabId:new ObjectId(booking.cabId),
      time:booking.time,
      fareofbooking:booking.fareofbooking
    }
    return await (await cachedDbConnection())
      .collection<Ibooking>(Collections.BOOKING)
      .insertOne(Booked);
  };
  
  export const fetchBookings=async ()=>{
    return await(await cachedDbConnection())
      .collection<IbookingResponse>(Collections.BOOKING)
      .aggregate([
        { $match: {} },
        {
          $lookup: {
            from: Collections.CABS,
            localField: "cabId",
            foreignField: "_id",
            as: "match",
          },
        },
        { $unwind: "$match" },
        {
          $project:{
            email:1,
            source:1,
            destination:1,
            fareofbooking:1,
            time:1,
            carnumber:"$match.carnumber",
            drivername:"$match.drivername",
            fare:"$match.price",
          }
        }
      ]).toArray()
  }
  