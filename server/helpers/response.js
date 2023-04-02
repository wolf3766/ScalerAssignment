"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.ResponseStructure = void 0;
class ResponseStructure {
    constructor(statusCode, payload, message) {
        this.statusCode = statusCode;
        this.payload = payload;
        this.message = message;
    }
    setSuccess(success, statusCode, payload, message) {
        this.statusCode = statusCode;
        this.payload = payload;
        this.success = success;
        this.message = message;
        return this;
    }
    setError(statusCode, message, payload = {}) {
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.payload = payload;
        return this;
    }
    send(res) {
        if (this.success) {
            return res.status(this.statusCode).json({
                success: this.success,
                payload: this.payload,
                message: this.message,
            });
        }
        return res.status(this.statusCode).json({
            success: false,
            message: this.message,
            payload: this.payload,
        });
    }
}
exports.ResponseStructure = ResponseStructure;
const response = new ResponseStructure();
exports.response = response;
