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
exports.OtpController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const otp_service_1 = require("./otp.service");
const sendOtp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile } = req.body;
    const result = yield otp_service_1.OtpService.sendOtp(mobile);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "OTP sent successfully!",
        data: result,
    });
}));
const verifyOtp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile, otp } = req.body;
    const result = yield otp_service_1.OtpService.verifyOtp(mobile, otp);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "OTP verified successfully!",
        data: result,
    });
}));
const resetPin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile, pin } = req.body;
    const result = yield otp_service_1.OtpService.resetPin(mobile, pin);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Pin reset successfully!",
        data: result,
    });
}));
exports.OtpController = {
    sendOtp,
    verifyOtp,
    resetPin,
};
