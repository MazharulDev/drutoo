"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const nameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({ required_error: "First name is required" })
        .min(3)
        .max(20)
        .regex(/^[A-Za-z\s]+$/, {
        message: "First name can only contain letters and spaces",
    }),
    lastName: zod_1.z
        .string({ required_error: "Last name is required" })
        .min(3)
        .max(20)
        .regex(/^[A-Za-z\s]+$/, {
        message: "Last name can only contain letters and spaces",
    }),
});
const addressSchema = zod_1.z.object({
    division: zod_1.z.string({ required_error: "Division is required" }),
    district: zod_1.z.string({ required_error: "District is required" }),
    upazila: zod_1.z.string({ required_error: "Upazila is required" }),
    union: zod_1.z.string({ required_error: "Union is required" }),
});
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        data: zod_1.z.object({
            name: nameSchema,
            mobile: zod_1.z
                .string({ required_error: "Mobile Number is required" })
                .length(11),
            pin: zod_1.z.string({ required_error: "Pin is required" }),
            email: zod_1.z.string({ required_error: "Email is required" }).email(),
            nid: zod_1.z
                .string({ required_error: "National Id is required" })
                .min(10)
                .max(13),
            dateOfBirth: zod_1.z.string({ required_error: "Date of birth is required" }),
            bloodGroup: zod_1.z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
                required_error: "Blood group is required",
            }),
            gender: zod_1.z.string({ required_error: "Gender is required" }),
            address: addressSchema,
            role: zod_1.z.string(),
            status: zod_1.z.string().optional(),
            balance: zod_1.z.number().optional(),
        }),
        profilePicture: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
