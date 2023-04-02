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
exports.fetchCabs = exports.updateCab = exports.fetchCabById = exports.insertOneCab = void 0;
const database_1 = require("../config/database");
const enums_1 = require("../constants/enums");
const mongodb_1 = require("mongodb");
const insertOneCab = (cab) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (yield (0, database_1.cachedDbConnection)())
        .collection(enums_1.Collections.CABS)
        .insertOne(cab);
});
exports.insertOneCab = insertOneCab;
const fetchCabById = (cabId) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, database_1.cachedDbConnection)())
        .collection(enums_1.Collections.CABS)
        .findOne({ _id: new mongodb_1.ObjectId(cabId) });
});
exports.fetchCabById = fetchCabById;
const updateCab = (cabId, updateQuery) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, database_1.cachedDbConnection)())
        .collection(enums_1.Collections.CABS)
        .updateOne({ _id: new mongodb_1.ObjectId(cabId) }, updateQuery);
});
exports.updateCab = updateCab;
const fetchCabs = () => __awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, database_1.cachedDbConnection)())
        .collection(enums_1.Collections.CABS)
        .find()
        .toArray();
});
exports.fetchCabs = fetchCabs;
