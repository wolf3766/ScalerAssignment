"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const morgan_1 = __importDefault(require("morgan"));
const v1_routes_1 = require("./routes/v1.routes");
const router = (0, express_1.Router)();
exports.router = router;
router.use((0, morgan_1.default)((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens["remote-addr"](req, res),
        tokens["remote-user"](req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
    ].join(" ");
}));
router.use("/v1", v1_routes_1.apiV1);
