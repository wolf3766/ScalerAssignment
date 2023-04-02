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
exports.shortestPath = void 0;
const dijkastra_1 = require("../helpers/dijkastra");
const response_1 = require("../helpers/response");
const http_status_codes_1 = require("http-status-codes");
const shortestPath = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { source, destination } = req.query;
        if (source > 8 || destination > 8) {
            return response_1.response
                .setError(http_status_codes_1.StatusCodes.BAD_REQUEST, "cities must be numbered from 1 to 8", {}).send(res);
        }
        const minimumTime = (0, dijkastra_1.dijkastra)(source, destination);
        return response_1.response
            .setSuccess(true, http_status_codes_1.StatusCodes.OK, minimumTime, `Minimum time to travel between ${source} and ${destination}`).send(res);
    }
    catch (error) {
        console.log(error);
        return response_1.response.setError(http_status_codes_1.StatusCodes.BAD_REQUEST, error, {}).send(res);
    }
});
exports.shortestPath = shortestPath;
