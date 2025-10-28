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
exports.OtpService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const otp_model_1 = require("./otp.model");
const isUserExists_1 = require("../../../utils/isUserExists");
const user_model_1 = require("../users/user.model");
const hashingHelpers_1 = require("../../../helpers/hashingHelpers");
const generateOTP_1 = require("../../../utils/generateOTP");
const sendMail_1 = require("../../../utils/sendMail");
const sendOtp = (mobile) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, isUserExists_1.isUserExist)(mobile, user_model_1.User);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const otpData = yield otp_model_1.Otp.findOne({ mobile });
    if (otpData) {
        const currentTime = new Date();
        // Convert remaining time to seconds
        const remainingSeconds = Math.ceil((Number(otpData.expiresAt) - Number(currentTime)) / 1000);
        if (remainingSeconds > 0) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `OTP already sent. Please try again after ${remainingSeconds} seconds`);
        }
        else {
            yield otp_model_1.Otp.deleteOne({ mobile });
        }
    }
    const generatedOTP = (0, generateOTP_1.generateOTP)();
    const expiresAt = new Date();
    expiresAt.setTime(expiresAt.getTime() + 2 * 60 * 1000);
    const result = yield otp_model_1.Otp.create({
        mobile,
        email: user.email,
        otp: generatedOTP,
        expiresAt,
    });
    // Send OTP to email
    if (result) {
        yield (0, sendMail_1.sendMail)({
            to: user === null || user === void 0 ? void 0 : user.email,
            subject: "OTP for reset pin",
            message: `Your OTP is ${result.otp}. Please do not share it with anyone. OTP will expire in 2 minutes`,
        });
    }
    return {
        _id: result._id,
        email: result.email,
        mobile: result.mobile,
        isVerified: result.isVerified,
        expiresAt: result.expiresAt,
    };
});
const verifyOtp = (mobile, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const otpData = yield otp_model_1.Otp.findOne({ mobile });
    if (!otpData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "OTP not found");
    }
    const currentTime = new Date();
    // Check if otp is expired
    if (currentTime > otpData.expiresAt) {
        // Delete otp
        yield otp_model_1.Otp.deleteOne({ mobile });
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "OTP expired");
    }
    if (otpData.otp !== otp) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "OTP is incorrect");
    }
    // Update otp status
    const updatedOtpData = yield otp_model_1.Otp.findOneAndUpdate({ mobile }, { isVerified: true }, { new: true });
    if (!updatedOtpData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Could not verify otp");
    }
    return {
        _id: updatedOtpData._id,
        email: updatedOtpData.email,
        mobile: updatedOtpData.mobile,
        isVerified: updatedOtpData.isVerified,
        expiresAt: updatedOtpData.expiresAt,
    };
});
const resetPin = (mobile, pin) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, isUserExists_1.isUserExist)(mobile, user_model_1.User);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const otpData = yield otp_model_1.Otp.findOne({ mobile });
    //Check if otp is verified
    if (!(otpData === null || otpData === void 0 ? void 0 : otpData.isVerified)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Could not find verified otp");
    }
    // Encrypt password
    const hashedPin = yield hashingHelpers_1.hashingHelper.encrypt_password(pin);
    const updatedUser = yield user_model_1.User.findOneAndUpdate({ mobile }, { pin: hashedPin, isPinReset: true }, {
        new: true,
    }).select("-pin");
    // Delete otp
    yield otp_model_1.Otp.deleteOne({ mobile });
    return updatedUser;
});
exports.OtpService = {
    sendOtp,
    verifyOtp,
    resetPin,
};
