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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingMiddleware = void 0;
const response_1 = require("../helpers/response");
const http_status_codes_1 = require("http-status-codes");
const joi_1 = __importDefault(require("joi"));
function bookingMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const schema = joi_1.default.object().keys({
                email: joi_1.default.string().required(),
                source: joi_1.default.number().required(),
                destination: joi_1.default.number().required(),
                cabId: joi_1.default.string().required()
            });
            req.body = yield schema.validateAsync(req.body);
            return next();
        }
        catch (error) {
            return response_1.response.setError(http_status_codes_1.StatusCodes.BAD_REQUEST, error, {}).send(res);
        }
    });
}
exports.bookingMiddleware = bookingMiddleware;
