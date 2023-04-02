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
exports.fetchAllBooking = exports.createCabBooking = void 0;
const response_1 = require("../helpers/response");
const http_status_codes_1 = require("http-status-codes");
const cab_booking_services_1 = require("../services/cab_booking_services");
const cab_services_1 = require("../services/cab_services");
const dijkastra_1 = require("../helpers/dijkastra");
const createCabBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var cabBook = req.body;
        console.log(cabBook);
        const cab = (yield (0, cab_services_1.fetchCabById)(cabBook.cabId.toString()));
        if (!cab) {
            console.error("select a valid cab");
            return response_1.response
                .setError(http_status_codes_1.StatusCodes.BAD_REQUEST, "select a valid cab", {})
                .send(res);
        }
        if (cabBook.source > 8 || cabBook.destination > 8) {
            console.error("pass a valid destination and source");
            return response_1.response
                .setError(http_status_codes_1.StatusCodes.BAD_REQUEST, "range for source and destination is 0-8", {})
                .send(res);
        }
        cabBook.time = (0, dijkastra_1.dijkastra)(cabBook.source, cabBook.destination);
        cabBook.fareofbooking = cabBook.time * cab.price;
        console.log(cabBook);
        const BookingId = (yield (0, cab_booking_services_1.insertCabBooking)(Object.assign({}, cabBook))).insertedId;
        return response_1.response
            .setSuccess(true, http_status_codes_1.StatusCodes.CREATED, { BookingId: String(BookingId) }, "Booking done Successfully").send(res);
    }
    catch (error) {
        console.log(error);
        return response_1.response.setError(http_status_codes_1.StatusCodes.BAD_REQUEST, error, {}).send(res);
    }
});
exports.createCabBooking = createCabBooking;
const fetchAllBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Bookings = (yield (0, cab_booking_services_1.fetchBookings)());
        return response_1.response
            .setSuccess(true, http_status_codes_1.StatusCodes.OK, Bookings, "all available Bookings")
            .send(res);
    }
    catch (error) {
        console.log(error);
        return response_1.response.setError(http_status_codes_1.StatusCodes.BAD_REQUEST, error, {}).send(res);
    }
});
exports.fetchAllBooking = fetchAllBooking;
