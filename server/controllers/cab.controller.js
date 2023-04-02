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
exports.fetchCabsController = exports.updateCabController = exports.createCabController = void 0;
const response_1 = require("../helpers/response");
const http_status_codes_1 = require("http-status-codes");
const cab_services_1 = require("../services/cab_services");
const cab_services_2 = require("../services/cab_services");
const util_1 = require("../helpers/util");
const cab_services_3 = require("../services/cab_services");
const createCabController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cab = req.body;
        const cabId = (yield (0, cab_services_1.insertOneCab)(Object.assign({}, cab))).insertedId;
        return response_1.response
            .setSuccess(true, http_status_codes_1.StatusCodes.CREATED, { cabId: String(cabId) }, "Cab Created Successfully").send(res);
    }
    catch (error) {
        console.log(error);
        return response_1.response.setError(http_status_codes_1.StatusCodes.BAD_REQUEST, error, {}).send(res);
    }
});
exports.createCabController = createCabController;
const updateCabController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carname, startTime, endTime, price, drivername, drivernumber, carnumber } = req.body;
        const { cabId } = req.params;
        const cab = yield (0, cab_services_2.fetchCabById)(cabId);
        if (cab) {
            const result = yield (0, cab_services_3.updateCab)(cabId, {
                $set: (0, util_1.removeNulls)({
                    price: price,
                    carname: carname,
                    startTime: startTime,
                    endTime: endTime,
                    drivername: drivername,
                    drivernumber: drivernumber,
                    carnumber: carnumber
                })
            });
            if (result) {
                return response_1.response
                    .setSuccess(true, http_status_codes_1.StatusCodes.OK, {}, "Cab field Updated successfully")
                    .send(res);
            }
            else {
                return response_1.response
                    .setError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "some error occured while updating cab").send(res);
            }
        }
    }
    catch (error) {
        console.log(error);
        return response_1.response.setError(http_status_codes_1.StatusCodes.BAD_REQUEST, error, {}).send(res);
    }
});
exports.updateCabController = updateCabController;
const fetchCabsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cabs = (yield (0, cab_services_1.fetchCabs)());
        return response_1.response
            .setSuccess(true, http_status_codes_1.StatusCodes.OK, cabs, "all available cabs")
            .send(res);
    }
    catch (error) {
        console.error(error);
        return response_1.response
            .setError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error, {})
            .send(res);
    }
});
exports.fetchCabsController = fetchCabsController;
