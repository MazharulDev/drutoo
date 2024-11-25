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
exports.AddSystemBalance = exports.findLastSystemBalance = exports.AddAdminBalance = exports.findLastAdminBalance = void 0;
const config_1 = __importDefault(require("../../../config"));
const system_model_1 = require("../system/system.model");
const user_model_1 = require("./user.model");
const findLastAdminBalance = () => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = config_1.default.adminId;
    const lastBalance = yield user_model_1.User.findOne({ mobile: adminId }, { balance: 1, _id: 0 }).lean();
    return lastBalance === null || lastBalance === void 0 ? void 0 : lastBalance.balance;
});
exports.findLastAdminBalance = findLastAdminBalance;
const AddAdminBalance = (increment) => __awaiter(void 0, void 0, void 0, function* () {
    const currentBalance = yield (0, exports.findLastAdminBalance)();
    const incrementedBalance = currentBalance + increment;
    return incrementedBalance;
});
exports.AddAdminBalance = AddAdminBalance;
const findLastSystemBalance = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastBalance = yield system_model_1.System.findOne({ name: "systemAmount" }, { amount: 1, _id: 0 }).lean();
    return lastBalance === null || lastBalance === void 0 ? void 0 : lastBalance.amount;
});
exports.findLastSystemBalance = findLastSystemBalance;
const AddSystemBalance = (increment) => __awaiter(void 0, void 0, void 0, function* () {
    const currentBalance = yield (0, exports.findLastSystemBalance)();
    const incrementedBalance = currentBalance + increment;
    return incrementedBalance;
});
exports.AddSystemBalance = AddSystemBalance;
