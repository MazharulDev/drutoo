"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required",
        }),
        mobile: zod_1.z.string({ required_error: "Mobile Number is require" }),
        pin: zod_1.z.string({ required_error: "Pin is required" }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email(),
        nid: zod_1.z.string({ required_error: "National Id is required" }),
        role: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
        balance: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
