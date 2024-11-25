"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const mongoose_1 = require("mongoose");
const OtpSchema = new mongoose_1.Schema({
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 10, // Document will be deleted after 3 minutes
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Otp = (0, mongoose_1.model)("Otp", OtpSchema);
