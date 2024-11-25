"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const generateOTP = (length = 6) => {
    const OTP = Math.random()
        .toString()
        .slice(2, length + 2);
    return OTP;
};
exports.generateOTP = generateOTP;
