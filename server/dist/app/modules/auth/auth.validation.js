"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        mobile: zod_1.z.string({
            required_error: "mobile number is required",
        }),
        pin: zod_1.z.string({
            required_error: "Pin is required",
        }),
    }),
});
const changePinZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        mobile: zod_1.z.string({
            required_error: "Mobile number is required",
        }),
        oldPin: zod_1.z
            .string({
            required_error: "Old pin is required",
        })
            .min(4)
            .max(4),
        newPin: zod_1.z
            .string({
            required_error: "New pin is required",
        })
            .min(4)
            .max(4),
    }),
});
exports.AuthValidation = {
    loginZodSchema,
    changePinZodSchema,
};
