"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpValidation = void 0;
const zod_1 = require("zod");
const sendOtpZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        mobile: zod_1.z.string({
            required_error: "Mobile number is required",
        }),
    }),
});
const verifyOtpZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        mobile: zod_1.z.string({
            required_error: "Mobile number is required",
        }),
        otp: zod_1.z.string(),
    }),
});
const resetPasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        mobile: zod_1.z.string({
            required_error: "Mobile number is required",
        }),
        pin: zod_1.z.string().min(4).max(100),
    }),
});
exports.OtpValidation = {
    sendOtpZodSchema,
    verifyOtpZodSchema,
    resetPasswordZodSchema,
};
