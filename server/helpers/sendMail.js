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
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let testAccount = yield nodemailer_1.default.createTestAccount();
    const receiver = req.query.email;
    // connect with the smtp
    let transporter = yield nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'aurelie.abshire@ethereal.email',
            pass: 'vPpzTcyzvYRFFCagU5'
        },
    });
    let info = yield transporter.sendMail({
        from: '"Cab Bookers👻" <cab@gmail.com>',
        to: `${receiver}`,
        subject: "Cab Booked",
        text: "hello enjoy the ride", // plain text 
    });
    console.log("Message sent: %s", info.messageId);
    res.json(info);
});
exports.default = sendMail;
