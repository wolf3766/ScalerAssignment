import {Router} from "express"
import { cabUpdateValidator, cabValidator} from "../middleware/cab.middleware";
import { createCabController, fetchCabsController, updateCabController } from "../controllers/cab.controller";
import { bookingMiddleware } from "../middleware/booking.middleware";
import { createCabBooking, fetchAllBooking } from "../controllers/booking.controller";
import { shortestPath } from "../controllers/travel.controller";
import sendMail from "../helpers/sendMail";

export const apiV1=Router();

apiV1.post("/cab/create",cabValidator,createCabController);
apiV1.post("/create/booking",bookingMiddleware,createCabBooking);
apiV1.get("/minimumTime",shortestPath);
apiV1.patch("/updatecab/:cabId",cabUpdateValidator,updateCabController);
apiV1.get("/cabs",fetchCabsController);
apiV1.get("/booking",fetchAllBooking);
apiV1.get("/mail/:email",sendMail)