"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNulls = void 0;
const removeNulls = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};
exports.removeNulls = removeNulls;
