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
exports.cachedMongodbClient = exports.cachedDbConnection = exports.mongodbClient = exports.cachedDb = void 0;
const mongodb_1 = require("mongodb");
require("dotenv").config();
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mongoUrl = process.env.MONGO_URL;
            const client = new mongodb_1.MongoClient(mongoUrl);
            yield client.connect();
            console.log("=> Connected successfully to database");
            return client;
        }
        catch (error) {
            console.log("=> Error While connecting to database");
            console.error(error);
            throw error;
        }
    });
}
function cachedDbConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!exports.cachedDb) {
            console.log("=> Connecting & caching database instance");
            const client = yield connectToDatabase();
            exports.cachedDb = client.db(process.env.DB_NAME);
        }
        return exports.cachedDb;
    });
}
exports.cachedDbConnection = cachedDbConnection;
function cachedMongodbClient() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!exports.mongodbClient) {
            console.log("=> Connecting & caching database instance");
            exports.mongodbClient = yield connectToDatabase();
        }
        return exports.mongodbClient;
    });
}
exports.cachedMongodbClient = cachedMongodbClient;
