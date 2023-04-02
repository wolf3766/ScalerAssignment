import { Icab } from "../models/cab.model";
import { cachedDbConnection } from "../config/database";
import { Collections } from "../constants/enums";
import { ObjectId } from "mongodb";

export const insertOneCab = async (cab: Icab) => {
    return await (await cachedDbConnection())
      .collection<Icab>(Collections.CABS)
      .insertOne(cab);
  };

export const  fetchCabById=async(cabId:string)=>{
return  (await cachedDbConnection())
  .collection<Icab>(Collections.CABS)
  .findOne({_id:new ObjectId(cabId)})
}

export const updateCab = async (cabId: string, updateQuery: Object) => {
  return (await cachedDbConnection())
    .collection<Icab>(Collections.CABS)
    .updateOne({ _id: new ObjectId(cabId) }, updateQuery);
};

export const fetchCabs=async ()=>{
  return (await cachedDbConnection())
    .collection<Icab>(Collections.CABS)
    .find()
    .toArray()
}
