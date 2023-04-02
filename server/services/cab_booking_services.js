"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBookings = exports.insertCabBooking = void 0;
const database_1 = require("../config/database");
const enums_1 = require("../constants/enums");
const mongodb_1 = require("mongodb");
const insertCabBooking = (booking) => __awaiter(void 0, void 0, void 0, function* () {
    const Booked = {
        email: booking.email,
        source: booking.source,
        destination: booking.destination,
        cabId: new mongodb_1.ObjectId(booking.cabId),
        time: booking.time,
        fareofbooking: booking.fareofbooking
    };
    return yield (yield (0, database_1.cachedDbConnection)())
        .collection(enums_1.Collections.BOOKING)
        .insertOne(Booked);
});
exports.insertCabBooking = insertCabBooking;
const fetchBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (yield (0, database_1.cachedDbConnection)())
        .collection(enums_1.Collections.BOOKING)
        .aggregate([
        { $match: {} },
        {
            $lookup: {
                from: enums_1.Collections.CABS,
                localField: "cabId",
                foreignField: "_id",
                as: "match",
            },
        },
        { $unwind: "$match" },
        {
            $project: {
                email: 1,
                source: 1,
                destination: 1,
                fareofbooking: 1,
                time: 1,
                carnumber: "$match.carnumber",
                drivername: "$match.drivername",
                fare: "$match.price",
            }
        }
    ]).toArray();
});
exports.fetchBookings = fetchBookings;
