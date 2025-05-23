"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.isUserExist = void 0;
const isUserExist = function (mobile, UserDb) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield UserDb.findOne({ mobile: mobile, status: "active" }, { _id: 1, pin: 1, status: 1, email: 1, role: 1, mobile: 1 }).lean();
    });
};
exports.isUserExist = isUserExist;
